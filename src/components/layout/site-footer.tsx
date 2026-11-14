import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { COMPANY } from "@/lib/site";
import { LEGAL_LINKS } from "@/lib/navigation";
import { SERVICE_CATEGORIES } from "@/content/services";

const SERVICE_COLUMNS = [
  SERVICE_CATEGORIES.slice(0, 4),
  SERVICE_CATEGORIES.slice(4, 8),
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Governance", href: "/about/governance" },
  { label: "Company Profile", href: "/company-profile" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "FAQ", href: "/faq" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="navy-grid text-white">
      <div className="container-x pb-10 pt-14 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Company block */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/65">
              {COMPANY.positioningStatement}
            </p>
            <div className="mt-6 space-y-3 text-[15px]">
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-azure-light"
              >
                <Phone className="h-4 w-4 text-azure" aria-hidden="true" />
                <span className="font-semibold tracking-wide">
                  {COMPANY.phone}
                </span>
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-azure-light"
              >
                <Mail className="h-4 w-4 text-azure" aria-hidden="true" />
                <span className="font-semibold tracking-wide">
                  {COMPANY.email}
                </span>
              </a>
              {COMPANY.address && (
                <p className="flex items-start gap-2.5 text-white/55">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-azure"
                    aria-hidden="true"
                  />
                  <span>
                    {COMPANY.address.lines.join(", ")}
                    <span className="mt-0.5 block text-[12px] text-white/40">
                      {COMPANY.address.label}
                    </span>
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Service links */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-5">
            {SERVICE_COLUMNS.map((column, index) => (
              <nav
                key={index}
                aria-label={index === 0 ? "Service areas" : "More service areas"}
              >
                <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-light">
                  {index === 0 ? "Services" : "Capabilities"}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/services/${category.slug}`}
                        className="text-[15px] text-white/65 transition-colors hover:text-white"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Corporate nav */}
          <div className="lg:col-span-3">
            <nav aria-label="Company">
              <h3 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-light">
                Company
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/50 transition-colors hover:text-azure-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-[13px] text-white/40">
              © {year} {COMPANY.legalName}. All rights reserved.
            </p>
            <p className="flex items-start gap-2 text-[12px] leading-relaxed text-white/35 md:max-w-xl">
              <ShieldCheck
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-azure/70"
                aria-hidden="true"
              />
              <span>
                SGG Ventures provides consulting, advisory, and technology services
              directly. Where a licensed professional is required, that work is
              performed by a qualified third party named in the engagement. See
              our{" "}
              <Link
                href="/legal/regulatory-disclosures"
                className="underline decoration-white/25 underline-offset-2 transition-colors hover:text-azure-light"
              >
                Regulatory Disclosures
              </Link>{" "}
              for important information.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
