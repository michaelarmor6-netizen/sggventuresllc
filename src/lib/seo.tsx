import type { Metadata } from "next";
import { SITE_URL, COMPANY, PUBLIC_FACTS } from "@/lib/site";

/** Canonical metadata builder used by every public page. */
export function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${COMPANY.legalName}`,
      description,
      url,
      type: "website",
    },
    twitter: { title: `${title} | ${COMPANY.legalName}`, description },
  };
}

/**
 * Organization JSON-LD. Only confirmed facts are emitted: contact details
 * and address appear when PUBLIC_FACTS carries them, never before.
 */
function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.legalName,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/sgglogo.png`,
    description: COMPANY.description,
    knowsAbout: [
      "Website development",
      "Custom business applications",
      "Workflow automation",
      "Website and application maintenance",
    ],
    ...(PUBLIC_FACTS.email ? { email: PUBLIC_FACTS.email } : {}),
    ...(PUBLIC_FACTS.phone ? { telephone: PUBLIC_FACTS.phone } : {}),
  };
}

/** Injects Organization JSON-LD (rendered once, in the root layout). */
export function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
    />
  );
}

/** Service JSON-LD for a service page. */
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
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
