import {
  createHash,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "crypto";
import { promisify } from "util";
import { cookies } from "next/headers";
import { prisma } from "@/lib/server/db";

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
};

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

async function startSession(userId: string): Promise<void> {
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

const AUTH_FAILED = "Authentication failed.";

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
  if (nextPassword.length < 10) {
    return { ok: false, error: "Use at least 10 characters." };
  }
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { ok: false, error: "Not authorized." };
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
