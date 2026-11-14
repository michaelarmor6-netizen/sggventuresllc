"use server";

import { headers } from "next/headers";
import {
  partnershipSchema,
  FORM_MIN_FILL_SECONDS,
} from "@/lib/validation/schemas";
import { prisma } from "@/lib/server/db";
import { fingerprintIp, isSpamSubmission } from "@/lib/server/security";
import { sendInquiryNotification } from "@/lib/server/email";

export type PartnershipActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitPartnership(
  input: {
    organization: string;
    contactName: string;
    email: string;
    phone?: string;
    country: string;
    website?: string;
    partnerType: string;
    capabilities: string;
    consent: boolean;
    websiteUrl?: string;
    formStartedAt: number;
  },
): Promise<PartnershipActionResult> {
  const parsed = partnershipSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return {
      ok: false,
      error: "Please correct the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Rejections are reported as errors, never as success.
  const spam = isSpamSubmission(data.websiteUrl, data.formStartedAt, FORM_MIN_FILL_SECONDS);
  if (spam) {
    console.warn(`[partnership] rejected (${spam})`);
    return {
      ok: false,
      error:
        spam === "speed"
          ? "That was sent very quickly. Please wait a moment and send again."
          : "Your submission could not be accepted. Please reload the page and try again.",
    };
  }

  // Success is reported only after the record is stored.
  try {
  const ipHash = fingerprintIp(
    (await headers()).get("x-forwarded-for") ??
      (await headers()).get("x-real-ip"),
  );
  const recent = await prisma.partnershipInquiry.count({
    where: {
      createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
      ...(ipHash ? { notes: ipHash } : {}),
    },
  });
  if (recent >= 5) {
    return {
      ok: false,
      error: "Too many submissions from your network. Please try again later.",
    };
  }

  const record = await prisma.partnershipInquiry.create({
    data: {
      organization: data.organization,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone || null,
      country: data.country,
      website: data.website || null,
      partnerType: data.partnerType,
      capabilities: data.capabilities,
      consent: data.consent,
      notes: ipHash,
    },
  });

  try {
    await sendInquiryNotification({
      subject: `New partnership inquiry — ${data.partnerType} — ${data.organization}`,
      heading: "New Partnership Inquiry",
      rows: [
        ["Organization", data.organization],
        ["Contact", data.contactName],
        ["Email", data.email],
        ...(data.phone ? ([["Phone", data.phone]] as [string, string][]) : []),
        ["Country", data.country],
        ...(data.website
          ? ([["Website", data.website]] as [string, string][])
          : []),
        ["Category", data.partnerType],
        ["Reference", record.id],
      ],
      body: data.capabilities,
    });
  } catch (error) {
    console.error("[partnership] notification failed:", error);
  }

  return { ok: true };
  } catch (error) {
    console.error("[partnership] could not be stored:", error);
    return {
      ok: false,
      error: "We could not save your submission because of a problem on our side. Nothing was sent. Please try again in a few minutes.",
    };
  }
}
