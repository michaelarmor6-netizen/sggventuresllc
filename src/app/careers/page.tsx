import type { Metadata } from "next";
import { Briefcase, UserRound } from "lucide-react";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { ContentPlaceholder } from "@/components/shared/content-placeholder";
import { buttonClass } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Careers",
  description:
    "Careers at SGG Ventures LLC. Open roles appear here when they are approved. Speculative applications are welcome.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work here."
        description="Consulting, advisory, and technology work. You own your piece of it. We do not post vacancies that do not exist."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section className="bg-coolgray py-16 md:py-20">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Designated vacancy slot — add approved roles here */}
            <ContentPlaceholder.Root className="lg:col-span-3">
              <ContentPlaceholder.Icon>
                <Briefcase className="h-6 w-6" aria-hidden />
              </ContentPlaceholder.Icon>
              <ContentPlaceholder.Title>
                No open roles on the site right now
              </ContentPlaceholder.Title>
              <ContentPlaceholder.Body>
                When a role is approved it will appear here with the actual
                scope and how to apply. Until then the list is empty.
              </ContentPlaceholder.Body>
            </ContentPlaceholder.Root>
          </div>

          {/* General-interest applications */}
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-linehair bg-white p-8 text-center">
            <ContentPlaceholder.Icon>
              <UserRound className="h-6 w-6" aria-hidden />
            </ContentPlaceholder.Icon>
            <h2 className="mt-4 font-display text-[20px] font-bold tracking-tight text-midnight">
              Write to us anyway
            </h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-slateink">
              If you work in management consulting, technology
              consulting, software delivery, or AI and automation, send a note.
              We keep it confidential and we read it.
            </p>
            <a
              href="/contact"
              className={buttonClass("primary", "lg") + " mt-6"}
            >
              Send a note
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="If you want to work on these problems, say so."
        primaryLabel="Send an inquiry"
        secondaryLabel="About the firm"
        secondaryHref="/about"
      />
    </>
  );
}
