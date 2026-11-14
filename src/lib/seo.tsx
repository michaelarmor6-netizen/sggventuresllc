import type { Metadata } from "next";
import { SITE_URL, COMPANY } from "@/lib/site";

/**
 * Canonical metadata builder used by every page.
 * `keywords` is optional so older pages keep working unchanged.
 */
export function createMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | SGG Ventures LLC`,
      description,
      url,
      type: "website",
    },
    twitter: { description },
  };
}

/** Site-wide keyword set used by the root layout. */
export const CORE_KEYWORDS = [
  "SGG Ventures",
  "business consulting",
  "management consulting",
  "IT consulting",
  "digital transformation consulting",
  "business applications consulting",
  "Power Platform consulting",
  "custom software development",
  "AI consulting",
  "business advisory and technology consulting",
];

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  legalName: COMPANY.legalName,
  url: SITE_URL,
  email: COMPANY.email,
  telephone: COMPANY.phoneHref.replace("tel:", ""),
  description: COMPANY.positioningStatement,
  slogan: COMPANY.tagline,
  knowsAbout: [
    "Business Consulting",
    "Management Consulting",
    "IT Consulting",
    "Digital Transformation",
    "Business Applications",
    "Custom Software Development",
    "AI and Automation",
  ],
  foundingDate: "2026-11-06",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: COMPANY.phoneHref.replace("tel:", ""),
      email: COMPANY.email,
      contactType: "corporate inquiries",
      availableLanguage: ["English"],
    },
  ],
};

/** Injects Organization JSON-LD (rendered once, in the root layout). */
export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
    />
  );
}

/** Service JSON-LD for an individual service page. */
export function ServiceJsonLd({
  name,
  description,
  path,
  category,
}: {
  name: string;
  description: string;
  path: string;
  category: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: category,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "Organization",
      name: COMPANY.legalName,
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Breadcrumb JSON-LD for interior pages. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** FAQPage JSON-LD for the FAQ page. */
export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
