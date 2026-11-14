"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/server/db";
import { SERVICE_CATEGORIES } from "@/content/services";
import { requireAdmin } from "@/lib/server/auth";

/** Engagement files are classified by service area, matching the public site. */
const SERVICE_AREAS = SERVICE_CATEGORIES.map((category) => category.slug) as [
  string,
  ...string[],
];
const FILE_STATUS = ["intake", "active", "waiting-on-partner", "closed"] as const;
const DELIVERY = ["direct", "partner", "coordination"] as const;

const clientSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  organization: z.string().trim().max(160).optional(),
});

export async function createClientAccount(input: z.infer<typeof clientSchema>) {
  const admin = await requireAdmin();
  if (!admin) return { ok: false as const, error: "Not authorized." };
  const parsed = clientSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Check the name and email." };

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { ok: false as const, error: "That email already has a client record." };

  // No password is issued: the client signs up through Clerk with this
  // email address, and the record is linked once the address is verified.
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      organization: parsed.data.organization || null,
      role: "client",
    },
  });
  await prisma.auditLog.create({
    data: {
      actor: admin.email,
      action: "client.create",
      targetId: user.id,
      detail: email,
    },
  });
  revalidatePath("/portal");
  return { ok: true as const, email };
}

const fileSchema = z.object({
  clientId: z.string().min(10).max(64),
  title: z.string().trim().min(3).max(160),
  division: z.enum(SERVICE_AREAS),
  delivery: z.enum(DELIVERY),
  status: z.enum(FILE_STATUS),
  partnerName: z.string().trim().max(160).optional(),
  summary: z.string().trim().min(10).max(4000),
  internalNotes: z.string().trim().max(4000).optional(),
});

export async function createEngagement(input: {
  clientId: string;
  title: string;
  division: string;
  delivery: string;
  status: string;
  partnerName?: string;
  summary: string;
  internalNotes?: string;
}) {
  const admin = await requireAdmin();
  if (!admin) return { ok: false as const, error: "Not authorized." };
  const parsed = fileSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Check the file details." };

  const client = await prisma.user.findFirst({
    where: { id: parsed.data.clientId, role: "client", active: true },
  });
  if (!client) return { ok: false as const, error: "Choose an active client." };

  const file = await prisma.engagement.create({
    data: {
      clientId: client.id,
      title: parsed.data.title,
      division: parsed.data.division,
      delivery: parsed.data.delivery,
      status: parsed.data.status,
      partnerName: parsed.data.partnerName || null,
      summary: parsed.data.summary,
      internalNotes: parsed.data.internalNotes || null,
    },
  });
  await prisma.auditLog.create({
    data: {
      actor: admin.email,
      action: "engagement.create",
      targetId: file.id,
      detail: parsed.data.title,
    },
  });
  revalidatePath("/portal");
  return { ok: true as const };
}

const updateSchema = z.object({
  engagementId: z.string().min(10).max(64),
  body: z.string().trim().min(2).max(4000),
  visibleToClient: z.boolean(),
});

export async function addEngagementUpdate(input: z.infer<typeof updateSchema>) {
  const admin = await requireAdmin();
  if (!admin) return { ok: false as const, error: "Not authorized." };
  const parsed = updateSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Write a short update." };

  const file = await prisma.engagement.findUnique({
    where: { id: parsed.data.engagementId },
  });
  if (!file) return { ok: false as const, error: "That file was not found." };

  await prisma.engagementUpdate.create({
    data: {
      engagementId: file.id,
      authorId: admin.id,
      body: parsed.data.body,
      visibleToClient: parsed.data.visibleToClient,
    },
  });
  await prisma.auditLog.create({
    data: {
      actor: admin.email,
      action: "engagement.update",
      targetId: file.id,
      detail: parsed.data.visibleToClient ? "client-visible" : "internal",
    },
  });
  revalidatePath("/portal");
  return { ok: true as const };
}

const statusSchema = z.object({
  engagementId: z.string().min(10).max(64),
  status: z.enum(FILE_STATUS),
});

export async function setEngagementStatus(input: z.infer<typeof statusSchema>) {
  const admin = await requireAdmin();
  if (!admin) return { ok: false as const, error: "Not authorized." };
  const parsed = statusSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Invalid status." };
  await prisma.engagement.update({
    where: { id: parsed.data.engagementId },
    data: { status: parsed.data.status },
  });
  await prisma.auditLog.create({
    data: {
      actor: admin.email,
      action: "engagement.status",
      targetId: parsed.data.engagementId,
      detail: parsed.data.status,
    },
  });
  revalidatePath("/portal");
  return { ok: true as const };
}
