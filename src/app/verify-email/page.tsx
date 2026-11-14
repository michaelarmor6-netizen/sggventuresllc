import type { Metadata } from "next";
import Link from "next/link";
import { verifyEmailToken } from "@/lib/server/auth";
import { AuthNotice, AuthShell } from "@/components/auth/auth-shell";
import { buttonClass } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Confirm your email",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  let verified = false;
  let failed = false;
  if (typeof token === "string" && token) {
    try {
      verified = await verifyEmailToken(token);
    } catch (error) {
      console.error("[auth] verification failed:", error);
      failed = true;
    }
  }

  return (
    <AuthShell
      title={verified ? "Email confirmed" : "Confirm your email"}
      subtitle={
        verified
          ? "Thanks. Your email address is confirmed."
          : "We could not confirm your email with this link."
      }
    >
      {verified ? (
        <Link href="/portal" className={buttonClass("primary", "lg") + " w-full"}>
          Go to your portal
        </Link>
      ) : (
        <div className="space-y-5">
          <AuthNotice tone="error">
            {failed
              ? "The account service could not be reached. Try the link again in a few minutes."
              : "The link may have expired (links last 24 hours) or already been used. Log in to send a new one."}
          </AuthNotice>
          <Link href="/login" className={buttonClass("primary", "lg") + " w-full"}>
            Log in
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
