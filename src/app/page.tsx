import type { Metadata } from "next";
import { HomepageHero, HeroServiceNav } from "@/components/homepage/hero";
import { ServicesSection } from "@/components/homepage/services";
import { FeaturedExpertise } from "@/components/homepage/featured-expertise";
import {
  Methodology,
  OperatingModel,
  WhySggVentures,
  IndustriesStrip,
} from "@/components/homepage/sections";
import { InsightsPreview } from "@/components/homepage/insights-preview";
import { CtaBand } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Business Advisory & Technology Consulting",
  description:
    "SGG Ventures LLC is a strategic business advisory and technology consulting firm helping organizations achieve sustainable growth through business and management consulting, digital transformation, and business technology solutions.",
  path: "/",
  keywords: [
    "business consulting",
    "management consulting",
    "IT consulting",
    "digital transformation consulting",
    "business applications consulting",
    "custom software development",
    "AI consulting",
  ],
});

export default function HomePage() {
  return (
    <>
      <HomepageHero />
      <HeroServiceNav />
      <ServicesSection />
      <FeaturedExpertise />
      <OperatingModel />
      <Methodology />
      <IndustriesStrip />
      <WhySggVentures />
      <InsightsPreview />
      <CtaBand
        title="Start with a conversation."
        body="Tell us the decision, the constraint, and the timeline. We will tell you which capability applies and whether we are the right firm for it."
        primaryLabel="Request a consultation"
        secondaryLabel="Read about the firm"
        secondaryHref="/about"
      />
    </>
  );
}
