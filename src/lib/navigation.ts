/**
 * Site navigation model — single source of truth for the header, the mobile
 * menu, the footer, and /sitemap.xml.
 *
 * "Our Products" and "Work" are intentionally absent: they are added only
 * when verified product or portfolio content exists
 * (see docs/SGG_CONTENT_CONFIRMATIONS.md).
 */
import { SERVICE_CATEGORIES } from "@/content/services";

export type NavSection = {
  label: string;
  href: string;
  links?: { label: string; href: string; description?: string }[];
};

export const PRIMARY_CTA = { label: "Discuss your project", href: "/contact" };

export const NAV: NavSection[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    links: SERVICE_CATEGORIES.map((category) => ({
      label: category.name,
      href: `/services/${category.slug}`,
      description: category.navDescription,
    })),
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
];

/** Indexable static routes, used by sitemap generation. */
export const ALL_ROUTES: string[] = [
  "/",
  "/services",
  ...SERVICE_CATEGORIES.map((category) => `/services/${category.slug}`),
  "/about",
  "/contact",
  ...LEGAL_LINKS.map((link) => link.href),
];
