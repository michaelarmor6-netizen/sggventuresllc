"use client";

import { useState } from "react";
import { resendVerificationEmail } from "@/app/actions/auth";

/** Shown in the portal until the user confirms their email address. */
export function VerifyBanner({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const resend = async () => {
    setState("busy");
    setMessage(null);
    try {
      const result = await resendVerificationEmail();
      if (result.ok) setState("sent");
      else {
        setState("error");
        setMessage(result.error);
      }
    } catch {
      setState("error");
      setMessage("The email could not be sent. Try again shortly.");
    }
  };

  return (
    <div role="status" className="mb-8 flex flex-col gap-3 rounded-xl border border-linehair bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[15px] leading-[1.47] text-ink">
        <span className="font-semibold">Confirm your email.</span> We sent a link to {email}.
        {state === "sent" && " A new link is on its way."}
        {message && <span className="block text-red-700">{message}</span>}
      </p>
      <button
        type="button"
        onClick={resend}
        disabled={state === "busy" || state === "sent"}
        className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-royal px-5 text-[15px] text-royal transition-colors hover:bg-royal/5 disabled:opacity-50"
      >
        {state === "busy" ? "Sending…" : state === "sent" ? "Sent" : "Resend link"}
      </button>
    </div>
  );
}
