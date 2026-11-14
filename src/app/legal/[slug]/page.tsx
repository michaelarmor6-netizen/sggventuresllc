import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGAL_DOCS, getLegalDoc } from "@/content/legal";
import { PageHero } from "@/components/shared/page-hero";
import { BreadcrumbJsonLd, createMetadata } from "@/lib/seo";
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
          { name: doc.title, path: `/legal/${doc.slug}` },
        ]}
      />
      <PageHero
        title={doc.title}
        description={doc.summary}
        breadcrumbs={[{ label: doc.title }]}
      >
        <div className="flex flex-wrap gap-2.5">
          {LEGAL_DOCS.map((d) => (
            <Link
              key={d.slug}
              href={`/legal/${d.slug}`}
              aria-current={d.slug === doc.slug ? "page" : undefined}
              className={`inline-flex min-h-10 items-center rounded-full px-4 text-[14px] transition-colors ${
                d.slug === doc.slug
                  ? "bg-midnight font-semibold text-white"
                  : "bg-coolgray text-ink hover:bg-divider"
              }`}
            >
              {d.title}
            </Link>
          ))}
        </div>
      </PageHero>
      <section className="bg-white py-14 md:py-20">
        <div className="container-x max-w-3xl">
          <p className="text-[14px] text-slateink">
            Last updated: <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated)}</time>
          </p>
          <div className="mt-6 space-y-4">
            {doc.intro.map((paragraph, i) => (
              <p key={i} className="text-[17px] leading-[1.47] text-ink">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-12 space-y-12">
            {doc.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-[24px] font-bold tracking-[-0.015em] text-midnight">
                  {section.heading}
                </h2>
                <div className="mt-3.5 space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-[17px] leading-[1.47] text-ink"
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
                        className="flex items-start gap-3 text-[17px] leading-[1.47] text-ink"
                      >
                        <span
                          className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-midnight"
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
        </div>
      </section>
    </>
  );
}