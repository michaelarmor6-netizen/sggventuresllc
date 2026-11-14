import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "@/content/insights";
import { PageHero } from "@/components/shared/page-hero";
import { BreadcrumbJsonLd, createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ]}
      />
      <PageHero
        eyebrow={article.category}
        title={article.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Article" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/60">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>· {article.readMinutes} min read</span>
          <span>· By {article.authoredBy}</span>
        </div>
      </PageHero>

      <article className="bg-white py-14 md:py-20">
        <div className="container-x max-w-3xl">
          {/* Article body */}
          <div className="space-y-12">
            {article.sections.map((section, i) => (
              <section key={i}>
                <h2 className="font-display text-[23px] font-bold tracking-tight text-midnight">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-[16px] leading-relaxed text-slateink"
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

          <p className="mt-14 rounded-xl border border-linehair bg-coolgray p-5 text-[13px] leading-relaxed text-slateink/90">
            This publication presents analysis and perspective as of its date
            and does not constitute investment, legal, or tax advice. See our{" "}
            <Link
              href="/legal/risk-disclosures"
              className="font-semibold text-royal underline decoration-azure/40 underline-offset-2 hover:text-azure-deep"
            >
              Risk Disclosures
            </Link>
            .
          </p>
        </div>
      </article>

      {/* Related articles */}
      <section className="mist-grid border-t border-linehair py-16">
        <div className="container-x">
          <h2 className="eyebrow">Continue Reading</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/insights/${other.slug}`}
                className="group block rounded-xl border border-linehair bg-white p-7 transition-colors duration-200"
              >
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-azure-deep">
                  {other.category}
                </span>
                <h3 className="mt-2.5 font-display text-[18px] font-bold leading-snug tracking-tight text-midnight">
                  {other.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slateink">
                  {other.excerpt.slice(0, 140)}…
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
