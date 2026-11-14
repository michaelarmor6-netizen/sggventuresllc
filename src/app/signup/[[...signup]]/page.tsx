import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { AuthFrame, AuthUnavailable } from "@/components/auth/auth-frame";
import { clerkEnabled } from "@/lib/clerk-config";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AuthFrame
      title="Create an account"
      subtitle="One account for your engagement files and updates with SGG Ventures."
    >
      {clerkEnabled ? <SignUp path="/signup" routing="path" signInUrl="/login" /> : <AuthUnavailable />}
    </AuthFrame>
  );
}
