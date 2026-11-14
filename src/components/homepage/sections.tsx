import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { INDUSTRIES } from "@/content/industries";
import { OPERATING_MODEL_NOTE } from "@/content/services";
import { DIFFERENTIATORS, METHODOLOGY } from "@/content/company";
import { ContentIcon } from "@/components/services/icon-map";

/* ------------------------------------------------------------------ */
/* Operating model                                                      */
/* ------------------------------------------------------------------ */

const DELIVERY_STRUCTURES = [
  {
    title: "Direct delivery",
    body: "Consulting, advisory, and technology services are delivered by SGG Ventures under a written scope, with a named engagement lead.",
    icon: "Building2",
  },
  {
    title: "Specialist coordination",
    body: "Where legal, tax, accounting, securities, or regulated technology work is required, a qualified third party performs it and is named in the engagement.",
    icon: "Handshake",
  },
  {
    title: "Independent by design",
    body: "We do not earn commissions from software vendors, cloud providers, or transaction counterparties. The advice is the service.",
    icon: "ShieldCheck",
  },
];

export function OperatingModel() {
  return (
    <section aria-labelledby="operating-model" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHeading
          id="operating-model"
          eyebrow="How We Work"
          title="Clear delivery boundaries."
          lead="Every engagement states who does the work, what is included, and where a qualified third party is required. Nothing material is left implied."
          as="h2"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {DELIVERY_STRUCTURES.map((structure, i) => (
            <Reveal key={structure.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-linehair bg-coolgray p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal text-white">
                  <ContentIcon name={structure.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-bold tracking-tight">
                  {structure.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-slateink">
                  {structure.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-linehair bg-mist p-5 text-[13px] leading-relaxed text-slateink">
          {OPERATING_MODEL_NOTE}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Methodology                                                          */
/* ------------------------------------------------------------------ */

export function Methodology() {
  return (
    <section
      className="navy-grid py-20 text-white md:py-24"
      aria-labelledby="methodology-heading"
    >
      <div className="container-x">
        <SectionHeading
          id="methodology-heading"
          eyebrow="Methodology"
          title="A method that survives the handover."
          lead="The same four-stage discipline applies to a strategy question, a technology programme, and a software build."
          tone="light"
          as="h2"
        />
        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {METHODOLOGY.map((step) => (
            <li key={step.step} className="border-l border-white/15 pl-6">
              <span className="font-display text-[12.5px] font-bold leading-none tracking-[0.16em] text-azure-light">
                {step.step}
              </span>
              <h3 className="mt-2 font-display text-[18px] font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why SGG Ventures                                                        */
/* ------------------------------------------------------------------ */

export function WhySggVentures() {
  return (
    <section className="bg-white py-20 md:py-28" aria-label="Why SGG Ventures">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why SGG Ventures"
          title="What you are actually buying."
          lead="Independent advice, a written scope, and technology delivery that is tied to a business outcome rather than a product licence."
          as="h2"
        />
        <div className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:gap-x-16">
          {DIFFERENTIATORS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="flex gap-4 border-b border-linehair pb-7">
                <div>
                  <h3 className="font-display text-[17.5px] font-bold tracking-tight text-midnight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slateink">
                    {item.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Industries strip                                                     */
/* ------------------------------------------------------------------ */

export function IndustriesStrip() {
  return (
    <section
      className="bg-coolgray py-20 md:py-24"
      aria-labelledby="industries-heading"
    >
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="industries-heading"
            eyebrow="Who We Serve"
            title="Built for the mid-market."
            lead="SMEs, growth-stage companies, private owners, family businesses, technology firms, investors, and corporate teams."
            as="h2"
          />
          <Link
            href="/industries"
            className="inline-flex shrink-0 items-center gap-2 font-display text-[14px] font-bold text-royal transition-colors hover:text-azure-deep"
          >
            All industries <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 4) * 0.06}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col rounded-xl border border-linehair bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-azure/40 hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                  <ContentIcon name={industry.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[15.5px] font-bold leading-snug tracking-tight text-midnight">
                  {industry.name}
                </h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slateink/90">
                  {industry.summary.split(",")[0]}.
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-display text-[12.5px] font-bold text-royal opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Read more <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
