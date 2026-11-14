import Link from "next/link";
import { Check, Minus } from "lucide-react";
import {
  SERVICE_CATEGORIES,
  type ServiceCategoryContent,
} from "@/content/services";
import { HOW_WE_WORK } from "@/content/company";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { buttonClass } from "@/components/ui/button";
import { CATEGORY_PHOTO } from "@/lib/photos";
import { PhotoFigure } from "@/components/shared/photo";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/lib/seo";
/** Service page: problem, users, deliverables, process, limits, costs. */
export function ServiceCategoryPage({
  category,
}: {
  category: ServiceCategoryContent;
}) {
  const otherCategories = SERVICE_CATEGORIES.filter(
    (item) => item.slug !== category.slug,
  );
  const photo = CATEGORY_PHOTO[category.slug];
  const path = `/services/${category.slug}`;
  return (
    <>
      <ServiceJsonLd
        name={category.name}
        description={category.summary}
        path={path}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: category.name, path },
        ]}
      />
      <PageHero
        title={category.name}
        description={category.summary}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: category.name },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={`/contact?type=${category.slug}`}
            className={buttonClass("primary", "lg")}
          >
            Discuss your project
          </Link>
          <a href="#deliverables" className={buttonClass("outline", "lg")}>
            What you receive
          </a>
        </div>
      </PageHero>
      {/* Problem + audience */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading title={category.problem.title} />
            <div className="mt-6 max-w-[65ch] space-y-5">
              {category.problem.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-[19px] leading-[1.47] text-slateink"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {photo && (
              <PhotoFigure
                photo={photo}
                className="mt-12"
                sizes="(min-width: 1024px) 42rem, 100vw"
              />
            )}
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-coolgray p-7 lg:sticky lg:top-24">
              <h2 className="text-[17px] font-semibold text-midnight">
                Who this is for
              </h2>
              <ul className="mt-4 space-y-3.5">
                {category.audience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[17px] leading-[1.47] text-slateink"
                  >
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-midnight"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Deliverables */}
      <section
        id="deliverables"
        className="mist-grid scroll-mt-20 py-20 md:py-28"
        aria-labelledby="deliverables-heading"
      >
        <div className="container-x">
          <SectionHeading
            id="deliverables-heading"
            title="Typical deliverables."
            lead="The exact list is confirmed in the proposal for your project."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {category.deliverables.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 3) * 0.05}
                className="h-full rounded-xl bg-white p-7"
              >
                <span
                  aria-hidden="true"
                  className="text-[15px] font-semibold text-slateink"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[21px] font-bold leading-tight tracking-[-0.01em] text-midnight">
                  {item.title}
                </h3>
                <p className="mt-2 text-[17px] leading-[1.47] text-slateink">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      {/* Process */}
      <section
        className="navy-grid py-20 md:py-28"
        aria-labelledby="process-heading"
      >
        <div className="container-x">
          <SectionHeading
            id="process-heading"
            title="How the project runs."
            tone="light"
          />
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_WE_WORK.map((step) => (
              <li key={step.step} className="border-t border-white/20 pt-6">
                <span className="text-[15px] font-semibold text-white/70">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-[21px] font-bold leading-tight tracking-[-0.01em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-[17px] leading-[1.47] text-white/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      {/* Scope limits + ongoing costs */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-linehair p-7">
            <h2 className="font-display text-[24px] font-bold tracking-[-0.015em] text-midnight">
              What is outside the scope
            </h2>
            <ul className="mt-5 space-y-3.5">
              {category.scopeLimits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[17px] leading-[1.47] text-slateink"
                >
                  <Minus
                    className="mt-1 h-4 w-4 shrink-0 text-slateink"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-coolgray p-7">
            <h2 className="font-display text-[24px] font-bold tracking-[-0.015em] text-midnight">
              Ongoing costs to expect
            </h2>
            <ul className="mt-5 space-y-3.5">
              {category.ongoingCosts.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[17px] leading-[1.47] text-slateink"
                >
                  <span
                    className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-midnight"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-linehair pt-4 text-[14px] leading-relaxed text-slateink">
              Project fees are quoted per project once the scope is agreed.
            </p>
          </div>
        </div>
      </section>
      {/* Other services */}
      <section className="border-t border-linehair bg-white py-16" aria-labelledby="other-services">
        <div className="container-x">
          <h2 id="other-services" className="text-[21px] font-bold tracking-[-0.01em] text-midnight">
            Other services
          </h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {otherCategories.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex min-h-14 items-center justify-between gap-3 rounded-xl bg-coolgray px-6 py-5 transition-colors hover:bg-divider"
                >
                  <span className="text-[17px] font-semibold text-midnight">
                    {item.name}
                  </span>
                  <span aria-hidden="true" className="text-[20px] text-royal transition-transform group-hover:translate-x-0.5">
                    ›
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand primaryHref={`/contact?type=${category.slug}`} />
    </>
  );
}