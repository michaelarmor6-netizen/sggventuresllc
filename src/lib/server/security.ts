import { createHash, createHmac, timingSafeEqual } from "crypto";

/* ------------------------------------------------------------------ */
/* misc request utils                                                   */
/* ------------------------------------------------------------------ */

/** Coarse, salted IP fingerprint for spam analysis (never stored raw). */
export function fingerprintIp(raw?: string | null): string | null {
  if (!raw) return null;
  const salt = process.env.ADMIN_SESSION_SECRET || "sfg-local-salt";
  return createHash("sha256").update(`${salt}:${raw}`).digest("hex").slice(0, 24);
}

export function clientIp(headers: Headers): string | null {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    null
  );
}

/* ------------------------------------------------------------------ */
/* Spam protection                                                      */
/* ------------------------------------------------------------------ */

export function isSpamSubmission(
  honeypot: string | undefined,
  formStartedAt: number | undefined,
  minFillSeconds: number,
): "honeypot" | "speed" | null {
  if (honeypot) return "honeypot";
  if (typeof formStartedAt === "number" && formStartedAt > 0) {
    const elapsed = Date.now() - formStartedAt;
    if (elapsed < minFillSeconds * 1000) return "speed";
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Admin authentication — password env + HMAC-signed session cookie     */
/* ------------------------------------------------------------------ */

const ADMIN_COOKIE = "sfg_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

function hmac(value: string): string {
  const secret = process.env.ADMIN_SESSION_SECRET || "sfg-local-dev-secret";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function createAdminSessionToken(): string {
  const expires = String(Date.now() + SESSION_TTL_MS);
  return `${expires}.${hmac(expires)}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  const expected = hmac(expires);
  if (
    signature.length !== expected.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return false;
  }
  return Number(expires) > Date.now();
}

export function checkAdminPassword(
  password: string | undefined,
): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const ADMIN_COOKIE_NAME = ADMIN_COOKIE;
