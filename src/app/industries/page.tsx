import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { INDUSTRIES } from "@/content/industries";
import { ContentIcon } from "@/components/services/icon-map";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Industries & Client Segments",
  description:
    "SGG Ventures LLC works with SMEs, startups, growth-stage companies, private business owners, family businesses, technology firms, investors, and corporate clients.",
  path: "/industries",
  keywords: [
    "consulting for SMEs",
    "consulting for private business owners",
    "family business advisory",
    "technology consulting for investors",
  ],
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Who the work is for."
        description="Eight client segments. The service areas are the same. The decision, the constraints, and the operating reality are not."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry, i) => (
            <Reveal key={industry.slug} delay={(i % 4) * 0.06}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-linehair bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-azure/40 hover:shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                  <ContentIcon name={industry.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-[19px] font-bold tracking-tight text-midnight">
                  {industry.name}
                </h2>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-slateink">
                  {industry.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-royal transition-colors group-hover:text-azure-deep">
                  View segment
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Not sure where you fit?"
        body="Describe the organization and the decision. We will point you to the most relevant service area and the right first step."
      />
    </>
  );
}
