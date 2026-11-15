"use client";

import Image from "next/image";
import { usePlayOnView } from "./use-play-on-view";

/**
 * A photograph that uncovers with a clip-path wipe and settles from a slight
 * zoom when it scrolls into view. Visible by default (no script, reduced
 * motion, or already on screen).
 */
export function RevealPhoto({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const { ref, state } = usePlayOnView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-motion={state}
      className={`reveal-photo relative overflow-hidden rounded-[14px] bg-midnight ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
