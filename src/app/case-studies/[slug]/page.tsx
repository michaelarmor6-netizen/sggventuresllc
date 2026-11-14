import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  CASE_STUDIES,
  CASE_STUDY_DISCLOSURE,
  getCaseStudy,
} from "@/content/case-studies";
import { getCategory } from "@/content/services";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { BreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return createMetadata({
    title: study.title,
    description: study.summary,
    path: `/case-studies/${study.slug}`,
    keywords: [study.sector, "consulting case study", "advisory engagement"],
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const relatedAreas = study.serviceAreas
    .map((areaSlug) => getCategory(areaSlug))
    .filter((area): area is NonNullable<typeof area> => Boolean(area));

  const otherStudies = CASE_STUDIES.filter((item) => item.slug !== study.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: study.title, path: `/case-studies/${study.slug}` },
        ]}
      />
      <PageHero
        eyebrow={study.sector}
        title={study.title}
        description={study.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: study.title },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="Context" title="The situation." as="h2" />
            <div className="mt-5 space-y-5">
              {study.context.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[16px] leading-relaxed text-slateink">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="Approach" title="What we did." as="h2" />
              <ol className="mt-6 space-y-5">
                {study.approach.map((step, i) => (
                  <Reveal
                    as="li"
                    key={step.title}
                    delay={i * 0.05}
                    className="rounded-xl border border-linehair bg-coolgray p-5"
                  >
                    <span className="font-display text-[13px] font-semibold tracking-[0.14em] text-azure-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-1 font-display text-[16px] font-semibold tracking-tight text-midnight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slateink">
                      {step.body}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow="Outcome" title="What changed." as="h2" />
              <ul className="mt-6 space-y-3">
                {study.outcome.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-slateink">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-azure" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 rounded-xl border border-linehair bg-mist p-5 text-[13px] leading-relaxed text-slateink">
                {CASE_STUDY_DISCLOSURE} {study.confidentiality}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-xl border border-linehair bg-coolgray p-6 lg:sticky lg:top-32">
              <h2 className="font-display text-[15px] font-semibold text-midnight">
                Service areas involved
              </h2>
              <ul className="mt-4 space-y-3">
                {relatedAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/services/${area.slug}`}
                      className="group flex items-center justify-between gap-3 text-[14px] font-semibold text-royal transition-colors hover:text-azure-deep"
                    >
                      {area.name}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-linehair pt-5">
                <p className="text-[13px] leading-relaxed text-slateink">
                  If this pattern resembles your situation, a short diagnostic is
                  usually the right first step.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-royal transition-colors hover:text-azure-deep"
                >
                  Request a consultation
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mist-grid border-t border-linehair py-14">
        <div className="container-x">
          <h2 className="eyebrow">More Case Studies</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {otherStudies.map((item) => (
              <Link
                key={item.slug}
                href={`/case-studies/${item.slug}`}
                className="group rounded-xl border border-linehair bg-white p-5 transition-all hover:bg-pearl"
              >
                <span className="block text-[12px] font-semibold uppercase tracking-[0.12em] text-azure-deep">
                  {item.sector}
                </span>
                <span className="mt-2 block font-display text-[15px] font-semibold leading-snug text-midnight">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Discuss a similar engagement."
        primaryLabel="Request a consultation"
        secondaryLabel="All case studies"
        secondaryHref="/case-studies"
      />
    </>
  );
}
