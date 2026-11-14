import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { COMPANY } from "@/lib/site";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ContentIcon } from "@/components/services/icon-map";
import { createMetadata } from "@/lib/seo";
import {
  MISSION,
  VISION,
  CORE_VALUES,
  CORPORATE_DNA,
  UNIQUE_VALUE_PROPOSITION,
  METHODOLOGY,
} from "@/content/company";

export const metadata: Metadata = createMetadata({
  title: "About Us",
  description:
    "SGG Ventures LLC is a Wyoming limited liability company and a strategic business advisory and technology consulting firm. Mission, values, and how we work.",
  path: "/about",
  keywords: [
    "SGG Ventures LLC",
    "business advisory",
    "technology consulting firm",
    "management consulting",
  ],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A firm built around the decision."
        description={COMPANY.positioningStatement}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Introduction + facts */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Who We Are" title="Advisory discipline, technology fluency." as="h2" />
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-slateink">
              <p>
                SGG Ventures LLC is a strategic business advisory
                and technology consulting firm. We help organizations make
                consequential decisions and build the systems that make those
                decisions work.
              </p>
              <p>
                The firm brings together seven service areas: business
                consulting, management consulting, IT consulting, digital
                transformation, business applications, custom software
                development, and AI and automation. Engagements can combine
                them — a market assessment that becomes a reporting build, or a
                process review that becomes a workflow system.
              </p>
              <p>
                We are a Wyoming limited liability company. Projects are
                delivered remotely, so we work with clients across the United
                States and internationally.
              </p>
              <p>
                SGG Ventures does not provide securities brokerage, investment
                management, or regulated financial advice. Where an engagement
                requires a licensed professional, that work is performed by a
                qualified third party named in the engagement. The boundary is
                set out in our{" "}
                <Link
                  href="/legal/regulatory-disclosures"
                  className="font-semibold text-royal underline decoration-azure/40 underline-offset-2 hover:text-azure-deep"
                >
                  Regulatory Disclosures
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-linehair bg-coolgray p-7">
              <h2 className="font-display text-[15px] font-bold text-midnight">
                Company facts
              </h2>
              <dl className="mt-4 space-y-4 text-[14px]">
                <div>
                  <dt className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                    Legal Name
                  </dt>
                  <dd className="mt-0.5 font-semibold text-midnight">
                    {COMPANY.legalName}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                    Entity Type
                  </dt>
                  <dd className="mt-0.5 font-semibold text-midnight">
                    {COMPANY.entityType} — {COMPANY.jurisdiction}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                    Registration
                  </dt>
                  <dd className="mt-0.5 text-slateink">
                    {COMPANY.registration.number
                      ? `Wyoming LLC No. ${COMPANY.registration.number}${
                          COMPANY.registration.formedOn
                            ? `, formed ${COMPANY.registration.formedOn}`
                            : ""
                        }`
                      : COMPANY.registration.note}
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                    Telephone
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={COMPANY.phoneHref}
                      className="font-semibold text-royal hover:text-azure-deep"
                    >
                      {COMPANY.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                    Email
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="font-semibold text-royal hover:text-azure-deep"
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
                {COMPANY.address && (
                  <div>
                    <dt className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                      {COMPANY.address.label}
                    </dt>
                    <dd className="mt-0.5 text-slateink">
                      {COMPANY.address.lines.join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / UVP */}
      <section className="mist-grid border-y border-linehair py-16 md:py-20">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          {[
            { label: "Mission", body: MISSION },
            { label: "Vision", body: VISION },
            { label: "What makes us different", body: UNIQUE_VALUE_PROPOSITION },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-linehair bg-white p-7">
                <p className="eyebrow">{item.label}</p>
                <p className="mt-3 text-[15.5px] leading-relaxed text-slateink">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Core Values"
            title="How the firm behaves."
            lead="These are operating commitments, not marketing lines. They shape how engagements are scoped, staffed, and closed."
            as="h2"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, i) => (
              <Reveal key={value.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-linehair bg-coolgray p-6">
                  <h3 className="font-display text-[16px] font-bold tracking-tight text-midnight">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-slateink">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate DNA */}
      <section className="navy-grid py-16 text-white md:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Corporate DNA"
            title="What stays constant across the work."
            tone="light"
            as="h2"
          />
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {CORPORATE_DNA.map((item) => (
              <div key={item.title} className="border-l border-white/15 pl-5">
                <h3 className="font-display text-[16.5px] font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Methodology"
            title="Four stages, every engagement."
            as="h2"
          />
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {METHODOLOGY.map((step, i) => (
              <Reveal
                as="li"
                key={step.step}
                delay={i * 0.06}
                className="h-full rounded-2xl border border-linehair bg-coolgray p-6"
              >
                <span className="font-display text-[13px] font-bold tracking-[0.14em] text-azure-deep">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-[17px] font-bold tracking-tight text-midnight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-slateink">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Service areas recap */}
      <section className="mist-grid border-t border-linehair py-16 md:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Service Areas"
            title="Seven capabilities under one firm."
            as="h2"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/services/${category.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-linehair bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-azure/40 hover:shadow-card"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                  <ContentIcon name={category.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-[14.5px] font-bold leading-snug tracking-tight text-midnight">
                    {category.name}
                  </span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-slateink">
                    {category.tagline}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Segments */}
      <section className="bg-white py-14" aria-label="Client segments">
        <div className="container-x">
          <h2 className="font-display text-[18px] font-bold text-midnight">
            Who we work with
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {INDUSTRIES.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-linehair bg-white px-5 py-2.5 font-display text-[13.5px] font-bold text-midnight transition-colors hover:border-azure/50 hover:text-royal"
              >
                {i.name}
                <ArrowRight className="h-3.5 w-3.5 text-slateink" aria-hidden />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Want the short version?"
        body="The company profile page summarises the firm, the service areas, and the engagement process in a print-friendly format."
        primaryLabel="Request a consultation"
        secondaryLabel="View company profile"
        secondaryHref="/company-profile"
      />
    </>
  );
}
