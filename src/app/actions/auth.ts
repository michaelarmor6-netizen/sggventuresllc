"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { prisma } from "@/lib/server/db";
import {
  createAccount,
  getSessionUser,
  PASSWORD_MAX,
  requestPasswordReset,
  resendVerification,
  resetPasswordWithToken,
} from "@/lib/server/auth";
import { clientIp, fingerprintIp, isSpamSubmission } from "@/lib/server/security";

export type AuthActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

const DB_ERROR =
  "We could not reach the account service. Nothing was changed. Try again in a few minutes.";

const SIGNUPS_PER_HOUR = 5;
const RESET_REQUESTS_PER_HOUR = 10;

async function networkFingerprint(): Promise<string> {
  return fingerprintIp(clientIp(await headers())) ?? "unknown";
}

/** Counts recent attempts of one kind from this network, then records this one. */
async function throttled(action: string, limit: number): Promise<boolean> {
  const ipHash = await networkFingerprint();
  const recent = await prisma.auditLog.count({
    where: {
      action,
      detail: ipHash,
      createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
    },
  });
  if (recent >= limit) return true;
  await prisma.auditLog.create({ data: { actor: "public", action, detail: ipHash } });
  return false;
}

/* ------------------------------------------------------------------ */
/* Sign up                                                              */
/* ------------------------------------------------------------------ */

const signUpSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address, like name@example.com.")
    .max(200, "Email is too long."),
  organization: z.string().trim().max(160, "Company name is too long.").optional().or(z.literal("")),
  password: z.string().max(PASSWORD_MAX),
  confirmPassword: z.string(),
  consent: z.boolean().refine((value) => value, {
    message: "Accept the Terms of Use and Privacy Policy to continue.",
  }),
  websiteUrl: z.string().max(200).optional().or(z.literal("")),
  formStartedAt: z.number().int().nonnegative(),
});

export async function signUp(input: z.infer<typeof signUpSchema>): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, error: "Check the highlighted fields.", fieldErrors };
  }
  const data = parsed.data;
  if (data.password !== data.confirmPassword) {
    return {
      ok: false,
      error: "Check the highlighted fields.",
      fieldErrors: { confirmPassword: "The passwords do not match." },
    };
  }
  const spam = isSpamSubmission(data.websiteUrl, data.formStartedAt, 3);
  if (spam) {
    return {
      ok: false,
      error:
        spam === "speed"
          ? "That was very quick. Wait a moment and try again."
          : "Your sign-up could not be accepted. Reload the page and try again.",
    };
  }

  try {
    if (await throttled("auth.signup.attempt", SIGNUPS_PER_HOUR)) {
      return { ok: false, error: "Too many sign-ups from your network in the last hour. Try again later." };
    }
    const result = await createAccount({
      name: data.name,
      email: data.email,
      organization: data.organization || undefined,
      password: data.password,
    });
    if (!result.ok) {
      return {
        ok: false,
        error: result.error,
        fieldErrors: result.field ? { [result.field]: result.error } : undefined,
      };
    }
    return { ok: true };
  } catch (error) {
    console.error("[auth] sign-up failed:", error);
    return { ok: false, error: DB_ERROR };
  }
}

/* ------------------------------------------------------------------ */
/* Forgot / reset password                                              */
/* ------------------------------------------------------------------ */

export async function forgotPassword(input: { email: string }): Promise<AuthActionResult> {
  const email = z.string().trim().email().max(200).safeParse(input.email);
  if (!email.success) {
    return { ok: false, error: "Enter a valid email address.", fieldErrors: { email: "Enter a valid email address." } };
  }
  try {
    if (await throttled("auth.password.reset.attempt", RESET_REQUESTS_PER_HOUR)) {
      return { ok: false, error: "Too many requests from your network. Try again later." };
    }
    await requestPasswordReset(email.data);
  } catch (error) {
    // Logged, but the response stays the same so it reveals nothing about the account.
    console.error("[auth] reset request failed:", error);
  }
  return { ok: true };
}

export async function resetPassword(input: {
  token: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthActionResult & { expired?: boolean }> {
  if (input.password !== input.confirmPassword) {
    return { ok: false, error: "The passwords do not match.", fieldErrors: { confirmPassword: "The passwords do not match." } };
  }
  try {
    const result = await resetPasswordWithToken(input.token, input.password);
    if (!result.ok) {
      return {
        ok: false,
        error: result.error,
        expired: result.expired,
        fieldErrors: result.expired ? undefined : { password: result.error },
      };
    }
    return { ok: true };
  } catch (error) {
    console.error("[auth] password reset failed:", error);
    return { ok: false, error: DB_ERROR };
  }
}

/* ------------------------------------------------------------------ */
/* Verification email                                                   */
/* ------------------------------------------------------------------ */

export async function resendVerificationEmail(): Promise<AuthActionResult> {
  const user = await getSessionUser();
  if (!user) return { ok: false, error: "Log in first." };
  try {
    const result = await resendVerification(user.id);
    return result.ok ? { ok: true } : { ok: false, error: result.error ?? "Try again shortly." };
  } catch (error) {
    console.error("[auth] resend verification failed:", error);
    return { ok: false, error: DB_ERROR };
  }
}
