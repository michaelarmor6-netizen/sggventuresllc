"use server";

import { headers } from "next/headers";
import {
  enquirySchema,
  projectTypeLabel,
  FORM_MIN_FILL_SECONDS,
  type EnquiryInput,
} from "@/lib/validation/schemas";
import { prisma } from "@/lib/server/db";
import { clientIp, fingerprintIp, isSpamSubmission } from "@/lib/server/security";
import { sendInquiryNotification } from "@/lib/server/email";

export type EnquiryActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

const RATE_LIMIT_PER_HOUR = 5;

/**
 * Accepts a project enquiry.
 *
 * `ok: true` is returned only after the enquiry has been written to the
 * database. Every other path returns an error — nothing is reported as
 * sent unless it was stored. The notification email is a convenience on
 * top of the stored record: if it fails, the enquiry is still visible in
 * the staff portal, and the failure is logged.
 */
export async function submitEnquiry(
  input: EnquiryInput,
): Promise<EnquiryActionResult> {
  // 1. Validate with the server-authoritative schema.
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return {
      ok: false,
      error: "Some fields need attention. Check the messages below and send again.",
      fieldErrors,
    };
  }
  const data = parsed.data;

  // 2. Abuse protection. Rejections are reported as errors, never as success.
  const spam = isSpamSubmission(
    data.websiteUrl,
    data.formStartedAt,
    FORM_MIN_FILL_SECONDS,
  );
  if (spam === "speed") {
    return {
      ok: false,
      error: "That was sent very quickly. Please wait a moment and send again.",
    };
  }
  if (spam === "honeypot") {
    console.warn("[enquiry] rejected: hidden field was filled");
    return {
      ok: false,
      error: "Your enquiry could not be accepted. Please reload the page and try again.",
    };
  }

  try {
    const requestHeaders = await headers();
    const ipHash = fingerprintIp(clientIp(requestHeaders)) ?? "unknown";

    // 3. Coarse rate limit per network fingerprint.
    const recent = await prisma.inquiry.count({
      where: {
        submittedIp: ipHash,
        createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000) },
      },
    });
    if (recent >= RATE_LIMIT_PER_HOUR) {
      return {
        ok: false,
        error: "Too many enquiries have been sent from your network in the last hour. Please try again later.",
      };
    }

    // 4. Store. This is the point of acceptance.
    const enquiry = await prisma.inquiry.create({
      data: {
        fullName: data.name,
        company: data.businessName,
        email: data.email,
        division: data.projectType,
        message: data.description,
        budget: data.budget || null,
        timeline: data.timeline || null,
        consent: data.consent,
        sourcePage: requestHeaders.get("referer"),
        submittedIp: ipHash,
      },
    });

    // 5. Notify. Non-fatal: the stored record is the source of truth.
    try {
      await sendInquiryNotification({
        subject: `New project enquiry — ${projectTypeLabel(data.projectType)} — ${data.name}`,
        heading: "New project enquiry",
        rows: [
          ["Name", data.name],
          ["Business", data.businessName],
          ["Email", data.email],
          ["Project type", projectTypeLabel(data.projectType)],
          ["Budget", data.budget || "Not given"],
          ["Timeline", data.timeline || "Not given"],
          ["Reference", enquiry.id],
        ],
        body: data.description,
        replyTo: data.email,
      });
    } catch (error) {
      console.error("[enquiry] stored, but notification failed:", error);
    }

    return { ok: true };
  } catch (error) {
    console.error("[enquiry] could not be stored:", error);
    return {
      ok: false,
      error: "We could not save your enquiry because of a problem on our side. Nothing was sent. Please try again in a few minutes.",
    };
  }
}
