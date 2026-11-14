import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Pill CTA. The pill shape carries the emphasis, so labels stay at
 * regular weight. One interactive colour (`royal`); on dark tiles the
 * primary becomes a white pill. No shadows.
 */
type Variant = "primary" | "secondary" | "outline" | "ghost" | "inverse" | "inverseOutline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-normal transition-[transform,background-color,color] duration-200 ease-[var(--ease-premium)] active:scale-95 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-royal text-white hover:bg-royal-deep",
  secondary: "bg-royal text-white hover:bg-royal-deep",
  outline: "border border-royal bg-white text-royal hover:bg-royal/5",
  ghost: "text-royal hover:bg-coolgray",
  inverse: "bg-white text-midnight hover:bg-white/90",
  inverseOutline: "border border-white/70 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-4 text-[14px]",
  md: "min-h-11 px-5 text-[16px]",
  lg: "min-h-12 px-7 text-[17px]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
};

export function Button({
  variant,
  size,
  className = "",
  children,
  ...props
}: ButtonBaseProps & ComponentProps<"button">) {
  return (
    <button className={`${buttonClass(variant, size)} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className = "",
  href,
  children,
  external,
}: ButtonBaseProps & { href: string; external?: boolean }) {
  if (external || href.startsWith("#") || href.startsWith("tel:")) {
    return (
      <a href={href} className={`${buttonClass(variant, size)} ${className}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
    </Link>
  );
}

/** Apple-style text link: interactive colour with a trailing chevron. */
export function ChevronLink({
  href,
  children,
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-1 text-[17px] ${
        tone === "dark" ? "text-white" : "text-royal"
      } hover:underline underline-offset-4 ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        ›
      </span>
    </Link>
  );
}
