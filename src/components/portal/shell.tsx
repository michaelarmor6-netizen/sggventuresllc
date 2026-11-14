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
                router.push("/login");
                router.refresh();
              }}
              className="inline-flex min-h-9 items-center rounded-full border border-royal bg-white px-4 text-[14px] text-royal transition-colors hover:bg-royal/5"
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
