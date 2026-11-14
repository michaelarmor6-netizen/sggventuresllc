import type { Metadata } from "next";
import {
  Cloud,
  Code2,
  Briefcase,
  Building2,
  Handshake,
  Server,
} from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { PartnershipForm } from "@/components/forms/partnership-form";
import { Reveal } from "@/components/shared/reveal";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Partnerships",
  description:
    "Technology vendors, implementation firms, professional advisers, and managed service providers that want a written working relationship with SGG Ventures LLC.",
  path: "/partnerships",
  keywords: [
    "technology consulting partnerships",
    "implementation partner",
    "business advisory partner",
  ],
});

const PARTNER_PROFILES = [
  {
    icon: Cloud,
    title: "Technology & Software Vendors",
    body: "Platform, cloud, and software providers whose products fit our clients. We do not take commissions for recommendations; the licensing relationship stays between the client and the vendor.",
  },
  {
    icon: Code2,
    title: "Implementation & Delivery Partners",
    body: "Development, integration, and delivery firms that can extend capacity on larger programmes while SGG Ventures retains the client-side accountability.",
  },
  {
    icon: Briefcase,
    title: "Professional & Advisory Firms",
    body: "Law, tax, accounting, and specialist advisory practices that want a written referral and coordination relationship.",
  },
  {
    icon: Server,
    title: "Managed Services Providers",
    body: "Hosting, security, and managed service providers that support what we build after the engagement ends.",
  },
  {
    icon: Building2,
    title: "Institutional Relationships",
    body: "Larger institutions that need a defined scope, a named contact, and clarity about who is responsible for which part of the work.",
  },
];

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Work with us as a partner"
        description="We work alongside technology vendors, implementation firms, professional advisers, and managed service providers. Every relationship has a written scope and a named job on both sides."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Partnerships" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x max-w-4xl">
          <h2 className="font-display text-[22px] font-bold tracking-tight text-midnight">
            How a partnership has to work
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-slateink">
            Both sides have a named responsibility, documented in writing. We do
            not present a partner&apos;s certification or licence as our own, and
            we do not accept commissions that would compromise an independent
            recommendation.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {PARTNER_PROFILES.map((profile) => (
              <Reveal key={profile.title}>
                <div className="flex h-full gap-4 rounded-xl border border-linehair bg-coolgray p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-royal text-white">
                    <profile.icon className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-[16px] font-semibold tracking-tight text-midnight">
                      {profile.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slateink">
                      {profile.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="flex items-center rounded-xl border border-azure/30 bg-mist p-6">
              <div className="flex items-start gap-4">
                <Handshake className="mt-1 h-8 w-8 text-royal" aria-hidden />
                <p className="text-[15px] leading-relaxed text-slateink">
                  Every partnership is a written agreement. We read proposals
                  one at a time. There is no portal and no volume target.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="proposal"
        className="mist-grid border-t border-linehair py-16 md:py-20"
      >
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-title text-midnight">
              Send a proposal
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slateink">
              Say who you are, what you do, and where you work. Proposals we can
              verify get read first.
            </p>
          </div>
          <div className="lg:col-span-8">
            <PartnershipForm />
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to talk before you write a proposal?"
        primaryLabel="Request a conversation"
        secondaryLabel="About the firm"
        secondaryHref="/about"
      />
    </>
  );
}
