import type { Metadata } from "next";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Scale, ShieldCheck, FileText, Eye, UsersRound, Lock } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Corporate Governance",
  description:
    "How SGG Ventures LLC takes engagements, keeps records, and decides what can be said in public.",
  path: "/about/governance",
});

const PILLARS = [
  {
    icon: Scale,
    title: "Written engagement terms",
    body: "Work starts with a document that states scope, who may act, deliverables, fees, and what is out of bounds.",
  },
  {
    icon: ShieldCheck,
    title: "Named third parties",
    body: "If a licensed or certified firm is required, its name and responsibility are on the engagement, not implied.",
  },
  {
    icon: FileText,
    title: "A file an auditor can read",
    body: "Instructions, decisions, assumptions, and what we delivered stay in the record.",
  },
  {
    icon: Eye,
    title: "Public claims",
    body: "If we cannot verify it, it is not on the website. We do not soften an unverified claim until it sounds true.",
  },
  {
    icon: UsersRound,
    title: "Who may speak for us",
    body: "People acting for the company keep client matters confidential and do not invent authorizations or credentials.",
  },
  {
    icon: Lock,
    title: "Client information",
    body: "We handle it under the engagement terms and the safeguards that match how sensitive it is.",
  },
];

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="How the firm is run"
        description="Engagement terms, records, who may speak for us, and what we will not put on a public page."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Corporate Governance" },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              title="The rules we apply to ourselves"
              as="h2"
            />
            <p className="mt-6 text-[16px] leading-relaxed text-slateink">
              If we advise other organizations on how they are run, we should be
              able to say how we are run. Internal charters and committee papers
              stay internal until they are checked. What we can say in public is
              below.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-5 sm:grid-cols-2">
              {PILLARS.map((pillar) => (
                <li
                  key={pillar.title}
                  className="rounded-xl border border-linehair bg-coolgray p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal text-white">
                    <pillar.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3.5 font-display text-[16px] font-semibold tracking-tight text-midnight">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slateink">
                    {pillar.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
