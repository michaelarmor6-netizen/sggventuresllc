import Link from "next/link";
import { SERVICE_CATEGORIES } from "@/content/services";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContentIcon } from "@/components/services/icon-map";

/**
 * Four service tiles. Placed on a parchment section, the white tile is the
 * elevation — no border, no shadow, no hover lift.
 */
export function ServiceCards({
  headingLevel = "h3",
  surface = "white",
}: {
  headingLevel?: "h2" | "h3";
  /** Tile colour: white on parchment sections, parchment on white ones. */
  surface?: "white" | "parchment";
}) {
  const Heading = headingLevel;
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICE_CATEGORIES.map((category) => (
        <li key={category.slug}>
          <Link
            href={`/services/${category.slug}`}
            className={`group flex h-full flex-col rounded-xl p-7 transition-colors duration-200 ${
              surface === "white" ? "bg-white hover:bg-pearl" : "bg-coolgray hover:bg-divider"
            }`}
          >
            <ContentIcon name={category.icon} className="h-7 w-7 text-midnight" />
            <Heading className="mt-6 font-display text-[21px] font-bold leading-tight tracking-[-0.01em] text-midnight">
              {category.name}
            </Heading>
            <p className="mt-3 flex-1 text-[15px] leading-[1.47] text-slateink">
              {category.tagline}
            </p>
            <span className="mt-6 inline-flex items-center gap-1 text-[15px] text-royal group-hover:underline underline-offset-4">
              Learn more <span aria-hidden="true">›</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ServicesSection() {
  return (
    <section className="mist-grid py-20 md:py-28" aria-labelledby="services-heading">
      <div className="container-x">
        <SectionHeading
          id="services-heading"
          align="center"
          title="Four things we do."
          lead="Each is scoped and priced for the project in front of us. You can start with one and add another later."
        />
        <div className="mt-12">
          <ServiceCards />
        </div>
      </div>
    </section>
  );
}
