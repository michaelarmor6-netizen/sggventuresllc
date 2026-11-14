/**
 * Industries content layer — client segments served.
 */

export type IndustryContent = {
  slug: string;
  name: string;
  summary: string;
  intro: string[];
  needs: { title: string; body: string }[];
  relevantServices: { category: string; service: string }[];
  icon: string;
};

export const INDUSTRIES: IndustryContent[] = [
  {
    slug: "smes",
    name: "SMEs",
    summary:
      "Established small and mid-sized companies that need senior advice and practical delivery without a large-firm structure.",
    intro: [
      "SMEs carry the same strategic, operational, and technology questions as larger companies, usually without a corporate development team, an architecture function, or a full-time transformation office. The decision still has to be made, and the business still has to run while it is made.",
      "We scope work around a defined decision or operating outcome, keep the engagement proportionate to the business, and design the deliverable for the team that will actually run it.",
    ],
    needs: [
      {
        title: "A plan the operators can use",
        body: "Choices written down with owners, dates, and money — not a strategy deck that is presented once and filed.",
      },
      {
        title: "Technology that fits the business",
        body: "Practical use of the systems you already own before committing to a new platform.",
      },
      {
        title: "Senior attention without the overhead",
        body: "A named lead who stays on the engagement rather than handing the work to an unseen delivery team.",
      },
    ],
    relevantServices: [
      { category: "business-consulting", service: "business-strategy" },
      { category: "business-consulting", service: "process-improvement" },
      { category: "business-applications", service: "power-platform" },
    ],
    icon: "Store",
  },
  {
    slug: "startups",
    name: "Startups",
    summary:
      "Early-stage companies that need a credible plan, a defensible operating model, and technology built for the next stage rather than the last one.",
    intro: [
      "Startups often need two things at once: a clear view of the market and business model, and a technology foundation that will not have to be rebuilt at the first sign of growth. Both are easier to get right before the commitments are made.",
      "We work on defined questions — market entry, business planning, product scope, platform architecture — and we are explicit about what should be built now and what should wait.",
    ],
    needs: [
      {
        title: "A business model that survives scrutiny",
        body: "A plan that links customers, pricing, cost to serve, and cash rather than a single growth assumption.",
      },
      {
        title: "A sensible first technology stack",
        body: "Architecture and build decisions that account for the next stage without over-engineering the current one.",
      },
      {
        title: "An honest view of readiness",
        body: "A clear assessment of what is proven, what is assumed, and what needs to be tested next.",
      },
    ],
    relevantServices: [
      { category: "business-consulting", service: "business-planning" },
      { category: "business-consulting", service: "market-entry" },
      { category: "software-development", service: "saas-platforms" },
    ],
    icon: "Rocket",
  },
  {
    slug: "growth-stage-companies",
    name: "Growth-Stage Companies",
    summary:
      "Companies past product-market fit that need to scale operations, systems, and management without losing what made them work.",
    intro: [
      "Growth exposes the parts of the operating model that were held together by founders and informal process. Sales outpace delivery, reporting depends on spreadsheets, and the management team inherits decisions it did not design.",
      "We work on the transition: the operating model, the management system, the systems and data, and the organizational changes required to scale without losing margin or service quality.",
    ],
    needs: [
      {
        title: "An operating model that scales",
        body: "Clear ownership, process, and decision rights as the company grows beyond its founding structure.",
      },
      {
        title: "Systems and data that keep up",
        body: "Integration, reporting, and automation that reduce manual reconciliation and management guesswork.",
      },
      {
        title: "A management system",
        body: "A small set of measures, a review cadence, and problem-solving discipline that does not depend on heroics.",
      },
    ],
    relevantServices: [
      { category: "management-consulting", service: "growth-strategies" },
      { category: "business-consulting", service: "operational-excellence" },
      { category: "digital-transformation", service: "data-strategy" },
    ],
    icon: "TrendingUp",
  },
  {
    slug: "private-business-owners",
    name: "Private Business Owners",
    summary:
      "Owner-led companies that need a straight answer on growth, succession, or what happens next.",
    intro: [
      "Private companies carry strategic, financial, and personal questions at the same time. The owner is often the decision-maker, the largest shareholder, and the person who will live with the outcome.",
      "We keep the conversation direct and confidential. The work is usually specific: a growth decision, a readiness assessment, a management transition, or a set of numbers that do not tell a coherent story.",
    ],
    needs: [
      {
        title: "A person the owner can call",
        body: "Independent advice on a decision, delivered in the room rather than as a brand.",
      },
      {
        title: "The actual financial picture",
        body: "What the company owes, what it can support, and which options are real.",
      },
      {
        title: "What happens after the owner",
        body: "A plan the lawyer, tax adviser, and management team can work from.",
      },
    ],
    relevantServices: [
      { category: "management-consulting", service: "executive-advisory" },
      { category: "business-consulting", service: "business-planning" },
      { category: "management-consulting", service: "growth-strategies" },
    ],
    icon: "Briefcase",
  },
  {
    slug: "family-businesses",
    name: "Family Businesses",
    summary:
      "Family-owned companies navigating growth, governance, succession, and the boundary between ownership and management.",
    intro: [
      "Family businesses often have a longer time horizon and a more complex set of stakeholders than their size suggests. Decisions about growth, capital, roles, and succession carry both commercial and relational consequences.",
      "We help structure the decision without pretending the family dimension is irrelevant. Where legal, tax, or estate work is required, it is performed by the family's qualified advisers, and we coordinate around it.",
    ],
    needs: [
      {
        title: "Governance that fits the family",
        body: "Clear authority between owners, board, and management without importing a public-company structure.",
      },
      {
        title: "Succession and transition planning",
        body: "A sequenced plan for leadership, ownership, and operating responsibility.",
      },
      {
        title: "A business that can outlive the founder",
        body: "Process, systems, and management capability that do not depend on one person.",
      },
    ],
    relevantServices: [
      { category: "management-consulting", service: "governance-support" },
      { category: "business-consulting", service: "organizational-development" },
      { category: "management-consulting", service: "change-management" },
    ],
    icon: "Building2",
  },
  {
    slug: "technology-firms",
    name: "Technology Firms",
    summary:
      "Software and technology companies that need product, architecture, delivery, or go-to-market support without adding permanent overhead.",
    intro: [
      "Technology firms often need senior capability for a defined period: a product decision, an architecture review, a delivery reset, or a go-to-market assessment. The work has to fit the way a technology business actually operates.",
      "We provide independent assessment and hands-on delivery support across product, platform, data, and operating model, and we are comfortable working alongside an existing engineering team.",
    ],
    needs: [
      {
        title: "An independent architecture view",
        body: "A review of platform, integration, and scalability decisions against the product roadmap.",
      },
      {
        title: "Delivery that fits the stage",
        body: "Product scope, engineering process, and release discipline sized to the company rather than a large enterprise.",
      },
      {
        title: "A commercial view of the product",
        body: "Pricing, packaging, target customer, and the operating model required to support growth.",
      },
    ],
    relevantServices: [
      { category: "it-consulting", service: "enterprise-architecture" },
      { category: "software-development", service: "saas-platforms" },
      { category: "management-consulting", service: "growth-strategies" },
    ],
    icon: "Code2",
  },
  {
    slug: "investors",
    name: "Investors",
    summary:
      "Private equity, family offices, and other investors that need independent operating and technology support for the businesses they own.",
    intro: [
      "Investors need a view they can act on: what the business actually does, where the operating risk sits, and what has to change to improve performance. The work has to be independent and clear about its limits.",
      "We support operating improvement, technology assessments, and management reporting. We do not provide investment advice, securities brokerage, or regulated financial services.",
    ],
    needs: [
      {
        title: "An operational review",
        body: "A structured view of how the business runs behind the financial model, coordinated with the client's advisers.",
      },
      {
        title: "An operating improvement plan",
        body: "Specific changes, owners, and measures rather than a list of synergy targets.",
      },
      {
        title: "Reporting the board can use",
        body: "A concise management information pack tied to the value creation plan.",
      },
    ],
    relevantServices: [
      { category: "it-consulting", service: "technology-assessments" },
      { category: "digital-transformation", service: "data-strategy" },
      { category: "management-consulting", service: "performance-improvement" },
    ],
    icon: "LineChart",
  },
  {
    slug: "corporate-clients",
    name: "Corporate Clients",
    summary:
      "Established companies and their boards, when the next decision is strategic, operational, or technological.",
    intro: [
      "Corporate clients call us when a board paper is due and the internal story is incomplete, or when a technology decision has become a business risk. The work usually crosses functions.",
      "We bring an independent view and a defined scope. Where the work requires legal, tax, accounting, or regulated advice, that piece stays with the client's qualified advisers and we coordinate around it.",
    ],
    needs: [
      {
        title: "A board-ready case",
        body: "Analysis and a written recommendation that survives scrutiny from directors, lenders, and investors.",
      },
      {
        title: "Change that stays on the rails",
        body: "Programme structure, governance, and progress reporting so management can still run the company.",
      },
      {
        title: "Technology decisions tied to the business",
        body: "Architecture, platform, and transformation choices assessed against cost, risk, and operating capacity.",
      },
    ],
    relevantServices: [
      { category: "business-consulting", service: "business-strategy" },
      { category: "management-consulting", service: "change-management" },
      { category: "it-consulting", service: "technology-assessments" },
    ],
    icon: "Factory",
  },
];

export function getIndustry(slug: string): IndustryContent | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
