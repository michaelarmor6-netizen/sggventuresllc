import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/classnames";
import { buttonClass } from "@/components/ui/button";

/** Interior-page hero: white canvas, large tight headline, breadcrumb. */
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
    <section className="bg-white">
      <div className="container-x pb-12 pt-10 md:pb-16 md:pt-14">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1 text-[14px] text-slateink">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-8 items-center underline-offset-4 hover:text-royal hover:underline"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="inline-flex min-h-8 items-center underline-offset-4 hover:text-royal hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-ink" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="max-w-4xl font-display text-display-lg text-midnight">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-[21px] leading-[1.38] text-slateink">
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
    <div aria-hidden="true" className={cn("container-x h-px bg-linehair", className)} />
  );
}

/** Closing project-enquiry tile: dark brand navy, centred, one white pill. */
export function CtaBand({
  title = "Tell us what you want to build.",
  body = "Share a little about your business, the problem you want to solve, and your preferred timeline. We will review your enquiry and discuss whether the project fits our services.",
  primaryLabel = "Discuss your project",
  primaryHref = "/contact",
  secondaryHref,
  secondaryLabel,
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="navy-grid">
      <div className="container-x flex flex-col items-center py-20 text-center md:py-28">
        <h2 className="max-w-3xl font-display text-display-lg text-white">{title}</h2>
        <p className="mt-5 max-w-2xl text-[19px] leading-[1.42] text-white/80">
          {body}
        </p>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link href={primaryHref} className={buttonClass("inverse", "lg")}>
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link href={secondaryHref} className={buttonClass("inverseOutline", "lg")}>
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
