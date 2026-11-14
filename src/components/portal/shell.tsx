"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { portalSignOut } from "@/app/actions/portal";
import { Logo } from "@/components/brand/logo";

export function PortalShell({
  name,
  role,
  children,
}: {
  name: string;
  role: "admin" | "client";
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-coolgray">
      <header className="border-b border-linehair bg-white">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link href="/portal" className="shrink-0" aria-label="Portal home">
            <Logo decorative />
          </Link>
          <div className="flex items-center gap-3">
            <p className="hidden text-right sm:block">
              <span className="block font-display text-[13px] font-semibold text-midnight">{name}</span>
              <span className="block text-[12px] text-slateink">
                {role === "admin" ? "Staff desk" : "Client files"}
              </span>
            </p>
            <button
              type="button"
              onClick={async () => {
                await portalSignOut();
                router.push("/portal/login");
                router.refresh();
              }}
              className="h-9 rounded-full border border-linehair bg-white px-4 font-display text-[13px] font-semibold text-midnight hover:border-[#0066cc] hover:text-[#0066cc]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="container-x py-10">{children}</div>
    </div>
  );
}
