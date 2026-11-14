/**
 * Site navigation model — single source of truth for header dropdowns,
 * the mobile menu, the footer sitemap, and (indirectly) /sitemap.xml.
 */

export type NavSection = {
  label: string;
  href: string;
  description?: string;
  links?: { label: string; href: string; description?: string }[];
};

export const NAV: NavSection[] = [
  {
    label: "About Us",
    href: "/about",
    description: "The firm, how it is run, and how to work with us.",
    links: [
      {
        label: "Company Overview",
        href: "/about",
        description: "Positioning, mission, and values",
      },
      {
        label: "Leadership",
        href: "/about/leadership",
        description: "People, once names are confirmed",
      },
      {
        label: "Corporate Governance",
        href: "/about/governance",
        description: "Mandates, records, and how we behave",
      },
      {
        label: "Company Profile",
        href: "/company-profile",
        description: "Print-friendly firm overview",
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Open roles, when we have them",
      },
      {
        label: "Partnerships",
        href: "/partnerships",
        description: "Working relationships with specialist firms",
      },
    ],
  },
  {
    label: "Services",
    href: "/services",
    description:
      "Business and management consulting, technology, digital transformation, applications, software, and AI.",
    links: [
      {
        label: "Services Overview",
        href: "/services",
        description: "The eight service areas",
      },
      {
        label: "Business Consulting",
        href: "/services/business-consulting",
        description: "Strategy, market entry, planning, operations",
      },
      {
        label: "Management Consulting",
        href: "/services/management-consulting",
        description: "Executive counsel, change, growth, governance",
      },
      {
        label: "IT Consulting",
        href: "/services/it-consulting",
        description: "Assessments, architecture, cloud, security",
      },
      {
        label: "Digital Transformation",
        href: "/services/digital-transformation",
        description: "Digitization, workflows, integration, data",
      },
      {
        label: "Business Applications",
        href: "/services/business-applications",
        description: "Power Platform, Microsoft 365, CRM, ERP",
      },
      {
        label: "Custom Software Development",
        href: "/services/software-development",
        description: "Web, portals, mobile, APIs, SaaS",
      },
      {
        label: "Websites & Digital Presence",
        href: "/services/websites",
        description: "Corporate sites, landing pages, e-commerce",
      },
      {
        label: "AI & Automation",
        href: "/services/ai-automation",
        description: "AI strategy, automation, assistants",
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    description: "The kinds of organizations we work with.",
    links: [
      {
        label: "Industries Overview",
        href: "/industries",
        description: "Who the work is for",
      },
      { label: "SMEs", href: "/industries/smes" },
      { label: "Startups", href: "/industries/startups" },
      {
        label: "Growth-Stage Companies",
        href: "/industries/growth-stage-companies",
      },
      {
        label: "Private Business Owners",
        href: "/industries/private-business-owners",
      },
      { label: "Family Businesses", href: "/industries/family-businesses" },
      { label: "Technology Firms", href: "/industries/technology-firms" },
      { label: "Investors", href: "/industries/investors" },
      { label: "Corporate Clients", href: "/industries/corporate-clients" },
    ],
  },
  {
    label: "Case Studies",
    href: "/case-studies",
    description: "Representative engagement patterns, anonymized.",
  },
  {
    label: "Insights",
    href: "/insights",
    description: "Short notes from the work.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Request a consultation or discovery call.",
  },
];

/** Legal links used by the footer and legal pages. */
export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Regulatory Disclosures", href: "/legal/regulatory-disclosures" },
  { label: "Risk Disclosures", href: "/legal/risk-disclosures" },
  { label: "Cookie Policy", href: "/legal/cookie-policy" },
];

/**
 * Flat list of core static routes — used by sitemap generation.
 * Dynamic service, industry, insight, case-study, and legal routes are
 * appended from their content layers in src/app/sitemap.ts.
 */
export const ALL_ROUTES: string[] = [
  "/",
  "/about",
  "/about/leadership",
  "/about/governance",
  "/services",
  "/services/business-consulting",
  "/services/management-consulting",
  "/services/it-consulting",
  "/services/digital-transformation",
  "/services/business-applications",
  "/services/software-development",
  "/services/websites",
  "/services/ai-automation",
  "/industries",
  "/industries/smes",
  "/industries/startups",
  "/industries/growth-stage-companies",
  "/industries/private-business-owners",
  "/industries/family-businesses",
  "/industries/technology-firms",
  "/industries/investors",
  "/industries/corporate-clients",
  "/case-studies",
  "/insights",
  "/faq",
  "/company-profile",
  "/partnerships",
  "/careers",
  "/contact",
  "/legal/privacy-policy",
  "/legal/terms-of-use",
  "/legal/regulatory-disclosures",
  "/legal/risk-disclosures",
  "/legal/cookie-policy",
];
