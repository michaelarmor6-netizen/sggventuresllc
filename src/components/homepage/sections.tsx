import Link from "next/link";
import { SectionHeading } from "@/components/shared/section-heading";
import { PhotoFigure } from "@/components/shared/photo";
import { PHOTOS } from "@/lib/photos";
import {
  AUDIENCES,
  HOW_WE_WORK,
  PRACTICES,
  PROJECT_INCLUDES,
  SOLUTIONS,
} from "@/content/company";
import { ContentIcon } from "@/components/services/icon-map";

/* ------------------------------------------------------------------ */
/* Practical solutions — white canvas, parchment tiles                  */
/* ------------------------------------------------------------------ */

export function PracticalSolutions() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="solutions-heading">
      <div className="container-x">
        <SectionHeading
          id="solutions-heading"
          title="The kind of problems we build for."
          lead="Examples of tools a small business or online seller typically asks for. Each project starts from your own workflow."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {SOLUTIONS.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-xl bg-coolgray p-7 transition-colors duration-200 hover:bg-divider"
              >
                <span className="font-display text-[21px] font-bold leading-tight tracking-[-0.01em] text-midnight">
                  {item.title}
                </span>
                <span className="mt-3 flex-1 text-[17px] leading-[1.47] text-slateink">
                  {item.body}
                </span>
                <span className="mt-5 inline-flex items-center gap-1 text-[15px] text-royal underline-offset-4 group-hover:underline">
                  See the service <span aria-hidden="true">›</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What your project includes — photograph beside the list              */
/* ------------------------------------------------------------------ */

export function ProjectIncludes({ withPhoto = true }: { withPhoto?: boolean }) {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="includes-heading">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {withPhoto && (
          <PhotoFigure
            photo={PHOTOS.meeting}
            aspect="aspect-[4/3]"
            sizes="(min-width: 1024px) 34rem, 100vw"
          />
        )}
        <div className={withPhoto ? "" : "lg:col-span-2"}>
          <SectionHeading
            id="includes-heading"
            title="Agreed before work begins."
            lead="The specifics are set out in the proposal for each project. These are the things every proposal covers."
          />
          <ul className="mt-8 divide-y divide-linehair border-y border-linehair">
            {PROJECT_INCLUDES.map((item) => (
              <li key={item.title} className="flex gap-4 py-5">
                <ContentIcon name={item.icon} className="mt-0.5 h-6 w-6 shrink-0 text-midnight" />
                <span>
                  <span className="block text-[17px] font-semibold text-midnight">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[15px] leading-[1.47] text-slateink">
                    {item.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How we work — dark tile                                              */
/* ------------------------------------------------------------------ */

export function HowWeWork({ id = "how-we-work" }: { id?: string }) {
  return (
    <section
      id={id}
      className="navy-grid scroll-mt-20 py-20 md:py-28"
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-x">
        <SectionHeading
          id={`${id}-heading`}
          title="Four steps, the same on every project."
          tone="light"
          align="center"
        />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {HOW_WE_WORK.map((step) => (
            <li key={step.step} className="border-t border-white/20 pt-6">
              <span className="text-[15px] font-semibold text-white/70">{step.step}</span>
              <h3 className="mt-2 font-display text-[21px] font-bold leading-tight tracking-[-0.01em] text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-[17px] leading-[1.47] text-white/80">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Who we help — parchment                                              */
/* ------------------------------------------------------------------ */

export function WhoWeHelp() {
  return (
    <section
      id="who-we-help"
      className="mist-grid scroll-mt-20 py-20 md:py-28"
      aria-labelledby="who-we-help-heading"
    >
      <div className="container-x">
        <SectionHeading id="who-we-help-heading" title="Three kinds of customer." align="center" />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {AUDIENCES.map((audience) => (
            <li key={audience.title} className="rounded-xl bg-white p-7">
              <ContentIcon name={audience.icon} className="h-7 w-7 text-midnight" />
              <h3 className="mt-6 font-display text-[21px] font-bold leading-tight tracking-[-0.01em] text-midnight">
                {audience.title}
              </h3>
              <p className="mt-3 text-[17px] leading-[1.47] text-slateink">{audience.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why work with SGG — white, hairline rows                             */
/* ------------------------------------------------------------------ */

export function WhySgg() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="why-heading">
      <div className="container-x">
        <SectionHeading
          id="why-heading"
          title="How we run a project."
          lead="These are working practices you can hold us to, written into the scope of each project."
        />
        <ul className="mt-12 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map((item) => (
            <li key={item.title} className="border-t border-linehair py-6">
              <h3 className="text-[17px] font-semibold text-midnight">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-[1.47] text-slateink">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
