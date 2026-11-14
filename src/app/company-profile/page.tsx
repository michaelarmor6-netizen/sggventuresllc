import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/content/services";
import { COMPANY } from "@/lib/site";
import {
  MISSION,
  VISION,
  CORE_VALUES,
  DIFFERENTIATORS,
  METHODOLOGY,
  ENGAGEMENT_PROCESS,
} from "@/content/company";
import { PrintButton } from "@/components/shared/print-button";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Company Profile",
  description:
    "A print-friendly overview of SGG Ventures LLC: positioning, service areas, methodology, engagement process, and contact details.",
  path: "/company-profile",
});

export default function CompanyProfilePage() {
  return (
    <article className="bg-white">
      {/* Header */}
      <header className="navy-grid text-white print:bg-white print:text-midnight">
        <div className="container-x py-14 md:py-20">
          <p className="eyebrow text-azure-light print:text-azure-deep">
            Company Profile
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-display-lg">
            {COMPANY.legalName}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70 print:text-slateink">
            {COMPANY.positioningStatement}
          </p>
          <p className="mt-4 font-display text-[15px] font-semibold text-azure-light print:text-royal">
            {COMPANY.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <PrintButton />
            <Link
              href="/contact"
              className="inline-flex h-[52px] items-center rounded-full border border-white/25 bg-white/5 px-8 font-display text-[15px] text-white backdrop-blur-sm transition-colors hover:border-azure hover:bg-azure/15"
            >
              Request a consultation
            </Link>
          </div>
        </div>
      </header>

      <div className="container-x max-w-4xl py-12 md:py-16">
        {/* Firm facts */}
        <section>
          <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-deep">
            Firm Facts
          </h2>
          <dl className="mt-4 grid gap-4 border-y border-linehair py-6 sm:grid-cols-2">
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slateink/80">
                Legal name
              </dt>
              <dd className="mt-1 font-semibold text-midnight">{COMPANY.legalName}</dd>
            </div>
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slateink/80">
                Entity
              </dt>
              <dd className="mt-1 text-midnight">
                {COMPANY.entityType}, {COMPANY.jurisdiction}
              </dd>
            </div>
            {COMPANY.address && (
              <div>
                <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slateink/80">
                  {COMPANY.address.label}
                </dt>
                <dd className="mt-1 text-midnight">
                  {COMPANY.address.lines.join(", ")}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slateink/80">
                Contact
              </dt>
              <dd className="mt-1 text-midnight">
                {COMPANY.phone}
                <br />
                {COMPANY.email}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-slateink/80">
                Registration
              </dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-slateink">
                {COMPANY.registration.number
                  ? `Wyoming LLC No. ${COMPANY.registration.number}${
                      COMPANY.registration.formedOn
                        ? `, formed ${COMPANY.registration.formedOn}`
                        : ""
                    }`
                  : COMPANY.registration.note}
              </dd>
            </div>
          </dl>
        </section>

        {/* Mission & vision */}
        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-linehair bg-coolgray p-6">
            <h2 className="font-display text-[15px] font-semibold text-midnight">Mission</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slateink">{MISSION}</p>
          </div>
          <div className="rounded-xl border border-linehair bg-coolgray p-6">
            <h2 className="font-display text-[15px] font-semibold text-midnight">Vision</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slateink">{VISION}</p>
          </div>
        </section>

        {/* Service areas */}
        <section className="mt-12">
          <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-deep">
            Service Areas
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {SERVICE_CATEGORIES.map((category) => (
              <div key={category.slug} className="rounded-xl border border-linehair p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[15px] font-semibold text-midnight">
                    {category.name}
                  </h3>
                  <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-azure-deep">
                    {category.code}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slateink">
                  {category.tagline}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {category.services.map((service) => (
                    <li key={service.slug} className="text-[13px] leading-snug text-slateink">
                      {service.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mt-12">
          <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-deep">
            Core Values
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {CORE_VALUES.map((value) => (
              <div key={value.title}>
                <h3 className="font-display text-[15px] font-semibold text-midnight">
                  {value.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slateink">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="mt-12">
          <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-deep">
            Methodology
          </h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-2">
            {METHODOLOGY.map((step) => (
              <li key={step.step} className="rounded-xl border border-linehair p-5">
                <span className="font-display text-[12px] font-semibold tracking-[0.14em] text-azure-deep">
                  {step.step}
                </span>
                <h3 className="mt-1 font-display text-[15px] font-semibold text-midnight">
                  {step.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slateink">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Engagement process */}
        <section className="mt-12">
          <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-deep">
            Engagement Process
          </h2>
          <ol className="mt-4 space-y-4">
            {ENGAGEMENT_PROCESS.map((step) => (
              <li key={step.step} className="flex gap-4 border-b border-linehair pb-4">
                <span className="font-display text-[13px] font-semibold text-azure-deep">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-display text-[15px] font-semibold text-midnight">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slateink">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Differentiators */}
        <section className="mt-12">
          <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-azure-deep">
            Why SGG Ventures
          </h2>
          <ul className="mt-4 space-y-3">
            {DIFFERENTIATORS.map((item) => (
              <li key={item.title} className="text-[15px] leading-relaxed text-slateink">
                <strong className="font-semibold text-midnight">{item.title}.</strong>{" "}
                {item.body}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-xl border border-linehair bg-mist p-5">
          <h2 className="font-display text-[13px] font-semibold text-midnight">
            Important information
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-slateink">
            SGG Ventures provides consulting, advisory, and technology services
            directly. Where an engagement requires a licensed professional
            (legal, tax, accounting, securities, or a regulated technology
            certification), that work is performed by a qualified third party
            named in the engagement. SGG Ventures does not provide securities
            brokerage, investment management, or regulated financial advice. See
            the{" "}
            <Link href="/legal/regulatory-disclosures" className="underline underline-offset-2">
              Regulatory Disclosures
            </Link>{" "}
            for details.
          </p>
        </section>
      </div>
    </article>
  );
}
