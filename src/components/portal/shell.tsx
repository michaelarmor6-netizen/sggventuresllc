"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Logo } from "@/components/brand/logo";
import { clerkEnabled } from "@/lib/clerk-config";

export function PortalShell({
  name,
  role,
  children,
}: {
  name: string;
  role: "admin" | "client";
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-coolgray">
      <header className="border-b border-linehair bg-white">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link href="/portal" className="shrink-0" aria-label="Portal home">
            <Logo decorative />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden text-[14px] text-royal underline-offset-4 hover:underline sm:inline">
              Back to the website
            </Link>
            <p className="hidden text-right sm:block">
              <span className="block font-display text-[13px] font-semibold text-midnight">{name}</span>
              <span className="block text-[12px] text-slateink">
                {role === "admin" ? "Staff desk" : "Client files"}
              </span>
            </p>
            {/* Account settings, password, and sign-out are handled by Clerk. */}
            {clerkEnabled && <UserButton />}
          </div>
        </div>
      </header>
      <div className="container-x py-10">{children}</div>
    </div>
  );
}
