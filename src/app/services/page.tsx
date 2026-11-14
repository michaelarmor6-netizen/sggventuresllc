import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCards } from "@/components/homepage/services";
import { HowWeWork, ProjectIncludes } from "@/components/homepage/sections";
import { buttonClass } from "@/components/ui/button";
import { PRIMARY_CTA } from "@/lib/navigation";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Business websites, custom business applications, AI and workflow automation, and maintenance and support from SGG Ventures LLC.",
  path: "/services",
});
export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Websites, applications, automation, and support."
        description="Four services for small businesses, online sellers, and startups. Each project is scoped in writing before any work starts."
        breadcrumbs={[{ label: "Services" }]}
      >
        <Link href={PRIMARY_CTA.href} className={buttonClass("primary", "lg")}>
          {PRIMARY_CTA.label}
        </Link>
      </PageHero>
      <section className="mist-grid py-20 md:py-28" aria-labelledby="service-areas-heading">
        <div className="container-x">
          <SectionHeading
            id="service-areas-heading"
            title="Choose where to start."
            lead="Each page explains the problem the service addresses, what you receive, what is outside the scope, and the ongoing costs to expect."
          />
          <div className="mt-10">
            <ServiceCards />
          </div>
        </div>
      </section>
      <HowWeWork />
      <ProjectIncludes withPhoto={false} />
      <CtaBand
        title="Not sure which service fits?"
        body="Describe the problem in your own words. We will review your enquiry and discuss whether the project fits our services."
      />
    </>
  );
}