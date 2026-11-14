import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { ContentPlaceholder } from "@/components/shared/content-placeholder";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Leadership",
  description:
    "Leadership of SGG Ventures LLC. Names and biographies are published once identity, title, and credentials are confirmed.",
  path: "/about/leadership",
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Leadership"
        description="Client work and how the firm behaves sit with the people who run SGG Ventures LLC. Names are published once identity, title, and credentials are confirmed."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Leadership" },
        ]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x">
          {/* Leadership profiles render here once confirmed through the
              content management process. No unpublished profiles are shown. */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" />

          <ContentPlaceholder.Root>
            <ContentPlaceholder.Icon>
              <UserRound className="h-6 w-6" aria-hidden />
            </ContentPlaceholder.Icon>
            <ContentPlaceholder.Title>
              Names are not published yet
            </ContentPlaceholder.Title>
            <ContentPlaceholder.Body>
              When a profile is ready it will show a name, a role, what that
              person is responsible for, and credentials we have checked. Until
              then this page stays empty on purpose.
            </ContentPlaceholder.Body>
          </ContentPlaceholder.Root>
        </div>
      </section>

      <CtaBand
        title="Questions about who runs the firm?"
        secondaryLabel="How the firm is run"
        secondaryHref="/about/governance"
        primaryLabel="Request a conversation"
      />
    </>
  );
}
