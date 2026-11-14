import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/server/auth";
import { AuthLink, AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/forms";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/portal");
  return (
    <AuthShell
      title="Log in"
      subtitle="Clients see their engagement files and updates. Staff see the desk."
      footer={
        <>
          New to SGG Ventures? <AuthLink href="/signup">Create an account</AuthLink>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
