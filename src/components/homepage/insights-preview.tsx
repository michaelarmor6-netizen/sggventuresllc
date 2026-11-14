import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { sortedArticles } from "@/content/insights";
import { buttonClass } from "@/components/ui/button";

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InsightsPreview() {
  const articles = sortedArticles().slice(0, 3);

  return (
    <section
      className="bg-white py-20 md:py-24"
      aria-labelledby="insights-heading"
    >
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading title="Notes from the work" as="h2" />
          <Link
            href="/insights"
            className={buttonClass("outline", "md") + " shrink-0"}
          >
            All notes <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 0.08}>
              <Link
                href={`/insights/${article.slug}`}
                className="group flex h-full flex-col rounded-xl border border-linehair bg-white p-7 shadow-none transition-colors duration-200 hover:bg-pearl"
              >
                <div className="flex items-center gap-3 text-[12px]">
                  <span className="rounded-full bg-mist px-3 py-1 font-display font-bold tracking-wide text-royal">
                    {article.category}
                  </span>
                  <time dateTime={article.date} className="text-slateink/85">
                    {formatDate(article.date)}
                  </time>
                </div>
                <h3 className="mt-4 font-display text-[19px] font-bold leading-snug tracking-tight text-midnight">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slateink">
                  {article.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-royal transition-colors group-hover:text-azure-deep">
                  Read
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
