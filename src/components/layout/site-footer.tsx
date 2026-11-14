import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { COMPANY, PUBLIC_FACTS, phoneHref } from "@/lib/site";
import { LEGAL_LINKS } from "@/lib/navigation";
import { SERVICE_CATEGORIES } from "@/content/services";

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const headingClass = "text-[14px] font-semibold text-midnight";
const linkClass =
  "inline-flex min-h-8 items-center text-[14px] text-slateink underline-offset-4 hover:text-royal hover:underline";

/** Parchment footer: small type, hairline rules, no chrome. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { email, phone, address, entityDescription } = PUBLIC_FACTS;

  return (
    <footer className="bg-coolgray">
      <div className="container-x pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="md:col-span-2 lg:col-span-6">
            <Logo />
            <p className="mt-5 max-w-md text-[14px] leading-[1.5] text-slateink">
              {COMPANY.description}
            </p>
            {(email || phone || address) && (
              <ul className="mt-5 space-y-1">
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className={linkClass}>
                      {email}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={phoneHref(phone)} className={linkClass}>
                      {phone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="text-[14px] text-slateink">
                    {address.label}: {address.lines.join(", ")}
                  </li>
                )}
              </ul>
            )}
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className={headingClass}>Services</h2>
            <ul className="mt-3">
              {SERVICE_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link href={`/services/${category.slug}`} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-3">
            <h2 className={headingClass}>Company</h2>
            <ul className="mt-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-linehair pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-slateink">
            © {year} {COMPANY.legalName}
            {entityDescription ? `, a ${entityDescription}` : ""}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-8 items-center text-[13px] text-slateink underline-offset-4 hover:text-royal hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
