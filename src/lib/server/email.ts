/**
 * Enquiry notification email.
 *
 * Resend is used when RESEND_API_KEY, INQUIRY_NOTIFY_EMAIL and
 * INQUIRY_FROM_EMAIL are all configured. Otherwise nothing is emailed and
 * the notification is written to the server log; the enquiry itself is
 * already stored in the database and visible in the staff portal.
 *
 * There are deliberately no default addresses: a recipient or sender that
 * has not been confirmed must not be assumed.
 */
import { COMPANY } from "@/lib/site";

type NotificationPayload = {
  subject: string;
  heading: string;
  rows: [string, string][];
  body?: string;
  replyTo?: string;
};

function renderText(payload: NotificationPayload): string {
  const lines = [payload.heading, "", "=".repeat(48)];
  for (const [label, value] of payload.rows) {
    lines.push(`${label}: ${value}`);
  }
  if (payload.body) lines.push("", payload.body);
  lines.push("", `— ${COMPANY.legalName} website`);
  return lines.join("\n");
}

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml(payload: NotificationPayload): string {
  const rows = payload.rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px;font:600 13px Arial;color:#07182f;white-space:nowrap;vertical-align:top;">${esc(label)}</td><td style="padding:6px 14px 6px 0;font:13px Arial;color:#3d5266;">${esc(value)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#f2f5f9;padding:24px;font-family:Arial,sans-serif;">
<div style="max-width:620px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #dbe6f0;">
<div style="background:#07182f;padding:20px 26px;border-bottom:3px solid #b8975a;"><span style="color:#fff;font:800 16px Arial;">${esc(COMPANY.legalName)}</span></div>
<div style="padding:26px;"><h1 style="font:700 19px Arial;color:#07182f;margin:0 0 16px;">${esc(payload.heading)}</h1>
<table style="width:100%;border-collapse:collapse;background:#f2f5f9;border-radius:8px;">${rows}</table>
${payload.body ? `<p style="font:14px/1.6 Arial;color:#3d5266;margin:16px 0 0;white-space:pre-wrap;">${esc(payload.body)}</p>` : ""}
</div>
<div style="padding:14px 26px;background:#f2f5f9;font:12px Arial;color:#3d5266;">Sent by the website enquiry form. The enquiry is also stored in the staff portal.</div>
</div></body></html>`;
}

export async function sendInquiryNotification(
  payload: NotificationPayload,
): Promise<{ delivered: "email" | "log" }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const text = renderText(payload);

  if (!apiKey || !to || !from) {
    console.info(
      "[enquiry-notification] email not configured (RESEND_API_KEY, INQUIRY_NOTIFY_EMAIL, INQUIRY_FROM_EMAIL) — logged only",
    );
    console.info(`Subject: ${payload.subject}\n${text}`);
    return { delivered: "log" };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to,
    subject: payload.subject,
    html: renderHtml(payload),
    text,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  });

  if (result.error) {
    console.error("[enquiry-notification] Resend error:", result.error);
    throw new Error("Notification email failed to send.");
  }
  return { delivered: "email" };
}
