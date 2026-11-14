import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { COMPANY } from "@/lib/site";
import { PHOTOS, PHOTO_NOTE } from "@/lib/photos";
import { buttonClass } from "@/components/ui/button";

export function HomepageHero() {
  return (
    <section className="navy-grid relative overflow-hidden text-white">
      <div className="container-x relative pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="max-w-xl border-l-2 border-azure pl-3 text-[15px] text-azure-light">
              {COMPANY.positioning}
            </p>
            <h1 className="mt-6 max-w-3xl font-display text-display-xl">
              Strategic business. Intelligent technology.
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/70">
              {COMPANY.positioningStatement}
            </p>
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
          </div>
          <div className="lg:col-span-5">
            <figure>
              <div className="hero-photo relative aspect-[4/3] overflow-hidden rounded-[14px] shadow-photo">
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
          </div>
        </div>
      </div>
    </section>
  );
}
