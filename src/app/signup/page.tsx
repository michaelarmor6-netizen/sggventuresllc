import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/server/auth";
import { AuthLink, AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/forms";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  if (await getSessionUser()) redirect("/portal");
  return (
    <AuthShell
      title="Create an account"
      subtitle="One account for your engagement files, updates, and documents with SGG Ventures."
      footer={
        <>
          Already have an account? <AuthLink href="/login">Log in</AuthLink>
        </>
      }
    >
      <SignUpForm />
    </AuthShell>
  );
}
