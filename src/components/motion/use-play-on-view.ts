"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drives CSS-defined entrance motion without hiding content by default.
 *
 * Server HTML renders in the final, visible state. After hydration the
 * element is "armed" (moved to its start state) only if it is still below
 * the fold, then set to "play" when it scrolls into view. With JavaScript
 * off, or when the user prefers reduced motion, nothing is ever hidden.
 */
export function usePlayOnView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "armed" | "play">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      // Already on screen at load: play immediately rather than flash.
      setState("armed");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setState("play")),
      );
      return;
    }

    setState("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("play");
          observer.disconnect();
        }
      },
      // Fire as soon as the top of the element is comfortably on screen,
      // so tall elements (a stacked timeline on mobile) still play.
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, state: state === "idle" ? undefined : state };
}
