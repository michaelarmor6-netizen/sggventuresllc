import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthFrame, AuthUnavailable } from "@/components/auth/auth-frame";
import { clerkEnabled } from "@/lib/clerk-config";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthFrame
      title="Log in"
      subtitle="Clients can find their engagement files and updates here. Staff use the same sign-in for the desk."
    >
      {clerkEnabled ? <SignIn path="/login" routing="path" signUpUrl="/signup" /> : <AuthUnavailable />}
    </AuthFrame>
  );
}
