import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES, getIndustry } from "@/content/industries";
import { findService } from "@/content/services";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ContentIcon } from "@/components/services/icon-map";
import { ServiceCard } from "@/components/pages/service-templates";
import { BreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return createMetadata({
    title: `${industry.name} — Consulting & Advisory`,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
    keywords: [`${industry.name} consulting`, "business advisory"],
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const services = industry.relevantServices.map(({ service }) =>
    findService(service),
  ).filter((x): x is NonNullable<typeof x> => Boolean(x));

  const otherIndustries = INDUSTRIES.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Industries We Serve"
        title={industry.name}
        description={industry.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: industry.name },
        ]}
      />

      {/* Intro + needs */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Segment Overview"
              title={`Serving ${industry.name.toLowerCase()}.`}
              as="h2"
            />
            <div className="mt-6 space-y-5">
              {industry.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[16px] leading-relaxed text-slateink">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <h2 className="eyebrow">Typical Engagement Needs</h2>
            <ul className="mt-4 space-y-4">
              {industry.needs.map((need, i) => (
                <Reveal
                  as="li"
                  key={need.title}
                  delay={i * 0.05}
                  className="rounded-xl border border-linehair bg-coolgray p-5"
                >
                  <h3 className="font-display text-[15px] font-semibold tracking-tight text-midnight">
                    {need.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slateink">
                    {need.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Relevant services */}
      <section className="mist-grid border-t border-linehair py-16 md:py-20" aria-label="Relevant services">
        <div className="container-x">
          <SectionHeading
            eyebrow="Most Relevant for This Segment"
            title="Where this segment typically starts"
            as="h2"
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((result) => (
              <ServiceCard
                key={`${result.category.slug}-${result.service.slug}`}
                categorySlug={result.category.slug}
                service={result.service}
                showCategoryCode={result.category.code}
              />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="inline-flex items-center gap-2 font-display text-[14px] font-semibold text-royal transition-colors hover:text-azure-deep">
              Request a segment-specific consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Other segments */}
      <section className="bg-white py-14" aria-label="Other client segments">
        <div className="container-x">
          <h2 className="eyebrow">Other Client Segments</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otherIndustries.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-linehair bg-coolgray px-5 py-2.5 transition-colors hover:bg-pearl hover:bg-mist"
              >
                <ContentIcon name={i.icon} className="h-4 w-4 text-royal" />
                <span className="font-display text-[15px] font-semibold text-midnight">
                  {i.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
