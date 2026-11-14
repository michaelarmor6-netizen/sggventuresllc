"use client";

import type { CSSProperties } from "react";
import { usePlayOnView } from "./use-play-on-view";

type Step = { step: string; title: string; body: string };

/**
 * The four-stage method as one connected line. On entry the line draws,
 * each stage lights in turn, and a marker travels the route once.
 */
export function MethodTimeline({ steps }: { steps: Step[] }) {
  const { ref, state } = usePlayOnView<HTMLOListElement>();

  return (
    <ol
      ref={ref}
      data-motion={state}
      className="method-timeline relative mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8"
    >
      {/* Connector: vertical on small screens, horizontal from lg */}
      <span aria-hidden="true" className="method-track">
        <span className="method-line" />
        <span className="method-marker" />
      </span>

      {steps.map((step, index) => (
        <li
          key={step.step}
          className="method-step relative pl-10 lg:pl-0 lg:pt-12"
          style={{ "--i": index } as CSSProperties}
        >
          <span aria-hidden="true" className="method-node">
            <span className="method-node-core" />
          </span>
          <span className="font-display text-[13px] font-semibold tracking-[0.16em] text-azure-light">
            Stage {Number(step.step)}
          </span>
          <h3 className="mt-2 font-display text-[19px] font-bold tracking-tight">
            {step.title}
          </h3>
          <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-white/70">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
