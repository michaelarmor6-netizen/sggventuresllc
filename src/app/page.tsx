import type { Metadata } from "next";
import { HomepageHero } from "@/components/homepage/hero";
import { ServicesSection } from "@/components/homepage/services";
import {
  HowWeWork,
  PracticalSolutions,
  ProjectIncludes,
  WhoWeHelp,
  WhySgg,
} from "@/components/homepage/sections";
import { CtaBand } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  ...createMetadata({
    title: COMPANY.tagline,
    description: COMPANY.description,
    path: "/",
  }),
  // The title template does not apply to the root page, so name the company here.
  title: { absolute: `${COMPANY.legalName} — ${COMPANY.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <HomepageHero />
      <ServicesSection />
      <PracticalSolutions />
      <HowWeWork />
      <ProjectIncludes />
      <WhoWeHelp />
      <WhySgg />
      <CtaBand />
    </>
  );
}
