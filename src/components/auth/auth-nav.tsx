"use client";

import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { clerkEnabled } from "@/lib/clerk-config";
import { buttonClass } from "@/components/ui/button";

const linkClass =
  "flex min-h-11 items-center whitespace-nowrap rounded-lg px-3.5 font-display text-[15px] font-semibold tracking-tight text-midnight transition-colors hover:text-royal";

/** Desktop header: "Log in" when signed out; portal link and account menu when signed in. */
export function HeaderAuth({ current }: { current: boolean }) {
  const login = (
    <Link href="/login" aria-current={current ? "page" : undefined} className={linkClass}>
      Log in
    </Link>
  );
  if (!clerkEnabled) return login;
  return (
    <>
      <Show when="signed-out">{login}</Show>
      <Show when="signed-in">
        <span className="flex items-center gap-2 pr-3">
          <Link href="/portal" className={linkClass}>
            Portal
          </Link>
          <UserButton />
        </span>
      </Show>
    </>
  );
}

/** Mobile menu button. */
export function MobileAuth() {
  const login = (
    <Link href="/login" className={buttonClass("outline", "lg") + " w-full"}>
      Log in
    </Link>
  );
  if (!clerkEnabled) return login;
  return (
    <>
      <Show when="signed-out">{login}</Show>
      <Show when="signed-in">
        <Link href="/portal" className={buttonClass("outline", "lg") + " w-full"}>
          Your portal
        </Link>
      </Show>
    </>
  );
}
