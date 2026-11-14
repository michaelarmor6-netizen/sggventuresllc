import type { Metadata } from "next";
import { Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import Link from "next/link";
import { EnquiryForm } from "@/components/forms/inquiry-form";
import { buttonClass } from "@/components/ui/button";
import { isProjectType } from "@/lib/validation/schemas";
import { COMPANY } from "@/lib/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Contact & Consultation Request",
  description:
    "Request a consultation or discovery call with SGG Ventures LLC. Tell us the decision, the constraint, and the timeline.",
  path: "/contact",
  keywords: [
    "business consulting consultation",
    "management consulting contact",
    "IT consulting consultation",
  ],
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { type } = await searchParams;
  const defaultProjectType = isProjectType(type) ? type : undefined;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        description="Tell us the decision, the constraint, and the timeline. We will tell you which capability applies and whether we are the right firm for it. No cost, no obligation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#inquiry-form" className={buttonClass("primary", "lg")}>
            Request a consultation
          </a>
          <a href={COMPANY.phoneHref} className={buttonClass("inverse", "lg")}>
            <Phone className="h-4 w-4" aria-hidden />
            {COMPANY.phone}
          </a>
        </div>
      </PageHero>

      <section className="bg-coolgray py-16 md:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          {/* Inquiry information */}
          <div className="lg:col-span-4">
            <h2 className="font-display text-[22px] font-bold tracking-tight text-midnight">
              Phone and mail
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-slateink">
              The form is the surest way to get a written reply. You can also
              call during Eastern business hours.
            </p>

            <div className="mt-7 space-y-5">
              <a
                href={COMPANY.phoneHref}
                className="block rounded-2xl border border-linehair bg-white p-6 transition-colors hover:border-azure/40"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal text-white">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-[13px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                      Telephone
                    </span>
                    <span className="block font-display text-[16px] font-bold text-midnight">
                      {COMPANY.phone}
                    </span>
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="block rounded-2xl border border-linehair bg-white p-6 transition-colors hover:border-azure/40"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal text-white">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-[13px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                      Email
                    </span>
                    <span className="block font-display text-[16px] font-bold text-midnight">
                      {COMPANY.email}
                    </span>
                  </span>
                </span>
              </a>


              <div className="rounded-2xl border border-linehair bg-white p-6">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal text-white">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-[13px] font-bold uppercase tracking-[0.14em] text-slateink/85">
                      When we reply
                    </span>
                    <span className="mt-1 block text-[14.5px] text-midnight">
                      We answer inquiries in the order they arrive, usually
                      within two business days.
                    </span>
                  </span>
                </span>
              </div>

              <div className="rounded-2xl border border-azure/30 bg-mist p-6">
                <span className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-royal" aria-hidden />
                  <p className="text-[13px] leading-relaxed text-slateink">
                    We check submissions on the server and handle them under our{" "}
                    <Link
                      href="/legal/privacy-policy"
                      className="font-semibold text-royal underline decoration-azure/40 underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                    . Please do not include confidential documents in an initial
                    inquiry.
                  </p>
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div id="inquiry-form" className="lg:col-span-8 scroll-mt-28">
            <EnquiryForm defaultProjectType={defaultProjectType} fallbackEmail={COMPANY.email} />
          </div>
        </div>
      </section>
    </>
  );
}
