/**
 * Authentication is provided by Clerk. Clerk owns credentials, sessions,
 * email verification, and password reset.
 *
 * This module maps a signed-in Clerk user to the local `User` record that
 * the portal uses for roles (admin | client) and engagement files:
 *
 * - The first time a Clerk user reaches the portal, their local record is
 *   found by `clerkUserId`, or linked by verified email address (so a client
 *   record created by staff is claimed when that person signs up), or
 *   created as a new client.
 * - A Clerk user whose verified primary email equals ADMIN_EMAIL is staff.
 * - Unverified email addresses are never linked or created.
 */
import { auth, currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/server/db";
import { clerkEnabled } from "@/lib/clerk-config";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  organization: string | null;
  role: "admin" | "client";
};

function toSessionUser(user: {
  id: string;
  email: string;
  name: string;
  organization: string | null;
  role: string;
}): SessionUser | null {
  if (user.role !== "admin" && user.role !== "client") return null;
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    organization: user.organization,
    role: user.role,
  };
}

async function linkOrCreateLocalUser(clerkUserId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const primary = clerkUser.emailAddresses.find(
    (address) => address.id === clerkUser.primaryEmailAddressId,
  );
  if (!primary || primary.verification?.status !== "verified") return null;

  const email = primary.emailAddress.trim().toLowerCase();
  const name =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ||
    clerkUser.username ||
    email;
  const isAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() === email;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // An email already bound to a different Clerk account is never re-linked.
    if (existing.clerkUserId && existing.clerkUserId !== clerkUserId) return null;
    const linked = await prisma.user.update({
      where: { id: existing.id },
      data: { clerkUserId, ...(isAdminEmail ? { role: "admin" } : {}) },
    });
    await prisma.auditLog.create({
      data: { actor: email, action: "auth.account.linked", targetId: linked.id },
    });
    return linked;
  }

  const created = await prisma.user.create({
    data: {
      email,
      clerkUserId,
      name,
      role: isAdminEmail ? "admin" : "client",
    },
  });
  await prisma.auditLog.create({
    data: { actor: email, action: "auth.account.created", targetId: created.id },
  });
  return created;
}

/** The signed-in user's local record, or null when signed out or not allowed. */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (!clerkEnabled || !process.env.CLERK_SECRET_KEY) return null;
  const { userId } = await auth();
  if (!userId) return null;

  let user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
  if (!user) {
    try {
      user = await linkOrCreateLocalUser(userId);
    } catch (error) {
      // Two first requests can race to create the same record; the loser re-reads it.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        user = await prisma.user.findUnique({ where: { clerkUserId: userId } });
      } else {
        throw error;
      }
    }
  }
  if (!user || !user.active) return null;
  return toSessionUser(user);
}

export async function requireUser(): Promise<SessionUser | null> {
  return getSessionUser();
}

export async function requireAdmin(): Promise<SessionUser | null> {
  const user = await getSessionUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
