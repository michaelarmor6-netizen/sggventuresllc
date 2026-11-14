import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_DISCLOSURE } from "@/content/case-studies";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Case Studies",
  description:
    "Representative engagement patterns from SGG Ventures LLC across business consulting, ERP selection, workflow digitization, portals, and AI knowledge management.",
  path: "/case-studies",
  keywords: [
    "business consulting case studies",
    "digital transformation case study",
    "AI consulting case study",
  ],
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Representative work, described honestly."
        description="These are anonymized engagement patterns. They show how the work is structured and what changed — without inventing client names, figures, or attributable results."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case Studies" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          <p className="max-w-3xl rounded-xl border border-linehair bg-mist p-5 text-[13px] leading-relaxed text-slateink">
            {CASE_STUDY_DISCLOSURE}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDIES.map((study, i) => (
              <Reveal key={study.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-linehair bg-white p-7 transition-colors duration-200 hover:bg-pearl"
                >
                  <span className="eyebrow">{study.sector}</span>
                  <h2 className="mt-3 font-display text-[18px] font-bold leading-snug tracking-tight text-midnight">
                    {study.title}
                  </h2>
                  <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slateink">
                    {study.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-royal transition-colors group-hover:text-azure-deep">
                    Read the case study
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

      <CtaBand
        title="Have a similar decision in front of you?"
        body="Describe the situation and the timeline. We will tell you which service area applies and what a sensible first step looks like."
      />
    </>
  );
}
