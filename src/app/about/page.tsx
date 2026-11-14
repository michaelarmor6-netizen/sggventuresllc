import type { Metadata } from "next";
import { COMPANY, PUBLIC_FACTS } from "@/lib/site";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCards } from "@/components/homepage/services";
import { HowWeWork, WhoWeHelp, WhySgg } from "@/components/homepage/sections";
import { PURPOSE } from "@/content/company";
import { PhotoFigure } from "@/components/shared/photo";
import { PHOTOS } from "@/lib/photos";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "SGG Ventures LLC builds websites, business applications, and automation tools for small businesses and online sellers. What we do and how we work.",
  path: "/about",
});
export default function AboutPage() {
  const { entityDescription, address } = PUBLIC_FACTS;
  return (
    <>
      <PageHero
        title="Software for the everyday work of a small business."
        description={COMPANY.description}
        breadcrumbs={[{ label: "About" }]}
      />
      <section className="bg-white pb-20 md:pb-28">
        <div className="container-x">
          <PhotoFigure
            photo={PHOTOS.workshop}
            priority
            aspect="aspect-[16/9] md:aspect-[21/9]"
            className="mb-16 md:mb-20"
            sizes="(min-width: 1200px) 72rem, 100vw"
          />
        </div>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading title="Websites, applications, and automation." />
            <div className="mt-6 max-w-[65ch] space-y-5 text-[19px] leading-[1.47] text-slateink">
              <p>
                {COMPANY.legalName} is a software development company. We build
                websites, custom business applications, and automation tools,
                and we maintain what we build under an agreed support scope.
              </p>
              <p>
                Our work is aimed at small businesses, online sellers, and
                startups: organisations where a clear website or a simple
                internal tool can remove a daily frustration, and where a large
                software project would be out of proportion.
              </p>
              <p>
                Every project begins with a conversation about how the work is
                done today, followed by a written scope. We build in stages so
                you can see working progress, and we finish with a handover of
                what was agreed.
              </p>
              <p>
                Projects are delivered remotely, so we can work with clients
                wherever they are.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl bg-coolgray p-7">
              <h2 className="text-[17px] font-semibold text-midnight">Our purpose</h2>
              <p className="mt-3 text-[19px] leading-[1.47] text-ink">
                {PURPOSE}
              </p>
              <dl className="mt-6 space-y-4 border-t border-linehair pt-5 text-[15px]">
                <div>
                  <dt className="text-[13px] font-semibold text-slateink">
                    Legal name
                  </dt>
                  <dd className="mt-0.5 font-semibold text-midnight">
                    {COMPANY.legalName}
                  </dd>
                </div>
                {entityDescription && (
                  <div>
                    <dt className="text-[13px] font-semibold text-slateink">
                      Entity
                    </dt>
                    <dd className="mt-0.5 font-semibold text-midnight">
                      {entityDescription}
                    </dd>
                  </div>
                )}
                {address && (
                  <div>
                    <dt className="text-[13px] font-semibold text-slateink">
                      {address.label}
                    </dt>
                    <dd className="mt-0.5 text-slateink">
                      {address.lines.join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="mist-grid py-20 md:py-28" aria-labelledby="about-services">
        <div className="container-x">
          <SectionHeading id="about-services" title="What you can ask us for." />
          <div className="mt-10">
            <ServiceCards />
          </div>
        </div>
      </section>
      <WhySgg />
      <HowWeWork id="about-process" />
      <WhoWeHelp />
      <CtaBand />
    </>
  );
}