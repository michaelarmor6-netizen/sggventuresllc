/**
 * Legal and disclosure content.
 *
 * Privacy, terms, and cookies describe what the website does today: what the
 * forms collect, where submissions go, and which cookies are set. Retention
 * periods, governing-law clauses, and provider names are added once
 * confirmed. All pages are flagged for review by counsel.
 */

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type LegalDoc = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
  legalReview: boolean;
};

const LAST_UPDATED = "2026-11-14";

const PRIVACY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  summary: "What this website collects when you send an enquiry, and how it is used.",
  shortTitle: "Privacy",
  lastUpdated: LAST_UPDATED,
  legalReview: true,
  intro: [
    "This policy explains what information SGG Ventures LLC (\"we\") receives through this website and what we do with it. It covers the website and its enquiry form. Information shared during a client project is handled under the terms agreed for that project.",
  ],
  sections: [
    {
      heading: "Information you give us",
      paragraphs: ["When you send an enquiry, we receive the details you enter in the form:"],
      bullets: [
        "Your name and email address",
        "Your business name",
        "The service area you select and the details of your enquiry",
        "Your budget and timeline, if you choose to give them",
      ],
    },
    {
      heading: "Partnership enquiries",
      paragraphs: [
        "If you submit the partnership form, we also receive your organization's name, a contact name, email address, telephone number (optional), country, website (optional), the partnership category, and your description of the proposed relationship.",
      ],
    },
    {
      heading: "Accounts",
      paragraphs: [
        "Accounts and sign-in are provided by Clerk, Inc., our authentication provider. When you create an account, Clerk processes your name, email address, password (stored by Clerk in hashed form), and sign-in activity on our behalf, and handles email verification and password resets.",
        "On our side we store your name, email address, company (if given), your portal role, and the identifier that links your record to your Clerk account. You can ask us to close your account and delete this information through the contact page.",
      ],
    },
    {
      heading: "Information recorded automatically",
      paragraphs: [
        "When an enquiry is submitted, we record the address of the page it was sent from and a shortened, one-way hashed fingerprint derived from your network address. The fingerprint is used only to limit repeated submissions; your network address itself is not stored with the enquiry.",
        "This website does not use advertising or analytics trackers. The companies that host the website may keep standard technical logs as part of operating the service.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use enquiry details to read, assess, and reply to your enquiry, and to keep a record of our correspondence with you. We do not sell personal information and do not use enquiry details for third-party advertising.",
      ],
    },
    {
      heading: "Where it is stored and who can see it",
      paragraphs: [
        "Enquiries are stored in the website's database and can be viewed by our staff through a password-protected area of the site. A copy of the enquiry may also be sent to our own inbox by an email delivery provider.",
        "Our hosting, database, and email delivery providers process this information on our behalf so that the website can operate. We do not otherwise share it, unless we are required to by law.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You can ask us for a copy of the enquiry details we hold about you, ask us to correct them, or ask us to delete them. Send the request through the contact page and we will respond to it.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If the way this website handles information changes, we will update this page and the date shown at the top.",
      ],
    },
  ],
};

const TERMS: LegalDoc = {
  slug: "terms-of-use",
  title: "Terms of Use",
  summary: "The terms that apply when you use this website.",
  shortTitle: "Terms",
  lastUpdated: LAST_UPDATED,
  legalReview: true,
  intro: [
    "These terms apply to your use of this website, which is operated by SGG Ventures LLC. By using the website you agree to them.",
  ],
  sections: [
    {
      heading: "Using the website",
      paragraphs: [
        "You may view the website and share links to it. Please do not misuse it: do not attempt to disrupt it, gain access to areas that are not public, or submit false or automated enquiries.",
      ],
    },
    {
      heading: "Information on the website",
      paragraphs: [
        "The website describes our services in general terms. It is not an offer, a quotation, or professional advice. We try to keep it accurate, but services, scope, and availability are confirmed only in a written proposal.",
      ],
    },
    {
      heading: "Enquiries",
      paragraphs: [
        "Sending an enquiry does not create a contract or a client relationship, and we may decline an enquiry. A project begins only when both sides have agreed its scope and terms in writing.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The content and design of this website, including the SGG Ventures name and logo, belong to SGG Ventures LLC or its licensors. Photographs credited to third parties are used under their licences. Nothing on the website grants you a licence to use our name or logo.",
      ],
    },
    {
      heading: "Links to other sites",
      paragraphs: [
        "Where the website links to other sites, those sites are run by other parties and have their own terms and privacy practices.",
      ],
    },
    {
      heading: "Availability and liability",
      paragraphs: [
        "The website is provided as it is and as available. To the extent the law allows, we are not liable for loss arising from your use of the website or from relying on its general information.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may update the website and these terms. The version shown here, with the date at the top, is the one that applies when you use the website.",
      ],
    },
  ],
};

const COOKIES: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  summary: "The cookies this website sets, and why.",
  shortTitle: "Cookies",
  lastUpdated: LAST_UPDATED,
  legalReview: true,
  intro: [
    "This website is built to work without tracking. This page lists the only cookie it sets.",
  ],
  sections: [
    {
      heading: "No tracking or advertising cookies",
      paragraphs: [
        "The public pages of this website set no advertising, analytics, or tracking cookies, so there is no cookie banner to accept.",
      ],
    },
    {
      heading: "Sign-in cookies",
      paragraphs: [
        "Sign-in is provided by Clerk, our authentication provider, which sets strictly necessary cookies to keep you signed in and to protect sign-in against abuse. They are used for authentication only, not for advertising or analytics.",
      ],
    },
    {
      heading: "If this changes",
      paragraphs: [
        "If the website later adds a feature that sets other cookies, this page will be updated first and consent will be requested where the law requires it.",
      ],
    },
    {
      heading: "Managing cookies",
      paragraphs: [
        "You can delete or block cookies in your browser settings. Blocking the sign-in cookies prevents signing in; the public pages are unaffected.",
      ],
    },
  ],
};

const INTRO_REGULATORY = [
  "This page describes the regulatory positioning that governs the presentation of SGG Ventures LLC's services. It exists so that prospective clients and partners can rely on a single, accurate statement of what the Company does itself, what is performed by qualified third parties, and what it provides as advisory, analytical, or technical work.",
];

const REGULATORY_SECTIONS: LegalSection[] = [
  {
    heading: "General positioning",
    paragraphs: [
      "SGG Ventures LLC is a Wyoming limited liability company. The Company is a strategic business advisory and technology consulting firm operating across eight service areas: Business Consulting, Management Consulting, IT Consulting, Digital Transformation, Business Applications, Custom Software Development, Websites & Digital Presence, and AI & Automation.",
      "Services are provided through the following delivery structures, in each case as disclosed in the relevant service description:",
    ],
    bullets: [
      "Direct provision by the Company of consulting, advisory, analytical, and technology services that are not reserved to a regulated status the Company does not hold",
      "Performance by a qualified third party, named in the engagement, where the work requires a licence, registration, or certification the Company does not hold, including legal, tax, accounting, securities, and regulated technology work",
      "Advisory, coordination, and client-side support provided by the Company around work performed by qualified third parties retained or engaged for the client",
    ],
  },
  {
    heading: "Name and regulated activity",
    paragraphs: [
      "The Company's legal name includes the word \"Ventures\". That name does not mean, and should not be read to mean, that the Company is a venture capital fund, securities broker, dealer, placement agent, investment adviser, or licensed financial intermediary. The Company does not provide securities brokerage, securities dealing, investment management, investment advice, or regulated financial advice.",
      "Where an engagement involves activity that requires a securities licence or another regulated authorisation, that activity is performed by appropriately licensed institutions engaged for that purpose. The Company's role is confined to disclosed advisory, analytical, coordination, or support functions on the client's side of the matter.",
    ],
  },
  {
    heading: "Regarding technology services",
    paragraphs: [
      "The Company provides technology assessment, architecture, implementation, software development, and automation services directly. Product licensing, cloud consumption, and third-party platform terms are agreements between the client and the relevant vendor; the Company does not resell licences or accept vendor commissions that would compromise an independent recommendation.",
      "Where an engagement requires a regulated technology certification, security attestation, or professional accreditation the Company does not hold, that work is performed by a qualified third party named in the engagement.",
    ],
  },
  {
    heading: "Verification status",
    paragraphs: [
      "This page intentionally omits any statement of regulatory registrations, licences, memberships, or affiliations until they have been independently verified at the appropriate level for publication. Where a disclosure on this page is superseded by verified information, the verified statement will be published here with its effective date.",
    ],
    bullets: [
      "Licences and registrations held: to be published upon verified confirmation",
      "Regulated memberships and affiliations: to be published upon verified confirmation",
      "Authorised partner institutions: published only with the partner's verified authorisation scope",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about regulatory positioning, or reports of any presentation inconsistent with this page, may be directed to the Company's contact channels published in the website footer.",
    ],
  },
];

const INTRO_RISK = [
  "The following risk disclosures apply generally to the matters described in the Company's services and publications. They are precautionary and do not purport to describe all risks relevant to any specific transaction, business, technology programme, or jurisdiction. Nothing on this page is investment, legal, tax, or accounting advice.",
];

const RISK_SECTIONS: LegalSection[] = [
  {
    heading: "General",
    paragraphs: [
      "Business, financial, technology, and cross-border activities involve risk, including the possible loss of capital, project cost overruns, business disruption, cyber incidents, and the costs arising from delay, failure of counterparties, and changes in regulation. Prospective clients should evaluate risk with their own professional advisers before acting on any matter discussed with the Company.",
    ],
  },
  {
    heading: "No assurance as to outcomes",
    paragraphs: [
      "Descriptions of the Company's services describe capabilities and processes, not outcomes. No statement, document, or communication by the Company constitutes assurance of any particular result (including regulatory clearance, transaction completion, technology delivery, cost savings, revenue improvement, or financial outcome) unless such assurance is expressly agreed in a signed engagement.",
    ],
  },
  {
    heading: "Third-party providers and platforms",
    paragraphs: [
      "Where services involve, or are coordinated with, third-party providers (software vendors, cloud providers, implementation partners, professional advisers, and others), the client bears the risk associated with those parties within applicable law, subject to any express allocation agreed in the engagement. The Company recommends professional evaluation of any provider before engagement.",
    ],
  },
  {
    heading: "Technology and AI",
    paragraphs: [
      "Technology programmes carry delivery, integration, data quality, adoption, and security risk. AI and automation outputs may be incomplete, inaccurate, or unsuitable for a particular decision and require human review. Regulatory requirements affecting data protection, AI, and cross-border technology change frequently and vary by jurisdiction. Structures, processes, and configurations described on this website may be affected by such changes between publication and use.",
    ],
  },
  {
    heading: "Content on this website",
    paragraphs: [
      "Insights and other editorial content on this website reflect analysis and perspective as of the date of publication. They are generalised and informational and are not tailored to any recipient's circumstances. Forward-looking statements are inherently uncertain and are identified as such.",
    ],
  },
];

const REGULATORY: LegalDoc = {
  slug: "regulatory-disclosures",
  title: "Regulatory Disclosures",
  shortTitle: "Regulatory",
  summary:
    "How SGG Ventures' services are positioned against regulated activity: direct provision, qualified third parties, and coordination roles.",
  lastUpdated: LAST_UPDATED,
  intro: INTRO_REGULATORY,
  sections: REGULATORY_SECTIONS,
  legalReview: true,
};

const RISK: LegalDoc = {
  slug: "risk-disclosures",
  title: "Risk Disclosures",
  shortTitle: "Risk",
  summary:
    "General risk disclosures relevant to matters discussed in the Company's service descriptions and publications.",
  lastUpdated: LAST_UPDATED,
  intro: INTRO_RISK,
  sections: RISK_SECTIONS,
  legalReview: true,
};

export const LEGAL_DOCS: LegalDoc[] = [PRIVACY, TERMS, REGULATORY, RISK, COOKIES];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((doc) => doc.slug === slug);
}
