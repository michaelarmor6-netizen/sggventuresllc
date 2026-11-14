import type { Metadata } from "next";
import { AuthLink, AuthNotice, AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/forms";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false, follow: false },
  // Keep the token out of the Referer header sent to any third party.
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  const value = typeof token === "string" ? token : "";
  return (
    <AuthShell
      title="Choose a new password"
      subtitle="Choosing a new password signs you out on every other device."
      footer={
        <>
          Back to <AuthLink href="/login">Log in</AuthLink>
        </>
      }
    >
      {value ? (
        <ResetPasswordForm token={value} />
      ) : (
        <AuthNotice tone="error">
          This page needs the link from your reset email.{" "}
          <AuthLink href="/forgot-password">Request a new link</AuthLink>.
        </AuthNotice>
      )}
    </AuthShell>
  );
}
