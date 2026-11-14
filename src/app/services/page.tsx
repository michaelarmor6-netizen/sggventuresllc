import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/content/services";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ContentIcon } from "@/components/services/icon-map";
import { buttonClass } from "@/components/ui/button";
import { COMPANY } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Services — Business, Management & Technology Consulting",
  description:
    "SGG Ventures LLC provides business consulting, management consulting, IT consulting, digital transformation, business applications, custom software development, websites, and AI automation.",
  path: "/services",
  keywords: [
    "business consulting",
    "management consulting",
    "IT consulting",
    "digital transformation consulting",
    "business applications consulting",
    "Power Platform consulting",
    "custom software development",
    "AI consulting",
  ],
});

const ENGAGEMENT_STEPS = [
  {
    title: "Discovery",
    body: "A structured conversation about the decision, the constraints, the timeline, and who else is involved. No cost, no obligation.",
  },
  {
    title: "Scope and proposal",
    body: "A written scope: the question, the work, the deliverables, the team, the fees, and what is explicitly out of scope.",
  },
  {
    title: "Engagement",
    body: "Work is delivered in defined stages with a named lead, scheduled checkpoints, and decisions documented as they are made.",
  },
  {
    title: "Handover",
    body: "Deliverables, documentation, and ownership transfer. Where ongoing support is useful, it is agreed separately.",
  },
];

export default function ServicesPage() {
  const serviceCount = SERVICE_CATEGORIES.reduce(
    (total, category) => total + category.services.length,
    0,
  );

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Strategy, technology, and the work between them."
        description="Eight service areas spanning business and management consulting, IT and digital transformation, business applications, custom software, websites, and AI automation. One firm, one engagement lead, one accountable scope."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className={buttonClass("primary", "lg")}>
            Request a consultation <ArrowRight aria-hidden />
          </Link>
          <a href={COMPANY.phoneHref} className={buttonClass("inverse", "lg")}>
            <Phone className="h-4 w-4" aria-hidden />
            {COMPANY.phone}
          </a>
        </div>
      </PageHero>

      {/* Service areas */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="service-areas-heading">
        <div className="container-x">
          <SectionHeading
            id="service-areas-heading"
            eyebrow="Service Areas"
            title="Eight capabilities. One operating standard."
            lead={`${serviceCount} defined services across the areas below. Every engagement starts with a written scope and a named lead.`}
            className="max-w-4xl"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CATEGORIES.map((category, i) => (
              <Reveal key={category.slug} delay={(i % 4) * 0.06}>
                <Link
                  href={`/services/${category.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-linehair bg-white p-7 transition-colors duration-200 hover:bg-pearl"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                      <ContentIcon name={category.icon} className="h-5.5 w-5.5" />
                    </span>
                    <span className="font-display text-[11px] font-semibold tracking-[0.16em] text-slateink/80">
                      {category.code}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-[17.5px] font-bold leading-snug tracking-tight text-midnight">
                    {category.name}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slateink">
                    {category.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-royal transition-colors group-hover:text-azure-deep">
                    {category.services.length} services
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement process */}
      <section className="mist-grid border-y border-linehair py-20 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Engagement Process"
            title="How an SGG Ventures engagement works."
            lead="A predictable process, whether the work is a strategy decision, a technology assessment, or a software build."
            as="h2"
          />
          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {ENGAGEMENT_STEPS.map((step, i) => (
              <Reveal
                as="li"
                key={step.title}
                delay={i * 0.07}
                className="h-full rounded-xl border border-linehair bg-white p-7"
              >
                <span className="font-display text-[13px] font-semibold tracking-[0.14em] text-azure-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-[17px] font-bold tracking-tight text-midnight">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slateink">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Cross-service positioning */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Why one firm"
              title="The strategy and the system should agree."
              as="h2"
            />
          </div>
          <div className="space-y-5 text-[16px] leading-relaxed text-slateink lg:col-span-7">
            <p>
              Most firms stop at the recommendation or start at the software.
              SGG Ventures works across both: a strategy that names the operating
              changes it requires, and technology work that is tied to a
              measurable business outcome rather than a product licence.
            </p>
            <p>
              Engagements can combine service areas — a market entry assessment
              that becomes a CRM and reporting build, or a process review that
              becomes a workflow system. The commercial terms are agreed
              in writing, and the delivery model is stated on every service
              page.
            </p>
            <p>
              SGG Ventures provides consulting, advisory, and technology services
              directly. Where an engagement requires a licensed professional —
              legal, tax, accounting, securities, or a regulated technology
              certification — that work is performed by a qualified third party
              named in the engagement.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service area fits?"
        body="Describe the decision or the problem. We will tell you which capability applies, what a sensible first step looks like, and whether we are the right firm for it."
        primaryLabel="Request a consultation"
        secondaryLabel="Read our approach"
        secondaryHref="/about"
      />
    </>
  );
}
