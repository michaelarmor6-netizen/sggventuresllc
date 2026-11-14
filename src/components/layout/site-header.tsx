"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { NAV } from "@/lib/navigation";
import { COMPANY } from "@/lib/site";
import { Logo } from "@/components/brand/logo";
import { buttonClass } from "@/components/ui/button";
import { HeaderAuth, MobileAuth } from "@/components/auth/auth-nav";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  // Close menus whenever a navigation occurs.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50 border-b border-linehair bg-white"
      onMouseLeave={() => setOpenMenu(null)}
    >
      {/* Utility bar */}
      <div className="hidden bg-midnight text-white lg:block">
        <div className="container-x flex h-9 items-center justify-between text-[13px]">
          <p className="font-display font-semibold uppercase tracking-[0.14em] text-azure-light">
            {COMPANY.tagline}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={COMPANY.phoneHref}
              className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-azure-light"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-x relative flex h-[4.5rem] items-center justify-between md:h-20">
        <Link
          href="/"
          aria-label="SGG Ventures home page"
          className="shrink-0 rounded-md transition-opacity hover:opacity-80"
          prefetch={false}
        >
          <Logo decorative priority />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center xl:flex">
          <ul className="flex items-center gap-0.5">
            {NAV.map((section) => {
              const active = isActive(pathname, section.href);
              const hasLinks = Boolean(section.links?.length);
              const isOpen = openMenu === section.label;
              return (
                <li
                  key={section.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(section.label)}
                >
                  <div
                    className="flex items-stretch"
                    onFocus={() => setOpenMenu(section.label)}
                  >
                    <Link
                      href={section.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center whitespace-nowrap rounded-lg px-3.5 py-2.5 font-display text-[15px] font-semibold tracking-tight transition-colors ${
 active ? "text-royal" : "text-midnight hover:text-royal"
 }`}
                    >
                      {section.label}
                    </Link>
                    {hasLinks && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${section.label} submenu`}
                        onClick={() =>
                          setOpenMenu(isOpen ? null : section.label)
                        }
                        className="flex items-center pr-2 pl-0.5 text-slateink transition-colors hover:text-royal"
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform ${
 isOpen ? "rotate-180" : ""
 }`}
                          aria-hidden="true"
                        />
                      </button>
                    )}
                  </div>
                  {hasLinks && isOpen && (
                    <div
                      className={`absolute top-full z-50 -translate-x-1/2 pt-2 ${
 section.links!.length > 6
 ? "left-1/2 w-[34rem]"
 : "left-1/2 w-80 xl:w-[340px]"
 }`}
                      onMouseEnter={() => setOpenMenu(section.label)}
                    >
                      <div className="max-h-[calc(100vh-7rem)] overflow-y-auto rounded-[14px] border border-linehair bg-white">
                        <ul
                          className={`p-2 ${
 section.links!.length > 6
 ? "grid grid-cols-2 gap-1"
 : ""
 }`}
                        >
                          {section.links!.map((link, i) => (
                            <li key={link.href} className={i > 0 ? "mt-0.5" : ""}>
                              <Link
                                href={link.href}
                                className="block rounded-xl px-4 py-3 transition-colors hover:bg-mist"
                              >
                                <span className="font-display text-[14px] font-semibold text-midnight">
                                  {link.label}
                                </span>
                                {link.description && (
                                  <span className="mt-0.5 block text-[13px] leading-snug text-slateink/80">
                                    {link.description}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="border-t border-linehair bg-coolgray px-5 py-3">
                          <Link
                            href={section.href}
                            className="font-display text-[13px] font-semibold text-royal transition-colors hover:text-azure-deep"
                          >
                            {section.label} overview →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            <li aria-hidden="true" className="mx-2.5 h-5 w-px bg-linehair" />
            <li>
              <HeaderAuth current={isActive(pathname, "/login")} />
            </li>
          </ul>
          <Link
            href="/contact"
            className={buttonClass("primary", "sm") + " whitespace-nowrap"}
          >
            Request a consultation
          </Link>
        </nav>

        {/* Mobile controls */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-midnight transition-colors hover:bg-coolgray xl:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <X className="h-5.5 w-5.5" aria-hidden="true" />
          ) : (
            <Menu className="h-5.5 w-5.5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 top-[4.5rem] z-40 flex flex-col bg-white md:top-20 lg:top-[7.25rem] xl:hidden"
        >
          <nav
            aria-label="Primary mobile"
            className="flex-1 overflow-y-auto px-5 pb-8 pt-4"
          >
            <ul className="space-y-1">
              {NAV.map((section) => {
                const sectionOpen = mobileSection === section.label;
                return (
                  <li key={section.label} className="border-b border-linehair/80">
                    <div className="flex items-center">
                      <Link
                        href={section.href}
                        className={`flex-1 py-3.5 font-display text-[17px] font-bold ${
 isActive(pathname, section.href)
 ? "text-royal"
 : "text-midnight"
 }`}
                      >
                        {section.label}
                      </Link>
                      {section.links && (
                        <button
                          type="button"
                          aria-expanded={sectionOpen}
                          aria-label={`Toggle ${section.label} submenu`}
                          onClick={() =>
                            setMobileSection(sectionOpen ? null : section.label)
                          }
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slateink hover:bg-coolgray"
                        >
                          <ChevronDown
                            className={`h-4.5 w-4.5 transition-transform ${
 sectionOpen ? "rotate-180" : ""
 }`}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                    {section.links && sectionOpen && (
                      <ul className="pb-3 pl-1">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className={`block rounded-lg px-3 py-2.5 text-[15px] ${
 isActive(pathname, link.href)
 ? "bg-mist font-semibold text-royal"
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
                );
              })}
            </ul>
            <div className="mt-6 space-y-3">
              <MobileAuth />
              <Link
                href="/contact"
                className={buttonClass("primary", "lg") + " w-full"}
              >
                Request a consultation
              </Link>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center justify-center gap-2 py-2 text-[15px] font-semibold text-midnight"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {COMPANY.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
