import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import {
  DELIVERY_LABEL,
  OPERATING_MODEL_NOTE,
  SERVICE_CATEGORIES,
  findService,
  type ServiceCategoryContent,
  type ServiceContent,
} from "@/content/services";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContentIcon } from "@/components/services/icon-map";
import { Reveal } from "@/components/shared/reveal";
import { buttonClass } from "@/components/ui/button";
import { COMPANY } from "@/lib/site";
import { CATEGORY_PHOTO, PHOTOS, PHOTO_NOTE } from "@/lib/photos";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/lib/seo";

/* ------------------------------------------------------------------ */
/* Service card — used on category overviews and related services       */
/* ------------------------------------------------------------------ */

export function ServiceCard({
  categorySlug,
  service,
  showCategoryCode,
}: {
  categorySlug: string;
  service: ServiceContent;
  showCategoryCode?: string;
}) {
  return (
    <Link
      href={`/services/${categorySlug}/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-linehair bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-azure/40 hover:shadow-card"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist text-royal transition-colors group-hover:bg-royal group-hover:text-white">
          <ContentIcon name={service.icon} className="h-5.5 w-5.5" />
        </span>
        {showCategoryCode && (
          <span className="font-display text-[11px] font-bold tracking-[0.16em] text-slateink/90">
            {showCategoryCode}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-[17.5px] font-bold tracking-tight text-midnight">
        {service.title}
      </h3>
      <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slateink">
        {service.summary}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-royal transition-colors group-hover:text-azure-deep">
        Explore this service
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Service category overview page template                              */
/* ------------------------------------------------------------------ */

export function ServiceCategoryPage({
  category,
}: {
  category: ServiceCategoryContent;
}) {
  const otherCategories = SERVICE_CATEGORIES.filter(
    (item) => item.slug !== category.slug,
  );
  const photo = CATEGORY_PHOTO[category.slug] ?? PHOTOS.consulting;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: category.name, path: `/services/${category.slug}` },
        ]}
      />
      <PageHero
        eyebrow={`Service Area ${category.code}`}
        title={category.name}
        description={category.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: category.name },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#services" className={buttonClass("primary", "lg")}>
            View services
          </a>
          <Link href="/contact" className={buttonClass("inverse", "lg")}>
            Request a consultation
          </Link>
        </div>
      </PageHero>

      {/* Intro + highlights */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <figure className="mb-10">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[14px] bg-midnight">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 42rem, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-[12.5px] leading-snug text-slateink/85">
                {PHOTO_NOTE}
              </figcaption>
            </figure>
            <SectionHeading
              title={`How ${category.shortName.toLowerCase()} work is done here`}
              as="h2"
            />
            <div className="mt-6 space-y-5">
              {category.intro.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-[16px] leading-relaxed text-slateink"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-linehair bg-coolgray p-7 lg:sticky lg:top-32">
              <h3 className="font-display text-[15px] font-bold text-midnight">
                What sits in this service area
              </h3>
              <ul className="mt-4 space-y-3">
                {category.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[14px] text-slateink"
                  >
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-azure"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href={COMPANY.phoneHref}
                className="mt-6 flex items-center gap-2 border-t border-linehair pt-5 font-display text-[14px] font-bold text-royal transition-colors hover:text-azure-deep"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section
        id="services"
        className="mist-grid border-t border-linehair py-16 md:py-24"
        aria-label={`${category.name} services`}
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title={`${category.shortName} service portfolio.`}
            as="h2"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {category.services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.06}>
                <ServiceCard categorySlug={category.slug} service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other service areas */}
      <section
        className="bg-white py-14"
        aria-label="Other service areas"
      >
        <div className="container-x">
          <h2 className="eyebrow">Other Service Areas</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {otherCategories.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex items-center justify-between rounded-xl border border-linehair bg-coolgray px-6 py-4 transition-all hover:border-azure/50 hover:bg-mist"
              >
                <span className="flex items-center gap-4">
                  <span className="font-display text-[12px] font-bold tracking-[0.14em] text-azure-deep">
                    {item.code}
                  </span>
                  <span className="font-display text-[15px] font-bold text-midnight">
                    {item.name}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 text-slateink transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Service detail page template                                         */
/* ------------------------------------------------------------------ */

export function ServiceDetailPage({
  category,
  service,
}: {
  category: ServiceCategoryContent;
  service: ServiceContent;
}) {
  const related = service.related
    .map((slug) => findService(slug))
    .filter(
      (item): item is { category: ServiceCategoryContent; service: ServiceContent } =>
        Boolean(item),
    )
    .filter((item) => item.service.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <ServiceJsonLd
        name={service.title}
        description={service.summary}
        path={`/services/${category.slug}/${service.slug}`}
        category={category.name}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: category.name, path: `/services/${category.slug}` },
          {
            name: service.title,
            path: `/services/${category.slug}/${service.slug}`,
          },
        ]}
      />
      <PageHero
        eyebrow={`${category.name} — Service Area ${category.code}`}
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: category.name, href: `/services/${category.slug}` },
          { label: service.title },
        ]}
      />

      {/* Intro */}
      <section className="bg-white py-14 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="sr-only">Service overview</h2>
            <p className="max-w-3xl text-[17px] leading-relaxed text-slateink">
              {service.intro}
            </p>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-azure/30 bg-mist p-6">
              <p className="eyebrow">Delivery Structure</p>
              <p className="mt-2 font-display text-[16px] font-bold text-midnight">
                {DELIVERY_LABEL[service.delivery.classification]}
              </p>
              <Link
                href="/legal/regulatory-disclosures"
                className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-royal transition-colors hover:text-azure-deep"
              >
                Read regulatory positioning{" "}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="mist-grid border-t border-linehair py-16 md:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Business Challenges Addressed"
            title="What this service exists to solve."
            as="h2"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {service.challenges.map((challenge, i) => (
              <Reveal key={challenge.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-linehair bg-white p-7">
                  <span className="font-display text-[13px] font-bold tracking-[0.14em] text-azure-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-[16.5px] font-bold leading-snug tracking-tight text-midnight">
                    {challenge.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-slateink">
                    {challenge.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Service Capabilities"
              title="What our team provides."
              as="h2"
            />
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-6 sm:grid-cols-2">
              {service.capabilities.map((capability, i) => (
                <Reveal
                  as="li"
                  key={capability.title}
                  delay={(i % 2) * 0.06}
                  className="flex h-full gap-4 rounded-xl border border-linehair bg-coolgray p-6"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-royal text-white">
                    <ContentIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-[15.5px] font-bold tracking-tight">
                      {capability.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slateink">
                      {capability.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section
        className="navy-grid py-16 text-white md:py-20"
        aria-label="Service delivery approach"
      >
        <div className="container-x">
          <SectionHeading
            eyebrow="Service Delivery Approach"
            title="How an engagement works."
            tone="light"
            as="h2"
          />
          <ol className="mt-10 grid gap-8 md:grid-cols-3 lg:gap-10">
            {service.approach.map((step, i) => (
              <li key={step.title} className="relative border-l border-white/15 pl-6">
                <span
                  className="absolute -left-[6.5px] top-1 h-3 w-3 rounded-full border-2 border-azure bg-midnight"
                  aria-hidden="true"
                />
                <span className="font-display text-[12.5px] font-bold leading-none tracking-[0.16em] text-azure-light">
                  STEP {i + 1}
                </span>
                <h3 className="mt-2 font-display text-[17.5px] font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Delivery model */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-x max-w-4xl">
          <p className="eyebrow">Delivery Model</p>
          <h2 className="mt-3 font-display text-display">
            {DELIVERY_LABEL[service.delivery.classification]}
          </h2>
          <div className="mt-5 space-y-4">
            {service.delivery.text.map((text, i) => (
              <p key={i} className="text-[15.5px] leading-relaxed text-slateink">
                {text}
              </p>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-linehair bg-mist p-5 text-[13px] leading-relaxed text-slateink">
            {OPERATING_MODEL_NOTE}
          </p>
        </div>
      </section>

      {/* Related services */}
      <section className="mist-grid border-t border-linehair py-16">
        <div className="container-x">
          <SectionHeading
            eyebrow="Related Services"
            title="Adjacent capabilities across SGG Ventures."
            as="h2"
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ServiceCard
                key={`${item.category.slug}-${item.service.slug}`}
                categorySlug={item.category.slug}
                service={item.service}
                showCategoryCode={item.category.code}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Discuss this service with our team."
        primaryLabel="Request a Consultation"
        secondaryLabel={`About ${category.name}`}
        secondaryHref={`/services/${category.slug}`}
      />
    </>
  );
}
