// SGG Ventures LLC — company facts. Publish only confirmed values.
// `address` is null by choice: the company keeps its addresses private.

export const COMPANY = {
  legalName: "SGG Ventures LLC",
  shortName: "SGG Ventures",
  commonName: "SGG Ventures",
  entityType: "Wyoming Limited Liability Company",
  jurisdiction: "Wyoming, United States",
  country: "United States",
  tagline: "Strategic Business. Intelligent Technology. Sustainable Growth.",
  positioning:
    "Strategic business advisory and technology consulting firm",
  positioningStatement:
    "SGG Ventures LLC is a strategic business advisory and technology consulting firm helping organizations achieve sustainable growth through business and management consulting, digital transformation, and business technology solutions.",

  // Confirmed from the Wyoming Articles of Organization filed 2026-11-06.
  // The filing number is published only once supplied.
  registration: {
    state: "Wyoming",
    number: null as string | null,
    formedOn: "November 6, 2026" as string | null,
    note:
      "Wyoming limited liability company, formed November 6, 2026.",
  },

  phone: "+1 917 672 7178",
  phoneHref: "tel:+19176727178",

  // Kept private by the company's decision. Set { lines, label } to publish.
  address: null as { lines: string[]; label: string } | null,

  email: "info@sggventures.online",
} as const;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
