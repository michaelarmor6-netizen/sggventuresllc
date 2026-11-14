"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/server/db";
import { requireAdmin } from "@/lib/server/auth";

/* ------------------------------------------------------------------ */
/* Authentication                                                       */
/* ------------------------------------------------------------------ */

export async function isAdminAuthenticated(): Promise<boolean> {
  return Boolean(await requireAdmin());
}

/* ------------------------------------------------------------------ */
/* Inquiry administration — every change is audit-logged                */
/* ------------------------------------------------------------------ */

const INQUIRY_STATUSES = ["new", "in-review", "responded", "closed"] as const;

const statusUpdateSchema = z.object({
  kind: z.enum(["inquiry", "partnership"]),
  id: z.string().min(10).max(64),
  status: z.enum(INQUIRY_STATUSES, {
    message: "Invalid status value.",
  }),
  notes: z.string().max(2000).optional(),
});

export async function updateInquiry(
  input: {
    kind: "inquiry" | "partnership";
    id: string;
    status: string;
    notes?: string;
  },
): Promise<{ ok: boolean; error?: string }> {
  const admin = await requireAdmin();
  if (!admin) {
    return { ok: false, error: "Not authorized." };
  }

  const parsed = statusUpdateSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };
  const { kind, id, status, notes } = parsed.data;

  try {
    if (kind === "inquiry") {
      await prisma.inquiry.update({
        where: { id },
        data: { status, ...(notes !== undefined ? { notes } : {}) },
      });
    } else {
      await prisma.partnershipInquiry.update({
        where: { id },
        data: { status, ...(notes !== undefined ? { notes } : {}) },
      });
    }
    await prisma.auditLog.create({
      data: {
        actor: admin.email,
        action: `${kind}.status.update`,
        targetId: id,
        detail: `status=${status}${notes !== undefined ? "; notes updated" : ""}`,
      },
    });
    revalidatePath("/admin");
    return { ok: true };
  } catch {
    return { ok: false, error: "Update failed." };
  }
}

export async function getAuditTrail(limit = 25) {
  if (!(await requireAdmin())) return [];
  return prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
