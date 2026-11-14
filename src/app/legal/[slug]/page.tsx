import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGAL_DOCS, getLegalDoc } from "@/content/legal";
import { PageHero } from "@/components/shared/page-hero";
import { BreadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { ShieldAlert } from "lucide-react";

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return {};
  return createMetadata({
    title: doc.title,
    description: doc.summary,
    path: `/legal/${doc.slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Legal", path: "/legal/privacy-policy" },
          { name: doc.title, path: `/legal/${doc.slug}` },
        ]}
      />
      <PageHero
        eyebrow="Legal & Disclosures"
        title={doc.title}
        description={doc.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Legal", href: "/legal/privacy-policy" },
          { label: doc.title },
        ]}
      >
        <div className="flex flex-wrap gap-2.5">
          {LEGAL_DOCS.map((d) => (
            <Link
              key={d.slug}
              href={`/legal/${d.slug}`}
              aria-current={d.slug === doc.slug ? "page" : undefined}
              className={`rounded-full px-4 py-2 font-display text-[13px] font-semibold transition-colors ${
 d.slug === doc.slug
 ? "bg-azure-deep text-white"
 : "border border-white/20 bg-white/5 text-white/75 hover:text-white"
 }`}
            >
              {d.title}
            </Link>
          ))}
        </div>
      </PageHero>

      <section className="bg-white py-14 md:py-20">
        <div className="container-x max-w-3xl">
          <p className="text-[13px] text-slateink/85">
            Last updated: <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
          </p>

          <div className="mt-6 space-y-4">
            {doc.intro.map((paragraph, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-slateink">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 space-y-12">
            {doc.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-[21px] font-bold tracking-tight text-midnight">
                  {section.heading}
                </h2>
                <div className="mt-3.5 space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-[15px] leading-relaxed text-slateink"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2.5">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-slateink"
                      >
                        <span
                          className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-azure"
                          aria-hidden="true"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {doc.legalReview && (
            <p className="mt-12 flex items-start gap-3 rounded-xl border border-linehair bg-coolgray p-5 text-[13px] leading-relaxed text-slateink">
              <ShieldAlert
                className="mt-0.5 h-4 w-4 shrink-0 text-royal/70"
                aria-hidden
              />
              This document is maintained as part of the website’s editable
              disclosure set and is presented for regular review by the
              company’s legal counsel. Statements reflecting regulatory status
              are included only when verified.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
