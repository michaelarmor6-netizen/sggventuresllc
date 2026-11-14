import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/site";
import { PHOTOS, PHOTO_NOTE } from "@/lib/photos";
import { buttonClass } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SERVICE_CATEGORIES } from "@/content/services";

/** Stylized institutional backdrop: orbital rings around a globe core. */
function HeroGraphic() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 700"
        className="absolute -right-24 top-1/2 h-[820px] w-[1280px] -translate-y-1/2 opacity-70"
        fill="none"
      >
        <defs>
          <linearGradient id="hero-orbit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b8975a" stopOpacity="0.55" />
            <stop offset="0.5" stopColor="#123c70" stopOpacity="0.25" />
            <stop offset="1" stopColor="#040f1f" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#b8975a" stopOpacity="0.5" />
            <stop offset="0.35" stopColor="#123c70" stopOpacity="0.35" />
            <stop offset="1" stopColor="#07182f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="880" cy="330" r="340" fill="url(#hero-core)" />
        <ellipse
          cx="880"
          cy="330"
          rx="400"
          ry="140"
          transform="rotate(-18 880 330)"
          stroke="url(#hero-orbit)"
          strokeWidth="1.4"
        />
        <ellipse
          cx="880"
          cy="330"
          rx="310"
          ry="104"
          transform="rotate(-18 880 330)"
          stroke="url(#hero-orbit)"
          strokeWidth="1"
        />
        <ellipse
          cx="880"
          cy="330"
          rx="480"
          ry="180"
          transform="rotate(-18 880 330)"
          stroke="url(#hero-orbit)"
          strokeWidth="0.7"
          strokeDasharray="3 7"
        />
        <g stroke="#dcc391" strokeOpacity="0.35" strokeWidth="1">
          <circle cx="880" cy="330" r="120" />
          <path d="M760 330h240" />
          <path d="M772 292h216" />
          <path d="M772 368h216" />
          <ellipse cx="880" cy="330" rx="56" ry="120" />
          <ellipse cx="880" cy="330" rx="104" ry="120" opacity="0.5" />
        </g>
        <g fill="#dcc391">
          <circle cx="880" cy="210" r="3" opacity="0.9" />
          <circle cx="700" cy="415" r="3" opacity="0.7" />
          <circle cx="1042" cy="270" r="2.4" opacity="0.8" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight to-transparent" />
    </div>
  );
}

const HERO_PROOF = [
  "Wyoming limited liability company",
  `${SERVICE_CATEGORIES.length} service areas · ${SERVICE_CATEGORIES.reduce((total, category) => total + category.services.length, 0)} defined services`,
  "Advisory and technology delivery in one firm",
];

export function HomepageHero() {
  return (
    <section className="navy-grid relative overflow-hidden text-white">
      <HeroGraphic />
      <div className="container-x relative pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-xl border-l-2 border-azure pl-3 text-[15px] text-azure-light">
                {COMPANY.positioning}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-3xl font-display text-display-xl">
                Strategic business. Intelligent technology.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/70">
                {COMPANY.positioningStatement}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link href="/contact" className={buttonClass("primary", "lg")}>
                  Request a consultation <ArrowRight aria-hidden />
                </Link>
                <Link href="/services" className={buttonClass("inverse", "lg")}>
                  Explore our services
                </Link>
                <a
                  href={COMPANY.phoneHref}
                  className="inline-flex h-[52px] items-center gap-2 rounded-full px-4 font-display text-[15px] font-semibold text-white/80 transition-colors hover:text-azure-light"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {COMPANY.phone}
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.18} className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] shadow-photo">
                <Image
                  src={PHOTOS.consulting.src}
                  alt={PHOTOS.consulting.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-[13px] leading-snug text-white/55">
                {PHOTO_NOTE}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Credibility strip */}
        <Reveal delay={0.32}>
          <ul className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            {HERO_PROOF.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-azure"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/** Compact service-area navigator rendered under the hero. */
export function HeroServiceNav() {
  return (
    <nav aria-label="Service areas" className="container-x relative -mt-px">
      <div className="grid gap-px border-x border-b border-linehair bg-linehair sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/services/${category.slug}`}
            className="group flex items-center justify-between gap-3 bg-white px-5 py-4 transition-colors hover:bg-mist"
          >
            <span className="flex items-center gap-3">
              <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-azure-deep">
                {category.code}
              </span>
              <span className="font-display text-[15px] font-semibold tracking-tight text-midnight">
                {category.shortName}
              </span>
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 text-slateink transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}
