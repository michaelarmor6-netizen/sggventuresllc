import Link from "next/link";
import { Compass } from "lucide-react";
import { buttonClass } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-coolgray text-midnight">
          <Compass className="h-7 w-7" aria-hidden />
        </span>
        <p className="mt-6 text-[14px] text-slateink">Page not found</p>
        <h1 className="mt-3 font-display text-display-lg text-midnight">
          This page is not on the site.
        </h1>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-slateink">
          It may have moved, or it was never published. Use the menu, or go
          home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass("secondary", "lg")}>
            Home
          </Link>
          <Link href="/contact" className={buttonClass("outline", "lg")}>
            Contact us
          </Link>
        </div>
        <div className="mt-14 opacity-70">
          <Logo />
        </div>
      </div>
    </section>
  );
}
