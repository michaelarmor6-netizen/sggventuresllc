import Link from "next/link";
import { COMPANY } from "@/lib/site";
import { PRIMARY_CTA } from "@/lib/navigation";
import { PHOTOS } from "@/lib/photos";
import { buttonClass, ChevronLink } from "@/components/ui/button";
import { PhotoFigure } from "@/components/shared/photo";

/** Photography-first hero: centred headline, two actions, one image. */
export function HomepageHero() {
  return (
    <section className="bg-white">
      <div className="container-x pb-16 pt-14 text-center md:pb-24 md:pt-20">
        <p className="text-[17px] font-semibold text-slateink">{COMPANY.legalName}</p>
        <h1 className="mx-auto mt-3 max-w-4xl font-display text-display-xl text-midnight">
          Websites and business apps built around your work.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[21px] leading-[1.38] text-slateink">
          {COMPANY.description} We help turn everyday tasks into simpler
          digital workflows, from customer enquiries and checkout links to
          order management.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
          <Link href={PRIMARY_CTA.href} className={buttonClass("primary", "lg")}>
            {PRIMARY_CTA.label}
          </Link>
          <ChevronLink href="/services">Explore our services</ChevronLink>
        </div>
        <PhotoFigure
          photo={PHOTOS.laptop}
          priority
          className="mx-auto mt-14 max-w-5xl text-left md:mt-20"
          sizes="(min-width: 1100px) 64rem, 100vw"
        />
      </div>
    </section>
  );
}
