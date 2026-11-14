import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/content/services";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ContentIcon } from "@/components/services/icon-map";

export function ServicesSection() {
  const serviceCount = SERVICE_CATEGORIES.reduce(
    (total, category) => total + category.services.length,
    0,
  );

  return (
    <section
      className="bg-white py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="container-x">
        <SectionHeading
          id="services-heading"
          eyebrow="What We Do"
          title="Seven service areas. One accountable scope."
          lead={`${serviceCount} defined services across business and management consulting and technology delivery. The strategy and the system are designed together, by the same firm.`}
          className="max-w-4xl"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CATEGORIES.map((category, i) => (
            <Reveal key={category.slug} delay={(i % 4) * 0.06}>
              <Link
                href={`/services/${category.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-linehair bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-azure/40 hover:shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                    <ContentIcon name={category.icon} className="h-5.5 w-5.5" />
                  </span>
                  <span className="font-display text-[11px] font-bold tracking-[0.16em] text-slateink/80">
                    {category.code}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[17.5px] font-bold leading-snug tracking-tight text-midnight">
                  {category.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slateink">
                  {category.tagline}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-royal transition-colors group-hover:text-azure-deep">
                  {category.services.length} services
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-display text-[14px] font-bold text-royal transition-colors hover:text-azure-deep"
          >
            View all service areas <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <span className="hidden h-4 w-px bg-linehair sm:block" aria-hidden />
          <Link
            href="/company-profile"
            className="font-display text-[14px] font-bold text-slateink transition-colors hover:text-royal"
          >
            Download the company profile
          </Link>
        </div>
      </div>
    </section>
  );
}
