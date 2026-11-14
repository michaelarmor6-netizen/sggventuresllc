import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLE_CATEGORIES, sortedArticles } from "@/content/insights";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Insights",
  description:
    "Short notes from SGG Ventures LLC on strategy, technology, and the firm.",
  path: "/insights",
  keywords: [
    "business strategy insights",
    "AI governance",
    "digital transformation insights",
  ],
});

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function InsightsPage() {
  const articles = sortedArticles();
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHero
        title="Notes from the work"
        description="Written by people on the files. Dated. No client names, no invented results."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          {/* Categories */}
          <nav aria-label="Insight categories" className="flex flex-wrap gap-2.5">
            {ARTICLE_CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full bg-coolgray px-4 py-2 font-display text-[12.5px] font-bold text-royal"
              >
                {category}
              </span>
            ))}
          </nav>

          {/* Featured article */}
          <article className="mt-10">
            <Link
              href={`/insights/${featured.slug}`}
              className="group block rounded-2xl border border-linehair bg-coolgray p-8 transition-all duration-300 hover:border-azure/40 hover:shadow-card md:p-12"
            >
              <div className="flex flex-wrap items-center gap-3 text-[12.5px]">
                <span className="rounded-full bg-royal px-3.5 py-1 font-display font-bold text-white">
                  {featured.category}
                </span>
                <time dateTime={featured.date} className="text-slateink/85">
                  {formatDate(featured.date)}
                </time>
                <span className="text-slateink/85">
                  · {featured.readMinutes} min read
                </span>
              </div>
              <h2 className="mt-5 max-w-4xl font-display text-[26px] font-extrabold leading-tight tracking-tight text-midnight md:text-[32px]">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slateink">
                {featured.excerpt}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-display text-[14px] font-bold text-royal transition-colors group-hover:text-azure-deep">
                Read the note
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </article>

          {/* Remaining articles */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-linehair bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-azure/40 hover:shadow-card"
              >
                <div className="flex flex-wrap items-center gap-3 text-[12px]">
                  <span className="rounded-full bg-mist px-3 py-1 font-display font-bold text-royal">
                    {article.category}
                  </span>
                  <time dateTime={article.date} className="text-slateink/85">
                    {formatDate(article.date)}
                  </time>
                </div>
                <h3 className="mt-4 font-display text-[18.5px] font-bold leading-snug tracking-tight text-midnight">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-slateink">
                  {article.excerpt}
                </p>
                <span className="mt-4 text-[12px] text-slateink/85">
                  {article.readMinutes} min read
                </span>
              </Link>
            ))}
            {/* publication policy note */}
            <div className="flex items-center rounded-2xl border border-dashed border-linehair bg-coolgray/60 p-7 lg:col-span-2">
              <p className="text-[13.5px] leading-relaxed text-slateink">
                <strong className="font-display font-bold text-midnight">
                  How we publish.{" "}
                </strong>
                Each note names the team that wrote it. We do not mention
                unpublished clients or partners. If a sentence about a market
                would go stale, it carries a date.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="If a note describes your situation, let's talk."
        secondaryLabel="Our services"
        secondaryHref="/services"
      />
    </>
  );
}
