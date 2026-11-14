import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/classnames";
import { buttonClass } from "@/components/ui/button";

/** Full-width hero used by all interior pages. Navy engineered backdrop. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="navy-grid relative overflow-hidden text-white">
      <div className="container-x pb-14 pt-16 md:pb-20 md:pt-24">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-[12.5px] text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow ? (
          <p className="text-[14px] text-azure-light">{eyebrow}</p>
        ) : null}
        <h1 className="mt-3 max-w-4xl font-display text-display-lg">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/70">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Hairline divider between content sections. */
export function SectionRule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "container-x h-px bg-gradient-to-r from-linehair via-linehair to-transparent",
        className,
      )}
    />
  );
}

/** Inline "Contact our team" CTA band reused across pages. */
export function CtaBand({
  title = "If this sounds like your problem, let's talk.",
  body = "Describe the decision, the constraint, and the timeline. We will tell you which capability applies and whether we are the right firm for it.",
  primaryLabel = "Request a consultation",
  primaryHref = "/contact",
  secondaryHref = "/services",
  secondaryLabel = "Our services",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="border-t border-linehair bg-coolgray">
      <div className="container-x flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-xl">
          <h2 className="font-display text-display">{title}</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-slateink">
            {body}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={primaryHref} className={buttonClass("primary", "lg")}>
            {primaryLabel} <ArrowRight aria-hidden />
          </Link>
          <Link href={secondaryHref} className={buttonClass("outline", "lg")}>
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
