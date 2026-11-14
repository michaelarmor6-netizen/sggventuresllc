"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/content/services";
import { ContentIcon } from "@/components/services/icon-map";
import { usePlayOnView } from "@/components/motion/use-play-on-view";

/**
 * Services per area, drawn from the service catalogue itself. Each row is a
 * link into that area; the bar is decorative and the count is in the text.
 */
export function ServiceAreaChart({ className = "" }: { className?: string }) {
  const { ref, state } = usePlayOnView<HTMLDivElement>();
  const max = Math.max(...SERVICE_CATEGORIES.map((c) => c.services.length));
  const total = SERVICE_CATEGORIES.reduce(
    (sum, c) => sum + c.services.length,
    0,
  );

  return (
    <figure className={className}>
      <div ref={ref} data-motion={state} className="area-chart">
        <ul className="divide-y divide-linehair border-y border-linehair">
          {SERVICE_CATEGORIES.map((category, index) => (
            <li key={category.slug}>
              <Link
                href={`/services/${category.slug}`}
                className="group grid grid-cols-[1.75rem_minmax(0,1fr)_4.5rem_auto] items-center gap-3 py-2.5 sm:grid-cols-[1.75rem_minmax(0,12rem)_1fr_auto]"
                style={{ "--i": index } as CSSProperties}
              >
                <ContentIcon
                  name={category.icon}
                  className="h-4.5 w-4.5 text-azure-deep transition-colors group-hover:text-royal"
                />
                <span className="font-display text-[14px] font-semibold leading-snug tracking-tight text-midnight sm:truncate transition-colors group-hover:text-royal">
                  {category.shortName}
                </span>
                <span
                  aria-hidden="true"
                  className="relative h-2 overflow-hidden rounded-full bg-mist"
                >
                  <span
                    className="area-bar absolute inset-y-0 left-0 rounded-full bg-royal transition-colors group-hover:bg-azure-deep"
                    style={{
                      width: `${(category.services.length / max) * 100}%`,
                    }}
                  />
                </span>
                <span className="flex w-14 items-center justify-end gap-1 font-display text-[14px] font-semibold tabular-nums text-midnight">
                  {category.services.length}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 -translate-x-1 text-royal opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-3 text-[13px] text-slateink">
        Defined services per area, {total} in total. Select a row to open that
        area.
      </figcaption>
    </figure>
  );
}
