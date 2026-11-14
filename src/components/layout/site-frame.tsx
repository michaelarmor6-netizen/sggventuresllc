"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const portal = pathname.startsWith("/portal") || pathname.startsWith("/admin");
  if (portal) return <>{children}</>;
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
