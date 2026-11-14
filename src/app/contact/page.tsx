import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Mail, MapPin, MessagesSquare, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { EnquiryForm } from "@/components/forms/inquiry-form";
import { PUBLIC_FACTS, phoneHref } from "@/lib/site";
import { isProjectType } from "@/lib/validation/schemas";
import { createMetadata } from "@/lib/seo";
export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Tell SGG Ventures LLC what you want to build. Share your business, the problem you want to solve, and your preferred timeline.",
  path: "/contact",
});
const NEXT_STEPS = [
  {
    icon: ClipboardList,
    title: "We review your enquiry",
    body: "We read what you have sent and consider whether the project fits our services.",
  },
  {
    icon: MessagesSquare,
    title: "We reply by email",
    body: "If it looks like a fit, we arrange a conversation about your workflow, goals, and constraints.",
  },
  {
    icon: ShieldCheck,
    title: "Nothing starts without a scope",
    body: "Deliverables, milestones, and commercial terms are agreed in writing before any work begins.",
  },
];
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[] }>;
}) {
  const { type } = await searchParams;
  const defaultProjectType = isProjectType(type) ? type : undefined;
  const { email, phone, address } = PUBLIC_FACTS;
  return (
    <>
      <PageHero
        title="Tell us what you want to build."
        description="Share a little about your business, the problem you want to solve, and your preferred timeline. We will review your enquiry and discuss whether the project fits our services."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <section className="mist-grid py-16 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div id="enquiry-form" className="scroll-mt-28 lg:col-span-8">
            <EnquiryForm
              defaultProjectType={defaultProjectType}
              fallbackEmail={email}
            />
          </div>
          <aside className="lg:col-span-4" aria-label="What happens next">
            <h2 className="font-display text-[24px] font-bold tracking-[-0.015em] text-midnight">
              What happens next
            </h2>
            <ol className="mt-5 space-y-4">
              {NEXT_STEPS.map((step) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-xl bg-white p-6"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center text-midnight">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[17px] font-semibold text-midnight">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-[15px] leading-[1.47] text-slateink">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            {(email || phone || address) && (
              <div className="mt-8 rounded-xl bg-white p-6">
                <h2 className="text-[17px] font-semibold text-midnight">
                  Contact us directly
                </h2>
                <ul className="mt-3 space-y-3 text-[15px]">
                  {email && (
                    <li>
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex min-h-8 items-center gap-2.5 font-semibold text-royal underline-offset-2 hover:underline"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        {email}
                      </a>
                    </li>
                  )}
                  {phone && (
                    <li>
                      <a
                        href={phoneHref(phone)}
                        className="inline-flex min-h-8 items-center gap-2.5 font-semibold text-royal underline-offset-2 hover:underline"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {phone}
                      </a>
                    </li>
                  )}
                  {address && (
                    <li className="flex items-start gap-2.5 text-slateink">
                      <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        <span className="block text-[13px]">{address.label}</span>
                        {address.lines.join(", ")}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            )}
            <p className="mt-6 text-[14px] leading-relaxed text-slateink">
              Please do not include passwords or confidential documents in a
              first enquiry. Details you send are handled as described in our{" "}
              <Link
                href="/legal/privacy-policy"
                className="font-semibold text-royal underline underline-offset-2 hover:text-royal-deep"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}