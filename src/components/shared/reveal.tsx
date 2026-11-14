"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Subtle scroll-reveal wrapper — the site's single standardized entrance
 * micro-interaction. Restrained by design: no oversized motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /**
   * Render as a list item when the reveal sits directly inside a <ul>/<ol>.
   * A <div> between a list and its items is invalid markup.
   */
  as?: "div" | "li";
}) {
  const Component = as === "li" ? motion.li : motion.div;
  const reduceMotion = useReducedMotion();

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.24, delay: Math.min(delay, 0.12), ease: "easeOut" }}
    >
      {children}
    </Component>
  );
}
