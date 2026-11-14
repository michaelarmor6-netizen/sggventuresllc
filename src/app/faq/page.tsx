import type { Metadata } from "next";
import { FAQS } from "@/content/company";
import { PageHero, CtaBand } from "@/components/shared/page-hero";
import { FaqJsonLd, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about SGG Ventures LLC: what the firm does, how engagements start, how fees work, and what it does not provide.",
  path: "/faq",
  keywords: [
    "SGG Ventures FAQ",
    "business consulting engagement process",
    "consulting fees",
  ],
});

const CATEGORY_ORDER = [
  "The firm",
  "Engagements",
  "Technology",
  "Working together",
];

export default function FaqPage() {
  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: FAQS.filter((item) => item.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <>
      <FaqJsonLd items={FAQS} />
      <PageHero
        eyebrow="FAQ"
        title="Questions we are asked first."
        description="What the firm does, how an engagement starts, what it costs to find out, and what we do not provide."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="container-x max-w-4xl">
          {grouped.map((group) => (
            <div key={group.category} className="mb-12 last:mb-0">
              <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-azure-deep">
                {group.category}
              </h2>
              <div className="mt-4 divide-y divide-linehair border-y border-linehair">
                {group.items.map((item) => (
                  <details key={item.question} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <h3 className="font-display text-[16.5px] font-bold leading-snug tracking-tight text-midnight">
                        {item.question}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-linehair text-[15px] font-semibold text-royal transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed text-slateink">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Still have a question?"
        body="Send it with the context. We answer in writing, and we will say if the answer is outside our scope."
        primaryLabel="Ask a question"
        secondaryLabel="Contact details"
        secondaryHref="/contact"
      />
    </>
  );
}
