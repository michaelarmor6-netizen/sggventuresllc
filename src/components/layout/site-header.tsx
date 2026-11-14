"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV, PRIMARY_CTA } from "@/lib/navigation";
import { COMPANY } from "@/lib/site";
import { Logo } from "@/components/brand/logo";
import { buttonClass } from "@/components/ui/button";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Close menus whenever a navigation occurs.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Escape closes any open menu; focus leaving the header closes dropdowns.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-linehair bg-white/85 backdrop-blur-xl backdrop-saturate-150"
      onMouseLeave={() => setOpenMenu(null)}
      onBlur={(event) => {
        if (!headerRef.current?.contains(event.relatedTarget as Node | null)) {
          setOpenMenu(null);
        }
      }}
    >
      <div className="container-x relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${COMPANY.legalName} — home`}
          className="shrink-0 rounded-md transition-opacity hover:opacity-80"
        >
          <Logo decorative priority />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center lg:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((section) => {
              const active = isActive(pathname, section.href);
              const hasLinks = Boolean(section.links?.length);
              const isOpen = openMenu === section.label;
              return (
                <li
                  key={section.label}
                  className="relative"
                  onMouseEnter={() =>
                    setOpenMenu(hasLinks ? section.label : null)
                  }
                >
                  <div className="flex items-stretch">
                    <Link
                      href={section.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center rounded-full px-3.5 text-[14px] transition-colors ${
                        active
                          ? "font-semibold text-midnight"
                          : "text-slateink hover:text-midnight"
                      }`}
                    >
                      {section.label}
                    </Link>
                    {hasLinks && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls="services-menu"
                        aria-label={`${isOpen ? "Close" : "Open"} ${section.label} menu`}
                        onClick={() =>
                          setOpenMenu(isOpen ? null : section.label)
                        }
                        className="-ml-2 flex min-h-11 w-8 items-center justify-center rounded-full text-slateink transition-colors hover:text-midnight"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                  {hasLinks && isOpen && (
                    <div
                      id="services-menu"
                      className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-2"
                    >
                      <ul className="rounded-xl border border-linehair bg-white p-2">
                        {section.links!.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="block rounded-lg px-4 py-3 transition-colors hover:bg-coolgray"
                            >
                              <span className="block text-[15px] font-semibold text-midnight">
                                {link.label}
                              </span>
                              {link.description && (
                                <span className="mt-0.5 block text-[13px] leading-snug text-slateink">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href={PRIMARY_CTA.href}
            className={buttonClass("primary", "sm") + " ml-4 whitespace-nowrap"}
          >
            {PRIMARY_CTA.label}
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full text-midnight transition-colors hover:bg-coolgray lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-white lg:hidden"
        >
          <nav
            aria-label="Primary mobile"
            className="flex-1 overflow-y-auto px-5 pb-8 pt-2"
          >
            <ul>
              {NAV.map((section) => (
                <li key={section.label} className="border-b border-linehair">
                  <Link
                    href={section.href}
                    aria-current={
                      isActive(pathname, section.href) ? "page" : undefined
                    }
                    className={`flex min-h-12 items-center py-3 font-display text-[24px] font-bold tracking-[-0.01em] ${
                      isActive(pathname, section.href)
                        ? "text-royal"
                        : "text-midnight"
                    }`}
                  >
                    {section.label}
                  </Link>
                  {section.links && (
                    <ul className="pb-3">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            aria-current={
                              isActive(pathname, link.href) ? "page" : undefined
                            }
                            className={`flex min-h-11 items-center rounded-lg px-3 text-[17px] ${
                              isActive(pathname, link.href)
                                ? "bg-coolgray font-semibold text-midnight"
                                : "text-slateink hover:bg-coolgray"
                            }`}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              href={PRIMARY_CTA.href}
              className={buttonClass("primary", "lg") + " mt-6 w-full"}
            >
              {PRIMARY_CTA.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
