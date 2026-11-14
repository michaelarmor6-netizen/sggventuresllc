/**
 * SGG Ventures LLC — company configuration.
 *
 * COMPANY holds values safe to publish as written. PUBLIC_FACTS values are
 * published only when set; `null` means "not confirmed yet" and the site
 * simply omits them. See docs/SGG_CONTENT_CONFIRMATIONS.md.
 */

export const COMPANY = {
  legalName: "SGG Ventures LLC",
  shortName: "SGG Ventures",
  tagline: "Websites, business apps, and automation, business support services, business software",
  positioning:
    "Websites, business applications, and automation tools for small businesses and online sellers",
  description:
    "SGG Ventures LLC develops websites, custom applications, and automation tools for small businesses and online sellers.",
} as const;

export type PublicAddress = {
  /** e.g. "Mailing address" or "Registered agent address". Use "Office"
   *  only if the company actually works from the premises. */
  label: string;
  lines: string[];
};

export type PublicFacts = {
  /** Monitored inbox shown as the direct alternative to the enquiry form. */
  email: string | null;
  /** Display format, e.g. "+1 917 6727178". */
  phone: string | null;
  address: PublicAddress | null;
  /** e.g. "Wyoming limited liability company" — only after checking the
   *  state's filing record. */
  entityDescription: string | null;
};

export const PUBLIC_FACTS: PublicFacts = {
  email: "info@sggventures.online",
  phone: "+1 917 672 7178",
  address: null,
  // Confirmed from the Wyoming Articles of Organization filed 2026-11-06.
  entityDescription: "Wyoming limited liability company",
};

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in production; on Vercel
 * the production domain is used when the variable is missing.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
