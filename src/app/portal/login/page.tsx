import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/server/auth";
import { PortalLoginForm } from "@/components/portal/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/portal");
  return <PortalLoginForm />;
}
