import {
  createHash,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "crypto";
import { promisify } from "util";
import { cookies } from "next/headers";
import { prisma } from "@/lib/server/db";
import { sendAccountEmail } from "@/lib/server/email";
import { SITE_URL } from "@/lib/site";

const scrypt = promisify(scryptCallback);

export const SESSION_COOKIE = "sfg_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const LOCK_AFTER = 5;
const LOCK_MS = 1000 * 60 * 15;

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  organization: string | null;
  role: "admin" | "client";
  emailVerified: boolean;
};

/** Password rules shared by sign-up, reset, and change-password. */
export const PASSWORD_MIN = 10;
export const PASSWORD_MAX = 200;

export function passwordProblem(password: string, email?: string): string | null {
  if (password.length < PASSWORD_MIN) return `Use at least ${PASSWORD_MIN} characters.`;
  if (password.length > PASSWORD_MAX) return `Use at most ${PASSWORD_MAX} characters.`;
  if (email && password.trim().toLowerCase() === email.trim().toLowerCase()) {
    return "Your password cannot be your email address.";
  }
  return null;
}

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [algo, salt, hash] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hash) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hash, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

/** Fixed cost so a missing account does not return faster than a real one. */
const DUMMY_HASH = `scrypt$${Buffer.alloc(16, 1).toString("hex")}$${Buffer.alloc(64, 2).toString("hex")}`;

export function generateTemporaryPassword(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = randomBytes(16);
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: true },
  });
  if (!session || session.expiresAt.getTime() < Date.now()) return null;
  if (!session.user.active) return null;
  if (session.user.role !== "admin" && session.user.role !== "client") return null;
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    organization: session.user.organization,
    role: session.user.role as "admin" | "client",
    emailVerified: Boolean(session.user.emailVerifiedAt),
  };
}

export async function requireUser(): Promise<SessionUser | null> {
  return getSessionUser();
}

export async function requireAdmin(): Promise<SessionUser | null> {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") return null;
  return user;
}

export async function startSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  await prisma.session.create({
    data: {
      userId,
      tokenHash: sha256(token),
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    },
  });
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

const AUTH_FAILED = "That email and password do not match an account.";

export async function signInWithPassword(
  email: string,
  password: string,
): Promise<{ ok: true; role: "admin" | "client" } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  if (!normalized || !password) return { ok: false, error: AUTH_FAILED };

  let user = await prisma.user.findUnique({ where: { email: normalized } });

  if (!user) {
    const adminCount = await prisma.user.count({ where: { role: "admin" } });
    const bootEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const bootPassword = process.env.ADMIN_PASSWORD;
    if (
      adminCount === 0 &&
      bootEmail &&
      bootPassword &&
      normalized === bootEmail &&
      bootPassword.length === password.length &&
      timingSafeEqual(Buffer.from(bootPassword), Buffer.from(password))
    ) {
      user = await prisma.user.create({
        data: {
          email: bootEmail,
          name: "SGG Ventures administrator",
          passwordHash: await hashPassword(bootPassword),
          role: "admin",
          emailVerifiedAt: new Date(),
        },
      });
    }
  }

  if (!user) {
    await verifyPassword(password, DUMMY_HASH);
    return { ok: false, error: AUTH_FAILED };
  }

  if (!user.active || (user.lockedUntil && user.lockedUntil.getTime() > Date.now())) {
    await verifyPassword(password, user.passwordHash);
    return { ok: false, error: AUTH_FAILED };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    const attempts = user.failedAttempts + 1;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedAttempts: attempts,
        lockedUntil: attempts >= LOCK_AFTER ? new Date(Date.now() + LOCK_MS) : null,
      },
    });
    await prisma.auditLog.create({
      data: {
        actor: user.email,
        action: "auth.failure",
        detail: attempts >= LOCK_AFTER ? "locked" : `attempts=${attempts}`,
      },
    });
    return { ok: false, error: AUTH_FAILED };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { failedAttempts: 0, lockedUntil: null },
  });
  await startSession(user.id);
  await prisma.auditLog.create({
    data: { actor: user.email, action: "auth.session.start" },
  });
  return { ok: true, role: user.role === "admin" ? "admin" : "client" };
}

export async function signOutCurrent(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: sha256(token) } });
  }
  store.delete(SESSION_COOKIE);
}

export async function changeOwnPassword(
  userId: string,
  currentPassword: string,
  nextPassword: string,
): Promise<{ ok: boolean; error?: string }> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { ok: false, error: "Not authorized." };
  const problem = passwordProblem(nextPassword, user.email);
  if (problem) return { ok: false, error: problem };
  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) return { ok: false, error: "Current password is wrong." };
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: await hashPassword(nextPassword) },
  });
  await prisma.session.deleteMany({ where: { userId } });
  await startSession(userId);
  await prisma.auditLog.create({
    data: { actor: user.email, action: "auth.password.change" },
  });
  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Single-use tokens                                                    */
/* ------------------------------------------------------------------ */

export type TokenPurpose = "verify-email" | "reset-password";

const TOKEN_TTL_MS: Record<TokenPurpose, number> = {
  "verify-email": 1000 * 60 * 60 * 24, // 24 hours
  "reset-password": 1000 * 60 * 60, // 1 hour
};

async function issueToken(userId: string, purpose: TokenPurpose): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  await prisma.authToken.create({
    data: {
      userId,
      purpose,
      tokenHash: sha256(token),
      expiresAt: new Date(Date.now() + TOKEN_TTL_MS[purpose]),
    },
  });
  return token;
}

/**
 * Marks a token used and returns its user id, or null when the token is
 * unknown, expired, already used, or for a different purpose. The update is
 * conditional on `usedAt: null`, so a token can only be redeemed once even
 * under concurrent requests.
 */
async function consumeToken(rawToken: string, purpose: TokenPurpose): Promise<string | null> {
  if (!rawToken || rawToken.length > 200) return null;
  const tokenHash = sha256(rawToken);
  const token = await prisma.authToken.findUnique({ where: { tokenHash } });
  if (!token || token.purpose !== purpose || token.usedAt || token.expiresAt.getTime() < Date.now()) {
    return null;
  }
  const claimed = await prisma.authToken.updateMany({
    where: { id: token.id, usedAt: null },
    data: { usedAt: new Date() },
  });
  return claimed.count === 1 ? token.userId : null;
}

async function recentTokenCount(userId: string, purpose: TokenPurpose): Promise<number> {
  return prisma.authToken.count({
    where: { userId, purpose, createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) } },
  });
}

/* ------------------------------------------------------------------ */
/* Sign-up, verification, password reset                                */
/* ------------------------------------------------------------------ */

async function sendVerificationEmail(userId: string, email: string): Promise<void> {
  const token = await issueToken(userId, "verify-email");
  await sendAccountEmail({
    to: email,
    subject: "Confirm your email for SGG Ventures",
    heading: "Confirm your email address",
    body: "Thanks for creating an account. Confirm this is your email address to finish setting it up.",
    actionLabel: "Confirm email",
    actionUrl: `${SITE_URL}/verify-email?token=${encodeURIComponent(token)}`,
    footnote: "This link expires in 24 hours. If you did not create an account, you can ignore this email.",
  });
}

export async function createAccount(input: {
  name: string;
  email: string;
  organization?: string;
  password: string;
}): Promise<{ ok: true } | { ok: false; error: string; field?: "email" | "password" }> {
  const email = input.email.trim().toLowerCase();
  const problem = passwordProblem(input.password, email);
  if (problem) return { ok: false, error: problem, field: "password" };

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      ok: false,
      field: "email",
      error: "An account with this email already exists. Log in, or reset your password.",
    };
  }

  const user = await prisma.user.create({
    data: {
      email,
      name: input.name.trim(),
      organization: input.organization?.trim() || null,
      passwordHash: await hashPassword(input.password),
      role: "client",
    },
  });
  await prisma.auditLog.create({
    data: { actor: email, action: "auth.signup", targetId: user.id },
  });
  await startSession(user.id);
  try {
    await sendVerificationEmail(user.id, email);
  } catch (error) {
    // The account exists and the user is signed in; they can resend from the portal.
    console.error("[auth] verification email failed:", error);
  }
  return { ok: true };
}

export async function resendVerification(userId: string): Promise<{ ok: boolean; error?: string }> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { ok: false, error: "Not authorized." };
  if (user.emailVerifiedAt) return { ok: true };
  if ((await recentTokenCount(userId, "verify-email")) >= 3) {
    return { ok: false, error: "We have sent several links already. Check your inbox and spam folder, or try again in an hour." };
  }
  try {
    await sendVerificationEmail(user.id, user.email);
  } catch {
    return { ok: false, error: "The email could not be sent. Try again shortly." };
  }
  return { ok: true };
}

export async function verifyEmailToken(rawToken: string): Promise<boolean> {
  const userId = await consumeToken(rawToken, "verify-email");
  if (!userId) return false;
  const user = await prisma.user.update({
    where: { id: userId },
    data: { emailVerifiedAt: new Date() },
  });
  await prisma.auditLog.create({
    data: { actor: user.email, action: "auth.email.verified", targetId: user.id },
  });
  return true;
}

/**
 * Always resolves without revealing whether the address has an account.
 * Sends at most three reset emails per account per hour.
 */
export async function requestPasswordReset(rawEmail: string): Promise<void> {
  const email = rawEmail.trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.active) return;
  if ((await recentTokenCount(user.id, "reset-password")) >= 3) return;
  const token = await issueToken(user.id, "reset-password");
  await prisma.auditLog.create({
    data: { actor: email, action: "auth.password.reset.requested", targetId: user.id },
  });
  await sendAccountEmail({
    to: email,
    subject: "Reset your SGG Ventures password",
    heading: "Reset your password",
    body: "We received a request to reset the password for your account. Choose a new password using the button below.",
    actionLabel: "Choose a new password",
    actionUrl: `${SITE_URL}/reset-password?token=${encodeURIComponent(token)}`,
    footnote: "This link expires in 1 hour and works once. If you did not ask to reset your password, you can ignore this email; your password has not changed.",
  });
}

export async function resetPasswordWithToken(
  rawToken: string,
  nextPassword: string,
): Promise<{ ok: true } | { ok: false; error: string; expired?: boolean }> {
  const tokenHash = sha256(rawToken || "");
  const pending = await prisma.authToken.findUnique({ where: { tokenHash }, include: { user: true } });
  if (pending?.purpose === "reset-password") {
    const problem = passwordProblem(nextPassword, pending.user.email);
    if (problem) return { ok: false, error: problem };
  }
  const userId = await consumeToken(rawToken, "reset-password");
  if (!userId) {
    return { ok: false, expired: true, error: "This reset link is invalid or has expired. Request a new one." };
  }
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: await hashPassword(nextPassword),
      failedAttempts: 0,
      lockedUntil: null,
      // Receiving the reset email proves control of the address.
      emailVerifiedAt: pending?.user.emailVerifiedAt ?? new Date(),
    },
  });
  // Invalidate other outstanding reset links and every existing session.
  await prisma.authToken.updateMany({
    where: { userId, purpose: "reset-password", usedAt: null },
    data: { usedAt: new Date() },
  });
  await prisma.session.deleteMany({ where: { userId } });
  await prisma.auditLog.create({
    data: { actor: user.email, action: "auth.password.reset", targetId: user.id },
  });
  await startSession(userId);
  return { ok: true };
}
