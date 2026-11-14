"use client";

import Link from "next/link";

// Global error boundary — logged in aggregate via monitoring in production
// when configured; the page offers safe recovery paths.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-white">
      <div className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-[14px] text-slateink">Something went wrong</p>
        <h1 className="mt-3 max-w-xl font-display text-display text-midnight">
          This page did not load.
        </h1>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-slateink">
          Try again, or go back to the homepage.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={reset}
            className="inline-flex min-h-11 items-center rounded-full bg-royal px-6 text-[16px] text-white transition-colors hover:bg-royal-deep"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-full border border-royal bg-white px-6 text-[16px] text-royal transition-colors"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
