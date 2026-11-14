import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { findService } from "@/content/services";
import { buttonClass } from "@/components/ui/button";

const EXPERTISE = [
  { category: "business-consulting", service: "business-strategy" },
  { category: "management-consulting", service: "executive-advisory" },
  { category: "software-development", service: "custom-web-applications" },
  { category: "digital-transformation", service: "process-digitization" },
  { category: "business-applications", service: "power-platform" },
  { category: "ai-automation", service: "ai-strategy" },
];

export function FeaturedExpertise() {
  const items = EXPERTISE.map(({ category, service }) => {
    const found = findService(service);
    if (!found) return null;
    return {
      href: `/services/${category}/${service}`,
      categoryName: found.category.name,
      title: found.service.title,
      summary: found.service.summary,
    };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section
      id="featured-expertise"
      className="mist-grid border-y border-linehair py-20 md:py-24"
    >
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Expertise"
            title="Where clients start most often"
            lead="Six capabilities that show how advisory and technology work connect on a single engagement."
            as="h2"
          />
          <Link
            href="/services"
            className={buttonClass("outline", "md") + " shrink-0"}
          >
            All services <ArrowRight aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.href} delay={(i % 3) * 0.06}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-xl border border-linehair bg-white p-6 transition-colors duration-200 hover:bg-pearl"
              >
                <span className="eyebrow">{item.categoryName}</span>
                <h3 className="mt-3 font-display text-[17px] font-bold leading-snug tracking-tight text-midnight">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slateink">
                  {item.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-[13px] font-semibold text-royal transition-colors group-hover:text-azure-deep">
                  Read more
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
