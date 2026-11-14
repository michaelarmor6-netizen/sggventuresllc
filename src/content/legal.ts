/**
 * Policy content.
 *
 * Describes what the website does today: what the enquiry form collects,
 * where it goes, and which cookies are set. Retention periods, governing-law
 * clauses, and provider names are added once confirmed. Have counsel review
 * before launch (see docs/SGG_CONTENT_CONFIRMATIONS.md).
 */

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type LegalDoc = {
  slug: string;
  title: string;
  summary: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
};

const LAST_UPDATED = "2026-11-13";

const PRIVACY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  summary: "What this website collects when you send an enquiry, and how it is used.",
  lastUpdated: LAST_UPDATED,
  intro: [
    "This policy explains what information SGG Ventures LLC (\"we\") receives through this website and what we do with it. It covers the website and its enquiry form. Information shared during a client project is handled under the terms agreed for that project.",
  ],
  sections: [
    {
      heading: "Information you give us",
      paragraphs: ["When you send a project enquiry, we receive the details you enter in the form:"],
      bullets: [
        "Your name and email address",
        "Your business name",
        "The project type you select and your project description",
        "Your budget and timeline, if you choose to give them",
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
  lastUpdated: LAST_UPDATED,
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
  lastUpdated: LAST_UPDATED,
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
      heading: "Sign-in cookie",
      paragraphs: [
        "If you have an account for the private portal and sign in, the website sets one session cookie that keeps you signed in. It is strictly necessary for the portal to work and is not used for anything else. Visitors who do not sign in do not receive it.",
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
        "You can delete or block cookies in your browser settings. Blocking the sign-in cookie prevents portal sign-in; the public pages are unaffected.",
      ],
    },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [PRIVACY, TERMS, COOKIES];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return LEGAL_DOCS.find((doc) => doc.slug === slug);
}
