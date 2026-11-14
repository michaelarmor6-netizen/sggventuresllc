/**
 * Services content layer — the eight service areas and their portfolios.
 *
 * Each category is a page at /services/[category]; each service is a page at
 * /services/[category]/[service]. Copy is deliberately specific and avoids
 * claims that require a licence, registration, or client consent.
 */

export type DeliveryClassification = "direct" | "partner" | "coordination";

export type Delivery = {
  classification: DeliveryClassification;
  text: string[];
};

export type ServiceContent = {
  slug: string;
  title: string;
  shortTitle?: string;
  summary: string;
  intro: string;
  challenges: { title: string; body: string }[];
  capabilities: { title: string; body: string }[];
  approach: { title: string; body: string }[];
  delivery: Delivery;
  related: string[];
  icon: string;
  legalReview?: boolean;
};

export type ServiceCategoryContent = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  intro: string[];
  highlights: string[];
  icon: string;
  services: ServiceContent[];
};

export const DELIVERY_LABEL: Record<DeliveryClassification, string> = {
  direct: "Direct delivery by SGG Ventures",
  partner: "Delivered with a qualified third-party specialist",
  coordination: "Coordinated by SGG Ventures",
};

export const OPERATING_MODEL_NOTE =
  "SGG Ventures provides consulting, advisory, and technology services directly. Where an engagement requires a licensed professional (legal, tax, accounting, securities, or a regulated technology certification), that work is performed by a qualified third party named in the engagement. SGG Ventures does not provide securities brokerage, investment management, or regulated financial advice.";

type ServiceSeed = Omit<ServiceContent, "approach" | "delivery"> & {
  delivery?: Delivery;
};

type CategorySeed = Omit<ServiceCategoryContent, "services"> & {
  approach: { title: string; body: string }[];
  delivery: Delivery;
  services: ServiceSeed[];
};

function makeCategory(seed: CategorySeed): ServiceCategoryContent {
  const { approach, delivery, services, ...rest } = seed;
  return {
    ...rest,
    services: services.map((service) => ({
      ...service,
      approach,
      delivery: service.delivery ?? delivery,
    })),
  };
}

const DIRECT_DELIVERY: Delivery = {
  classification: "direct",
  text: [
    "Services in this area are advisory, analytical, or technical services provided directly by SGG Ventures LLC.",
    "Where implementation requires a licensed professional or a regulated third party, that work is performed by a qualified provider named in the engagement. SGG Ventures coordinates the workstream but does not substitute for the licensed opinion.",
  ],
};

/* ============================================================================
   SERVICE AREA 01 — BUSINESS CONSULTING
   ==========================================================================*/

const BUSINESS_CONSULTING = makeCategory({
  slug: "business-consulting",
  code: "01",
  name: "Business Consulting",
  shortName: "Business Consulting",
  tagline: "Clarity on where to play and how to win.",
  summary:
    "Strategy, market entry, business planning, process improvement, operational excellence, and organizational development for companies that need a practical plan, not a deck.",
  intro: [
    "Business consulting is about the choices that determine how a company competes: which customers to serve, which markets to enter, how work gets done, and where the organization needs to be stronger. We work with leadership teams to make those choices explicit and to translate them into a plan with owners and dates.",
    "Our work is analytical and direct. We do not sell products, software licences, or transactions into an engagement. Where a recommendation depends on legal, tax, or regulated advice, we define the question precisely and coordinate the qualified adviser.",
    "Engagements are scoped around a decision or a defined operating outcome. The deliverable is a written view the client can act on, not an open-ended retainer.",
  ],
  highlights: [
    "Business strategy and strategic planning",
    "Market entry and expansion",
    "Business planning and financial modelling",
    "Process improvement and operational excellence",
    "Organizational design and development",
    "Board-ready analysis and recommendations",
  ],
  icon: "Compass",
  approach: [
    {
      title: "Diagnose",
      body: "Establish the facts: markets, customers, economics, operations, and the constraints that matter.",
    },
    {
      title: "Design",
      body: "Develop and test the options, then make an explicit recommendation with trade-offs stated plainly.",
    },
    {
      title: "Deliver",
      body: "Turn the recommendation into a sequenced plan with owners, milestones, and measures.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "business-strategy",
      title: "Business Strategy",
      shortTitle: "Strategy",
      summary:
        "A written view of where to compete, what to prioritize, and what to stop.",
      intro:
        "Strategy work fails when it stays abstract. We help leadership teams make explicit choices about markets, customers, capabilities, and where the money goes. Then we turn those choices into a plan with owners and dates.",
      challenges: [
        {
          title: "Strategy that never leaves the deck",
          body: "Plans are presented once, then displaced by the operating calendar. Without owners and checkpoints, priorities drift.",
        },
        {
          title: "Too many priorities",
          body: "A strategy that names ten priorities is a budget list. The hard work is deciding what not to fund.",
        },
        {
          title: "No shared view of the market",
          body: "Leaders work from different assumptions about customers, competitors, and constraints. Decisions inherit the confusion.",
        },
      ],
      capabilities: [
        {
          title: "Strategic diagnostic",
          body: "Structured review of markets, customers, capabilities, economics, and competitive position.",
        },
        {
          title: "Choice architecture",
          body: "Facilitated decisions on where to play, how to win, and what to stop.",
        },
        {
          title: "Growth roadmap",
          body: "Sequenced initiatives with owners, milestones, investment needs, and success measures.",
        },
        {
          title: "Board-ready narrative",
          body: "A concise written case that survives scrutiny from directors, lenders, and investors.",
        },
      ],
      related: ["market-entry", "business-planning", "growth-strategies"],
      icon: "Map",
    },
    {
      slug: "market-entry",
      title: "Market Entry",
      shortTitle: "Market Entry",
      summary:
        "A practical assessment of a new market, customer segment, or geography.",
      intro:
        "Entering a market is a set of commitments, not a single decision. We assess demand, competition, route to market, operating requirements, and risk before the first hire or shipment.",
      challenges: [
        {
          title: "Optimism substituted for evidence",
          body: "Market size estimates rarely survive contact with actual buyers. We test demand against defined customer evidence.",
        },
        {
          title: "Underestimated operating burden",
          body: "Licensing, hiring, tax, logistics, and local support are often discovered after the commitment is made.",
        },
        {
          title: "A route to market that does not fit",
          body: "A channel that works elsewhere may not fit the new market's buying behavior or partner landscape.",
        },
      ],
      capabilities: [
        {
          title: "Market and competitor assessment",
          body: "Demand signals, competitor positioning, pricing, and channel structure.",
        },
        {
          title: "Entry options",
          body: "Comparison of direct entry, partnership, acquisition, and staged pilot approaches.",
        },
        {
          title: "Operating requirements",
          body: "People, systems, compliance, and local support needed to serve the market.",
        },
        {
          title: "Entry plan",
          body: "A staged plan with decision gates, budget, and measures of early traction.",
        },
      ],
      related: ["business-strategy", "business-planning", "growth-strategies"],
      icon: "Flag",
    },
    {
      slug: "business-planning",
      title: "Business Planning",
      shortTitle: "Business Planning",
      summary:
        "A plan that connects the operating model, the numbers, and the cash.",
      intro:
        "A business plan is useful when it can be operated. We build plans that link customers, capacity, pricing, costs, and cash, and that make it obvious which assumptions matter most.",
      challenges: [
        {
          title: "Plans built for a lender, not the business",
          body: "Documents written only to satisfy a bank or investor often fail to guide weekly decisions.",
        },
        {
          title: "Assumptions nobody owns",
          body: "Revenue and cost assumptions sit in a spreadsheet without owners or review.",
        },
        {
          title: "Cash treated as an afterthought",
          body: "Growth plans that ignore working capital and timing create avoidable crises.",
        },
      ],
      capabilities: [
        {
          title: "Operating model design",
          body: "How the business creates, delivers, and captures value, expressed in plain terms.",
        },
        {
          title: "Integrated financial model",
          body: "Revenue, cost, headcount, capital, and cash flow linked to operating drivers.",
        },
        {
          title: "Scenario and sensitivity analysis",
          body: "A view of outcomes under conservative, base, and upside assumptions.",
        },
        {
          title: "Execution calendar",
          body: "Milestones, owners, and review points that turn the plan into a management tool.",
        },
      ],
      related: ["business-strategy", "market-entry", "performance-improvement"],
      icon: "ClipboardList",
    },
    {
      slug: "process-improvement",
      title: "Process Improvement",
      shortTitle: "Process Improvement",
      summary:
        "Removing friction from the processes that consume the most time and margin.",
      intro:
        "Most operating drag is visible to the people doing the work but never prioritized. We map the process, quantify the friction, and redesign it with the team that runs it.",
      challenges: [
        {
          title: "Workarounds treated as the process",
          body: "Teams adapt around broken handoffs, so the documented process no longer reflects reality.",
        },
        {
          title: "Local optimization",
          body: "One department improves its step while pushing cost and delay downstream.",
        },
        {
          title: "Improvements that do not stick",
          body: "Redesigns fail when roles, measures, and systems are not changed with them.",
        },
      ],
      capabilities: [
        {
          title: "Process mapping",
          body: "End-to-end view of steps, handoffs, systems, delays, and failure points.",
        },
        {
          title: "Friction analysis",
          body: "Quantified time, cost, error, and customer-impact of current process performance.",
        },
        {
          title: "Target-state design",
          body: "Simplified process, clear ownership, and practical controls.",
        },
        {
          title: "Implementation support",
          body: "Pilot, measure, refine, and embed the new way of working.",
        },
      ],
      related: [
        "operational-excellence",
        "workflow-modernization",
        "power-automate",
      ],
      icon: "Workflow",
    },
    {
      slug: "operational-excellence",
      title: "Operational Excellence",
      shortTitle: "Operational Excellence",
      summary:
        "A management system for running the business consistently.",
      intro:
        "Operational excellence is not a slogan; it is the rhythm of measures, reviews, and problem-solving that keeps performance from depending on heroics.",
      challenges: [
        {
          title: "Measures that do not drive behavior",
          body: "Dashboards report activity rather than the few outcomes that matter.",
        },
        {
          title: "Reviews without decisions",
          body: "Meetings discuss variance but leave ownership and corrective action unclear.",
        },
        {
          title: "Improvement depends on individuals",
          body: "Performance falls when the person holding the process together leaves.",
        },
      ],
      capabilities: [
        {
          title: "Performance framework",
          body: "A small set of operational, customer, and financial measures with clear owners.",
        },
        {
          title: "Management cadence",
          body: "Daily, weekly, and monthly reviews designed to surface and resolve issues.",
        },
        {
          title: "Problem-solving discipline",
          body: "Structured root-cause analysis and corrective action.",
        },
        {
          title: "Capability building",
          body: "Coaching for managers so the system survives after the engagement.",
        },
      ],
      related: [
        "process-improvement",
        "performance-improvement",
        "organizational-development",
      ],
      icon: "TrendingUp",
    },
    {
      slug: "organizational-development",
      title: "Organizational Development",
      shortTitle: "Organization",
      summary:
        "Designing the structure, roles, and capabilities the strategy requires.",
      intro:
        "Organizations drift into structures that no longer match the work. We help leaders clarify accountability, spans, decision rights, and the capabilities needed next.",
      challenges: [
        {
          title: "Structure lags strategy",
          body: "New priorities are assigned to an organization designed for older ones.",
        },
        {
          title: "Unclear decision rights",
          body: "Decisions escalate or stall because nobody knows who owns them.",
        },
        {
          title: "Capability gaps discovered late",
          body: "Hiring and development plans are not connected to the work the strategy requires.",
        },
      ],
      capabilities: [
        {
          title: "Organizational diagnostic",
          body: "Review of structure, roles, spans, layers, and decision rights against strategic needs.",
        },
        {
          title: "Operating model alignment",
          body: "Clear accountability for customers, products, processes, and shared services.",
        },
        {
          title: "Role and capability design",
          body: "Role profiles and capability maps tied to the work.",
        },
        {
          title: "Transition planning",
          body: "Sequenced changes, communication, and support for affected teams.",
        },
      ],
      related: [
        "change-management",
        "governance-support",
        "executive-advisory",
      ],
      icon: "Building2",
    },
  ],
});

/* ============================================================================
   SERVICE AREA 02 — MANAGEMENT CONSULTING
   ==========================================================================*/

const MANAGEMENT_CONSULTING = makeCategory({
  slug: "management-consulting",
  code: "02",
  name: "Management Consulting",
  shortName: "Management Consulting",
  tagline: "Counsel for the decisions only leadership can make.",
  summary:
    "Executive advisory, change management, growth strategy, performance improvement, and governance support for leaders navigating complexity.",
  intro: [
    "Management consulting is the work that sits closest to leadership: the decisions, trade-offs, and organizational changes that determine whether a strategy becomes performance. We provide independent counsel and the structured work that makes those decisions defensible.",
    "We are not a placement desk and we do not sell products into an engagement. Our role is to help leaders see the problem clearly, choose a course, and keep the organization aligned through execution.",
    "Engagements are confidential, directly delivered, and scoped around a defined decision or change.",
  ],
  highlights: [
    "Executive and board advisory",
    "Change management and adoption",
    "Growth strategy",
    "Performance and margin improvement",
    "Governance and decision rights",
    "Leadership alignment",
  ],
  icon: "Briefcase",
  approach: [
    {
      title: "Listen",
      body: "Understand the decision, the constraints, and the perspectives of the people who will have to act on it.",
    },
    {
      title: "Align",
      body: "Build a shared fact base and an explicit choice, with trade-offs and accountability stated clearly.",
    },
    {
      title: "Embed",
      body: "Support adoption through cadence, capability, and follow-through rather than a one-off presentation.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "executive-advisory",
      title: "Executive Advisory",
      shortTitle: "Executive Advisory",
      summary:
        "A confidential sounding board for CEOs, founders, and senior leaders.",
      intro:
        "Senior leaders often make consequential decisions with too little independent challenge and too much input from people selling something. We provide a confidential, structured sounding board.",
      challenges: [
        {
          title: "Isolation at the top",
          body: "Senior leaders often lack a peer who can challenge assumptions without a political agenda.",
        },
        {
          title: "Advice from people selling something",
          body: "Banks, vendors, and advisers bring a transaction or product to the conversation.",
        },
        {
          title: "Decisions delayed by ambiguity",
          body: "When the facts are incomplete, leaders default to waiting or overcommitting.",
        },
      ],
      capabilities: [
        {
          title: "Decision counsel",
          body: "Structured challenge and independent perspective on major decisions.",
        },
        {
          title: "Leadership agenda",
          body: "Prioritization of the few issues that deserve executive attention.",
        },
        {
          title: "Stakeholder strategy",
          body: "Board, investor, and management alignment on sensitive matters.",
        },
        {
          title: "Confidential review",
          body: "A private, documented view of options, trade-offs, and consequences.",
        },
      ],
      related: [
        "governance-support",
        "business-strategy",
        "change-management",
      ],
      icon: "MessagesSquare",
    },
    {
      slug: "change-management",
      title: "Change Management",
      shortTitle: "Change",
      summary:
        "Helping organizations adopt change without losing the people who deliver it.",
      intro:
        "Change is not a communication event. It is a shift in behavior, incentives, systems, and management attention. We design the change around the people who must make it work.",
      challenges: [
        {
          title: "Change announced, not adopted",
          body: "Communication happens once, while behavior, incentives, and systems stay the same.",
        },
        {
          title: "Middle management left out",
          body: "Managers are expected to implement a change they had no part in shaping.",
        },
        {
          title: "Change fatigue",
          body: "Overlapping initiatives compete for the same attention and credibility.",
        },
      ],
      capabilities: [
        {
          title: "Change readiness assessment",
          body: "Stakeholder impact, capacity, and resistance mapped before launch.",
        },
        {
          title: "Stakeholder engagement",
          body: "A plan for the people who must act differently, not just a communication calendar.",
        },
        {
          title: "Adoption roadmap",
          body: "Milestones, training, support, and measures of behavior change.",
        },
        {
          title: "Leadership alignment",
          body: "A consistent story and decision discipline across the leadership team.",
        },
      ],
      related: [
        "organizational-development",
        "performance-improvement",
        "process-digitization",
      ],
      icon: "Repeat2",
    },
    {
      slug: "growth-strategies",
      title: "Growth Strategies",
      shortTitle: "Growth",
      summary:
        "Choosing the growth path that fits the company's economics and capacity.",
      intro:
        "Growth is not automatically good. The right path depends on margin, cash, capacity, and the capabilities the company can actually build. We help leaders compare the real options.",
      challenges: [
        {
          title: "Growth for its own sake",
          body: "Revenue growth that consumes cash or margin can weaken the business.",
        },
        {
          title: "One growth lever",
          body: "Companies rely on a single channel, customer, or product for expansion.",
        },
        {
          title: "Capacity constraints",
          body: "Sales growth outpaces delivery, service, or working capital.",
        },
      ],
      capabilities: [
        {
          title: "Growth diagnostic",
          body: "Where growth has come from, what it has cost, and which levers remain.",
        },
        {
          title: "Lever assessment",
          body: "Pricing, channels, products, customers, geographies, and partnerships compared.",
        },
        {
          title: "Economics of growth",
          body: "Margin, cash, and capacity implications of each option.",
        },
        {
          title: "Growth plan",
          body: "Sequenced initiatives with investment, owners, and checkpoints.",
        },
      ],
      related: [
        "business-strategy",
        "market-entry",
        "performance-improvement",
      ],
      icon: "Rocket",
    },
    {
      slug: "performance-improvement",
      title: "Performance Improvement",
      shortTitle: "Performance",
      summary:
        "Improving margin and cash through targeted operating and commercial changes.",
      intro:
        "Performance improvement is not a blanket cost programme. It is a disciplined look at where value leaks and where the fewest changes produce the largest durable effect.",
      challenges: [
        {
          title: "Cost cuts without a view of value",
          body: "Across-the-board reductions damage capabilities that drive revenue.",
        },
        {
          title: "Margin leakage",
          body: "Pricing, discounts, procurement, and service costs erode profit invisibly.",
        },
        {
          title: "Cash trapped in operations",
          body: "Inventory, receivables, and payment terms absorb capital.",
        },
      ],
      capabilities: [
        {
          title: "Profitability analysis",
          body: "Customer, product, and channel profitability with clear cost-to-serve.",
        },
        {
          title: "Cost and margin levers",
          body: "Prioritized actions across pricing, procurement, operations, and overhead.",
        },
        {
          title: "Working capital review",
          body: "Inventory, receivables, payables, and cash conversion.",
        },
        {
          title: "Improvement programme",
          body: "Owners, targets, cadence, and tracking for sustained results.",
        },
      ],
      related: [
        "operational-excellence",
        "business-planning",
        "process-improvement",
      ],
      icon: "LineChart",
    },
    {
      slug: "governance-support",
      title: "Governance Support",
      shortTitle: "Governance",
      summary:
        "Practical governance for boards, ownership groups, and growing companies.",
      intro:
        "Good governance is a decision system, not a binder. We help boards and ownership groups clarify authority, information, and oversight so they can add value without slowing the company down.",
      challenges: [
        {
          title: "Governance as paperwork",
          body: "Boards meet, but decision rights, information, and accountability remain unclear.",
        },
        {
          title: "Founder and board friction",
          body: "Roles blur as the company outgrows its original ownership structure.",
        },
        {
          title: "Risk oversight without a framework",
          body: "Directors are asked to oversee risks they cannot see clearly.",
        },
      ],
      capabilities: [
        {
          title: "Governance review",
          body: "Board composition, committees, cadence, and information flow.",
        },
        {
          title: "Decision rights",
          body: "Clear allocation of authority between owners, board, and management.",
        },
        {
          title: "Board materials",
          body: "Concise, decision-oriented reporting rather than management decks.",
        },
        {
          title: "Risk oversight",
          body: "A practical risk register and reporting routine for directors.",
        },
      ],
      related: [
        "executive-advisory",
        "business-strategy",
        "organizational-development",
      ],
      icon: "Scale",
    },
  ],
});

/* ============================================================================
   SERVICE AREA 03 — IT CONSULTING
   ==========================================================================*/

const IT_CONSULTING = makeCategory({
  slug: "it-consulting",
  code: "03",
  name: "IT Consulting",
  shortName: "IT Consulting",
  tagline: "Technology decisions that hold up under operating pressure.",
  summary:
    "Technology assessments, enterprise architecture, cloud strategy, cybersecurity advisory, and infrastructure optimization for organizations that need their systems to support the business.",
  intro: [
    "Technology decisions are business decisions. A platform choice affects cost, risk, hiring, customer experience, and how quickly the company can change. We help leaders make those decisions with a clear view of the current estate, the operating requirements, and the trade-offs.",
    "Our work is independent. We do not earn commissions from software vendors or cloud providers. Where implementation is required, we can deliver it or work alongside the client's technology team and partners.",
    "Engagements are scoped around a decision, a roadmap, or a defined operational outcome.",
  ],
  highlights: [
    "Technology and systems assessments",
    "Enterprise and solution architecture",
    "Cloud strategy and migration planning",
    "Cybersecurity and resilience advisory",
    "Infrastructure and cost optimization",
    "Technology roadmaps and governance",
  ],
  icon: "Server",
  approach: [
    {
      title: "Assess",
      body: "Understand the current estate, the business requirements, and the risks that matter.",
    },
    {
      title: "Architect",
      body: "Design the target architecture and the options, with cost, risk, and operating implications stated.",
    },
    {
      title: "Roadmap",
      body: "Sequence the work into a practical plan with owners, dependencies, and decision gates.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "technology-assessments",
      title: "Technology Assessments",
      shortTitle: "Assessments",
      summary:
        "An independent view of the systems, costs, risks, and gaps in the current technology estate.",
      intro:
        "You cannot make a good technology decision without an honest view of what you already run. We assess the estate against business requirements, not against a vendor's product roadmap.",
      challenges: [
        {
          title: "No reliable inventory",
          body: "Systems, licences, integrations, and ownership are spread across teams and spreadsheets.",
        },
        {
          title: "Cost without visibility",
          body: "Licence, cloud, and support costs grow without a clear view of what each system delivers.",
        },
        {
          title: "Risk discovered during an incident",
          body: "Single points of failure, unsupported software, and access gaps surface only when something breaks.",
        },
      ],
      capabilities: [
        {
          title: "Estate inventory",
          body: "Applications, infrastructure, integrations, licences, and ownership mapped.",
        },
        {
          title: "Business fit assessment",
          body: "How well each system supports the processes and outcomes it is meant to serve.",
        },
        {
          title: "Risk and resilience review",
          body: "Availability, security, supportability, and dependency risks.",
        },
        {
          title: "Recommendations",
          body: "Prioritized remediation, consolidation, and investment options.",
        },
      ],
      related: [
        "enterprise-architecture",
        "cloud-strategy",
        "infrastructure-optimization",
      ],
      icon: "Search",
    },
    {
      slug: "enterprise-architecture",
      title: "Enterprise Architecture",
      shortTitle: "Architecture",
      summary:
        "A target architecture that connects business capabilities to systems and data.",
      intro:
        "Architecture is the discipline that keeps systems from becoming a collection of local decisions. We define the target state, the standards, and the transition path in language business leaders can use.",
      challenges: [
        {
          title: "Integration by accretion",
          body: "Systems are added one decision at a time, creating duplication, fragile integrations, and unclear ownership.",
        },
        {
          title: "Architecture disconnected from strategy",
          body: "Technical designs do not reflect the capabilities the business is trying to build.",
        },
        {
          title: "No transition plan",
          body: "A target diagram without a sequenced path becomes shelfware.",
        },
      ],
      capabilities: [
        {
          title: "Capability and system mapping",
          body: "Business capabilities linked to applications, data, and infrastructure.",
        },
        {
          title: "Target architecture",
          body: "Principles, standards, and a future-state design that supports the strategy.",
        },
        {
          title: "Integration strategy",
          body: "APIs, data flows, and boundaries between systems.",
        },
        {
          title: "Transition roadmap",
          body: "Sequenced initiatives, dependencies, and architecture governance.",
        },
      ],
      related: [
        "technology-assessments",
        "business-systems-integration",
        "data-strategy",
      ],
      icon: "Network",
    },
    {
      slug: "cloud-strategy",
      title: "Cloud Strategy",
      shortTitle: "Cloud",
      summary:
        "A practical cloud plan based on cost, control, resilience, and operating capacity.",
      intro:
        "Cloud is an operating model, not a destination. The right approach depends on the workload, the data, the regulatory context, and the team's ability to run it. We help leaders choose deliberately.",
      challenges: [
        {
          title: "Migration without a business case",
          body: "Lift-and-shift projects move cost and complexity without improving service or agility.",
        },
        {
          title: "Cost surprises",
          body: "Consumption pricing and poor governance create bills that are hard to forecast or explain.",
        },
        {
          title: "Operating model gap",
          body: "Teams inherit cloud platforms without the skills, controls, or ownership needed to run them.",
        },
      ],
      capabilities: [
        {
          title: "Cloud readiness assessment",
          body: "Workload suitability, dependencies, data sensitivity, and team capability.",
        },
        {
          title: "Platform and provider options",
          body: "Comparison of public, private, hybrid, and managed approaches.",
        },
        {
          title: "Cost and governance model",
          body: "Forecasting, tagging, guardrails, and ownership of cloud spend.",
        },
        {
          title: "Migration roadmap",
          body: "Sequenced waves, decision gates, and operating-model changes.",
        },
      ],
      related: [
        "technology-assessments",
        "infrastructure-optimization",
        "enterprise-architecture",
      ],
      icon: "Cloud",
    },
    {
      slug: "cybersecurity-advisory",
      title: "Cybersecurity Advisory",
      shortTitle: "Cybersecurity",
      summary:
        "Risk-based security guidance for leaders, without fear-driven spending.",
      intro:
        "Cybersecurity is a business risk problem. We help leaders understand what matters, what is proportionate, and what to fix first. Not every threat is equally urgent, and we won't pretend otherwise.",
      challenges: [
        {
          title: "Security framed as a product list",
          body: "Spending is driven by vendor categories rather than the assets and scenarios that matter to the business.",
        },
        {
          title: "Unclear ownership",
          body: "Security responsibilities sit between IT, operations, and leadership without a clear decision owner.",
        },
        {
          title: "Incident readiness",
          body: "Plans exist on paper but have not been tested against realistic scenarios.",
        },
      ],
      capabilities: [
        {
          title: "Risk assessment",
          body: "Asset criticality, threat exposure, and control gaps prioritized by business impact.",
        },
        {
          title: "Control roadmap",
          body: "Proportionate improvements sequenced by risk and effort.",
        },
        {
          title: "Governance and policy",
          body: "Roles, decision rights, and reporting for security risk.",
        },
        {
          title: "Incident readiness",
          body: "Scenario planning, response roles, and testing.",
        },
      ],
      related: [
        "technology-assessments",
        "cloud-strategy",
        "governance-support",
      ],
      icon: "ShieldAlert",
    },
    {
      slug: "infrastructure-optimization",
      title: "Infrastructure Optimization",
      shortTitle: "Infrastructure",
      summary:
        "Reducing cost and fragility in the infrastructure that runs the business.",
      intro:
        "Infrastructure is often invisible until it fails or the bill arrives. We look at utilization, resilience, supportability, and cost, then put the changes that matter at the top of the list.",
      challenges: [
        {
          title: "Overprovisioned capacity",
          body: "Capacity is bought for peak scenarios that rarely occur, with little visibility into actual use.",
        },
        {
          title: "Fragile dependencies",
          body: "Ageing systems and undocumented integrations create outages and slow change.",
        },
        {
          title: "Cost allocated by guesswork",
          body: "Business units cannot see or influence the infrastructure cost they drive.",
        },
      ],
      capabilities: [
        {
          title: "Utilization and cost review",
          body: "Compute, storage, network, and support costs against actual demand.",
        },
        {
          title: "Resilience review",
          body: "Availability, redundancy, recovery, and single points of failure.",
        },
        {
          title: "Consolidation options",
          body: "Opportunities to simplify the estate and reduce run cost.",
        },
        {
          title: "Optimization plan",
          body: "Prioritized changes with savings, risk, and effort stated.",
        },
      ],
      related: [
        "technology-assessments",
        "cloud-strategy",
        "operational-excellence",
      ],
      icon: "Gauge",
    },
  ],
});

/* ============================================================================
   SERVICE AREA 04 — DIGITAL TRANSFORMATION
   ==========================================================================*/

const DIGITAL_TRANSFORMATION = makeCategory({
  slug: "digital-transformation",
  code: "04",
  name: "Digital Transformation",
  shortName: "Digital Transformation",
  tagline: "Modern systems, without disrupting the business.",
  summary:
    "Process digitization, workflow modernization, business systems integration, and data strategy for organizations that need to operate differently, not just buy new software.",
  intro: [
    "Digital transformation is often treated as a technology programme. It is really an operating change: work moves from paper, email, and spreadsheets into systems that are faster, more visible, and easier to control. The technology matters, but adoption and process design matter more.",
    "We start with the work, not the tool. We map the process, define the target state, and then select or build the technology that fits. Where existing systems can be improved rather than replaced, we say so.",
    "Engagements are scoped around a defined process or operating outcome, with measures agreed before work begins.",
  ],
  highlights: [
    "Process digitization and automation",
    "Workflow modernization",
    "Business systems integration",
    "Data strategy and reporting",
    "Change adoption and training",
    "Measured operating outcomes",
  ],
  icon: "Layers",
  approach: [
    {
      title: "Map",
      body: "Understand the current process, the data, the handoffs, and the friction that matters.",
    },
    {
      title: "Modernize",
      body: "Design and implement the target workflow, integrating systems and automating the repeatable work.",
    },
    {
      title: "Measure",
      body: "Track adoption and operating outcomes, then refine the solution with the people using it.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "process-digitization",
      title: "Process Digitization",
      shortTitle: "Digitization",
      summary:
        "Moving paper, email, and spreadsheet processes into controlled digital workflows.",
      intro:
        "Many critical processes still run on email and spreadsheets. They work until volume, turnover, or audit pressure exposes the risk. We digitize the process without over-engineering it.",
      challenges: [
        {
          title: "Knowledge held in inboxes",
          body: "Status, approvals, and exceptions live in individual mailboxes rather than a shared system.",
        },
        {
          title: "Manual re-entry",
          body: "The same information is typed into multiple systems, creating errors and delay.",
        },
        {
          title: "No audit trail",
          body: "Nobody can reconstruct who approved what, when, or on what basis.",
        },
      ],
      capabilities: [
        {
          title: "Process and data mapping",
          body: "Current steps, forms, data, roles, and exceptions documented.",
        },
        {
          title: "Target workflow design",
          body: "A simplified digital process with clear ownership and controls.",
        },
        {
          title: "Forms and workflow build",
          body: "Digital forms, routing, approvals, and notifications.",
        },
        {
          title: "Adoption and handover",
          body: "Training, documentation, and support for the team running the process.",
        },
      ],
      related: [
        "workflow-modernization",
        "power-automate",
        "business-systems-integration",
      ],
      icon: "FileCheck2",
    },
    {
      slug: "workflow-modernization",
      title: "Workflow Modernization",
      shortTitle: "Workflow",
      summary:
        "Rebuilding workflows that have become slow, manual, or dependent on individuals.",
      intro:
        "A workflow that once worked can become a bottleneck as the business grows. We redesign the flow, remove unnecessary approvals, and automate the repeatable steps.",
      challenges: [
        {
          title: "Approval layers that add no value",
          body: "Steps accumulate over time and are rarely removed, even when the risk they addressed has changed.",
        },
        {
          title: "Handoffs with no owner",
          body: "Work sits between teams because nobody is accountable for the transition.",
        },
        {
          title: "Exceptions managed manually",
          body: "Edge cases consume disproportionate time and are invisible to management.",
        },
      ],
      capabilities: [
        {
          title: "Workflow diagnostic",
          body: "Cycle time, handoffs, approvals, exceptions, and rework measured.",
        },
        {
          title: "Target-state design",
          body: "Simplified flow with clear roles and decision points.",
        },
        {
          title: "Automation design",
          body: "Rules, routing, notifications, and integration points.",
        },
        {
          title: "Pilot and rollout",
          body: "Controlled pilot, measurement, refinement, and full adoption.",
        },
      ],
      related: [
        "process-digitization",
        "power-automate",
        "process-improvement",
      ],
      icon: "Cog",
    },
    {
      slug: "business-systems-integration",
      title: "Business Systems Integration",
      shortTitle: "Integration",
      summary:
        "Making the systems that run the business share information reliably.",
      intro:
        "When systems do not talk to each other, people become the integration layer. We design and implement reliable data flows between the applications the business depends on.",
      challenges: [
        {
          title: "Duplicate and inconsistent data",
          body: "The same customer, product, or order exists in multiple systems with different values.",
        },
        {
          title: "Fragile point-to-point connections",
          body: "Integrations built for one project break when a system changes.",
        },
        {
          title: "Manual reconciliation",
          body: "Teams spend time comparing exports instead of acting on the information.",
        },
      ],
      capabilities: [
        {
          title: "Integration assessment",
          body: "Systems, data entities, flows, and ownership mapped.",
        },
        {
          title: "Integration architecture",
          body: "APIs, middleware, and data contracts designed for maintainability.",
        },
        {
          title: "Implementation",
          body: "Build, test, monitor, and document the integrations.",
        },
        {
          title: "Data quality controls",
          body: "Validation, reconciliation, and exception handling.",
        },
      ],
      related: [
        "enterprise-architecture",
        "data-strategy",
        "api-integrations",
      ],
      icon: "Cable",
    },
    {
      slug: "data-strategy",
      title: "Data Strategy",
      shortTitle: "Data Strategy",
      summary:
        "A practical plan for the data a business needs to run and decide.",
      intro:
        "Most organizations have more data than they can use and less than they need. A data strategy defines the questions that matter, the data required to answer them, and the ownership and quality needed to trust the result.",
      challenges: [
        {
          title: "Reporting without decisions",
          body: "Dashboards multiply while the decisions they are meant to support remain unclear.",
        },
        {
          title: "Unclear data ownership",
          body: "Nobody is accountable for the quality of the data a report depends on.",
        },
        {
          title: "Definitions disagree",
          body: "Different teams use different definitions for the same metric.",
        },
      ],
      capabilities: [
        {
          title: "Decision and metric definition",
          body: "The questions, measures, and definitions the business needs.",
        },
        {
          title: "Data inventory and ownership",
          body: "Sources, flows, quality, and accountable owners.",
        },
        {
          title: "Reporting and analytics design",
          body: "A layered reporting model from operational to executive.",
        },
        {
          title: "Data governance",
          body: "Standards, quality controls, and stewardship.",
        },
      ],
      related: [
        "business-systems-integration",
        "power-bi",
        "enterprise-architecture",
      ],
      icon: "Database",
    },
  ],
});

/* ============================================================================
   SERVICE AREA 05 — BUSINESS APPLICATIONS
   ==========================================================================*/

const BUSINESS_APPLICATIONS = makeCategory({
  slug: "business-applications",
  code: "05",
  name: "Business Applications",
  shortName: "Business Applications",
  tagline: "Microsoft business applications, built around how you work.",
  summary:
    "Power Platform, Power Apps, Power Automate, Power BI, Microsoft 365, CRM, ERP, and workflow automation delivered around the client's operating model.",
  intro: [
    "Business applications should fit the work, not force the work to fit the software. We design and build applications on the Microsoft platform and around the client's existing systems, with adoption and maintainability treated as part of the deliverable.",
    "Our work ranges from a single Power App that replaces a spreadsheet to a multi-system workflow with reporting and governance. We are explicit about what should be configured, what should be built, and what should be left alone.",
    "Engagements are scoped around a process, a reporting need, or a defined application outcome.",
  ],
  highlights: [
    "Microsoft Power Platform",
    "Power Apps and Power Automate",
    "Power BI reporting",
    "Microsoft 365 solutions",
    "CRM and ERP advisory",
    "Workflow automation",
  ],
  icon: "LayoutGrid",
  approach: [
    {
      title: "Discover",
      body: "Understand the process, the users, the data, and the constraints before choosing a tool.",
    },
    {
      title: "Build",
      body: "Configure or build the application in short cycles, with user testing throughout.",
    },
    {
      title: "Adopt",
      body: "Train users, document the solution, and hand over ownership with support in place.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "power-platform",
      title: "Microsoft Power Platform",
      shortTitle: "Power Platform",
      summary:
        "A governed Power Platform foundation for apps, automation, and reporting.",
      intro:
        "Power Platform can solve real operating problems quickly, but unmanaged adoption creates sprawl. We help organizations build a foundation that supports speed without losing control.",
      challenges: [
        {
          title: "Unmanaged app sprawl",
          body: "Individual makers build useful tools that nobody can support, secure, or retire.",
        },
        {
          title: "Weak governance",
          body: "Environment, access, and data policies are undefined, creating risk as adoption grows.",
        },
        {
          title: "Skills concentrated in one person",
          body: "The value depends on a single maker who may leave.",
        },
      ],
      capabilities: [
        {
          title: "Platform assessment",
          body: "Current adoption, environments, licensing, and governance gaps.",
        },
        {
          title: "Governance model",
          body: "Environments, access, data policies, and application lifecycle.",
        },
        {
          title: "Centre of excellence",
          body: "Standards, reusable components, and support for makers.",
        },
        {
          title: "Adoption roadmap",
          body: "Prioritized use cases and a plan to scale safely.",
        },
      ],
      related: [
        "power-apps",
        "power-automate",
        "power-bi",
      ],
      icon: "Blocks",
    },
    {
      slug: "power-apps",
      title: "Power Apps",
      shortTitle: "Power Apps",
      summary:
        "Business applications that replace spreadsheets and manual processes.",
      intro:
        "A well-built Power App can remove a spreadsheet, a paper form, or a chain of emails in weeks. We build apps that are simple for users, supportable by the business, and connected to the data that matters.",
      challenges: [
        {
          title: "Spreadsheet dependency",
          body: "Critical processes run on files that are versioned by email and owned by nobody.",
        },
        {
          title: "Poor user adoption",
          body: "Apps built without user involvement add work instead of removing it.",
        },
        {
          title: "No support model",
          body: "The app works at launch but has no owner, documentation, or change process.",
        },
      ],
      capabilities: [
        {
          title: "App scoping",
          body: "Users, process, data, and success measures defined.",
        },
        {
          title: "UX and process design",
          body: "Simple screens and flows designed around the actual work.",
        },
        {
          title: "Build and integrate",
          body: "Canvas or model-driven apps connected to Dataverse, Microsoft 365, or existing systems.",
        },
        {
          title: "Handover",
          body: "Documentation, training, and a support model.",
        },
      ],
      related: [
        "power-platform",
        "power-automate",
        "process-digitization",
      ],
      icon: "AppWindow",
    },
    {
      slug: "power-automate",
      title: "Power Automate",
      shortTitle: "Power Automate",
      summary:
        "Automation for the repetitive work that consumes time across teams.",
      intro:
        "Automation is most valuable when it removes a specific, measurable burden. We identify the right candidates, automate them reliably, and build in the monitoring needed to trust them.",
      challenges: [
        {
          title: "Automating a broken process",
          body: "Automation makes a bad process faster and harder to change.",
        },
        {
          title: "Flows nobody monitors",
          body: "Automations fail silently, leaving work incomplete and users unaware.",
        },
        {
          title: "Credentials and connectors",
          body: "Personal credentials and unmanaged connectors create security and continuity risk.",
        },
      ],
      capabilities: [
        {
          title: "Automation assessment",
          body: "Candidate processes ranked by volume, effort, risk, and value.",
        },
        {
          title: "Flow design",
          body: "Triggers, actions, approvals, exceptions, and integration points.",
        },
        {
          title: "Build and test",
          body: "Reliable flows with error handling and monitoring.",
        },
        {
          title: "Operate and improve",
          body: "Ownership, alerts, documentation, and iteration.",
        },
      ],
      related: [
        "workflow-automation",
        "power-apps",
        "process-improvement",
      ],
      icon: "Zap",
    },
    {
      slug: "power-bi",
      title: "Power BI",
      shortTitle: "Power BI",
      summary:
        "Reporting that answers the questions the business actually asks.",
      intro:
        "A report is only useful if it supports a decision. We design Power BI solutions around defined questions, trusted data, and a clear reporting rhythm.",
      challenges: [
        {
          title: "Dashboards without decisions",
          body: "Reports display data but do not tell users what to do or where to look.",
        },
        {
          title: "Untrusted numbers",
          body: "Different reports show different values, so users revert to spreadsheets.",
        },
        {
          title: "Slow reports",
          body: "Poor data models and unnecessary refresh loads make reporting painful.",
        },
      ],
      capabilities: [
        {
          title: "Reporting requirements",
          body: "Decisions, metrics, audiences, and cadence defined.",
        },
        {
          title: "Data model design",
          body: "A maintainable model with clear definitions and refresh strategy.",
        },
        {
          title: "Report and dashboard build",
          body: "Clear visuals, drill paths, and mobile access.",
        },
        {
          title: "Governance and adoption",
          body: "Workspaces, access, certification, and user training.",
        },
      ],
      related: [
        "data-strategy",
        "power-platform",
        "business-systems-integration",
      ],
      icon: "BarChart3",
    },
    {
      slug: "microsoft-365",
      title: "Microsoft 365 Solutions",
      shortTitle: "Microsoft 365",
      summary:
        "Getting more from the Microsoft tools the business already owns.",
      intro:
        "Most organizations use a fraction of the capability they already pay for. We help teams adopt Microsoft 365 in ways that improve collaboration, control, and information management.",
      challenges: [
        {
          title: "Files and permissions sprawl",
          body: "Sites, teams, and shared drives grow without a clear information architecture.",
        },
        {
          title: "Collaboration without governance",
          body: "Teams adopt tools quickly, creating duplication and retention risk.",
        },
        {
          title: "Underused capability",
          body: "Licensed features are ignored because users were never shown how they fit the work.",
        },
      ],
      capabilities: [
        {
          title: "Microsoft 365 assessment",
          body: "Current usage, licensing, information architecture, and gaps.",
        },
        {
          title: "Collaboration design",
          body: "Teams, SharePoint, and OneDrive structured around the work.",
        },
        {
          title: "Information governance",
          body: "Permissions, retention, and lifecycle policies.",
        },
        {
          title: "Adoption programme",
          body: "Training, champions, and usage measures.",
        },
      ],
      related: [
        "power-platform",
        "workflow-automation",
        "governance-support",
      ],
      icon: "Users",
    },
    {
      slug: "crm-advisory",
      title: "CRM Advisory",
      shortTitle: "CRM",
      summary:
        "CRM design and selection around the sales and service process, not the software demo.",
      intro:
        "A CRM fails when it is configured around a vendor's idea of sales rather than the way the company actually wins and serves customers. We help define the process first, then select and configure the system.",
      challenges: [
        {
          title: "CRM as a data-entry tax",
          body: "Sales teams avoid the system because it does not help them do their work.",
        },
        {
          title: "No single customer view",
          body: "Contacts, opportunities, and service history are fragmented across tools.",
        },
        {
          title: "Reporting nobody trusts",
          body: "Pipeline and activity reports do not reflect reality, so decisions ignore them.",
        },
      ],
      capabilities: [
        {
          title: "Sales and service process design",
          body: "Stages, roles, data, and handoffs defined before configuration.",
        },
        {
          title: "CRM selection",
          body: "Requirements, options, and fit assessment.",
        },
        {
          title: "Configuration and integration",
          body: "Pipeline, activity, service, and reporting configured around the process.",
        },
        {
          title: "Adoption",
          body: "Training, data migration, and usage measures.",
        },
      ],
      related: [
        "erp-advisory",
        "business-systems-integration",
        "power-bi",
      ],
      icon: "Contact",
    },
    {
      slug: "erp-advisory",
      title: "ERP Advisory",
      shortTitle: "ERP",
      summary:
        "Independent help choosing and implementing the system that runs the core business.",
      intro:
        "ERP decisions are expensive and hard to reverse. We help clients define requirements, assess options, and manage implementation without relying on the vendor's account of what is possible.",
      challenges: [
        {
          title: "Requirements written around a demo",
          body: "The shortlist is shaped by what vendors show, not by the operating model the business needs.",
        },
        {
          title: "Underestimated process change",
          body: "ERP projects fail on process design, data quality, and adoption more often than on software.",
        },
        {
          title: "Implementation without client ownership",
          body: "The integrator owns the project while the business disengages from decisions.",
        },
      ],
      capabilities: [
        {
          title: "Requirements definition",
          body: "Core processes, data, controls, and integration needs.",
        },
        {
          title: "Selection support",
          body: "Vendor assessment, fit-gap, and total cost comparison.",
        },
        {
          title: "Implementation assurance",
          body: "Client-side governance, decision log, and risk management.",
        },
        {
          title: "Readiness and adoption",
          body: "Data preparation, process change, training, and cutover planning.",
        },
      ],
      related: [
        "crm-advisory",
        "business-systems-integration",
        "change-management",
      ],
      icon: "Boxes",
    },
    {
      slug: "workflow-automation",
      title: "Workflow Automation",
      shortTitle: "Automation",
      summary:
        "End-to-end automation of the processes that cross teams and systems.",
      intro:
        "The highest-value automation usually spans departments and systems, not a single task. We design the end-to-end flow, automate the repeatable steps, and keep humans in the decisions that need judgment.",
      challenges: [
        {
          title: "Task automation without process change",
          body: "Automating individual steps leaves the handoffs and exceptions manual.",
        },
        {
          title: "Unclear decision rules",
          body: "Exceptions are handled by experience that has never been written down.",
        },
        {
          title: "No monitoring",
          body: "Automations fail quietly and the business finds out from a customer.",
        },
      ],
      capabilities: [
        {
          title: "End-to-end process design",
          body: "Steps, roles, systems, decisions, and exceptions mapped.",
        },
        {
          title: "Automation architecture",
          body: "Triggers, integrations, human approvals, and error handling.",
        },
        {
          title: "Build and test",
          body: "Automation delivered in increments with realistic testing.",
        },
        {
          title: "Monitoring and ownership",
          body: "Alerts, dashboards, documentation, and a support model.",
        },
      ],
      related: [
        "power-automate",
        "process-digitization",
        "business-systems-integration",
      ],
      icon: "ListChecks",
    },
  ],
});

/* ============================================================================
   SERVICE AREA 06 — CUSTOM SOFTWARE DEVELOPMENT
   ==========================================================================*/

const SOFTWARE_DEVELOPMENT = makeCategory({
  slug: "software-development",
  code: "06",
  name: "Custom Software Development",
  shortName: "Software Development",
  tagline: "Software that fits the business, not the other way around.",
  summary:
    "Custom web applications, customer portals, enterprise systems, mobile applications, API integrations, and SaaS platforms built around a defined operating need.",
  intro: [
    "Custom software makes sense when the business need is genuinely different from what packaged products support. We build applications that are maintainable, secure, and owned by the client. You shouldn't depend on one developer or a vendor you can't see into.",
    "Our work starts with the process and the users, not the technology. We define the smallest useful product, deliver it in increments, and keep the client involved in decisions throughout.",
    "Engagements are scoped around a product outcome, with a clear handover of code, documentation, and operational ownership.",
  ],
  highlights: [
    "Custom web applications",
    "Customer and partner portals",
    "Enterprise systems and internal tools",
    "Mobile applications",
    "API and system integrations",
    "SaaS platform development",
  ],
  icon: "Code2",
  approach: [
    {
      title: "Define",
      body: "Agree the users, the problem, the smallest useful product, and the success measures.",
    },
    {
      title: "Build",
      body: "Deliver in short increments with user testing, clear priorities, and visible progress.",
    },
    {
      title: "Launch",
      body: "Harden, document, hand over, and support the application in operation.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "custom-web-applications",
      title: "Custom Web Applications",
      shortTitle: "Web Applications",
      summary:
        "Web applications built around a specific operating process.",
      intro:
        "When a process is important and genuinely different, a custom web application can remove manual work and create a durable advantage. We build applications that are simple to use and maintainable over time.",
      challenges: [
        {
          title: "Buying a product for a unique process",
          body: "Teams contort their work to fit software that was designed for someone else.",
        },
        {
          title: "Applications that cannot be maintained",
          body: "Short-term builds create technical debt that makes the next change expensive.",
        },
        {
          title: "No ownership after launch",
          body: "The client is left without code, documentation, or a support path.",
        },
      ],
      capabilities: [
        {
          title: "Product definition",
          body: "Users, workflows, data, and the smallest useful scope.",
        },
        {
          title: "UX and interface design",
          body: "Clear screens and flows designed around the work.",
        },
        {
          title: "Full-stack development",
          body: "Secure, tested, and documented application code.",
        },
        {
          title: "Launch and handover",
          body: "Deployment, monitoring, documentation, and support.",
        },
      ],
      related: [
        "customer-portals",
        "api-integrations",
        "saas-platforms",
      ],
      icon: "Braces",
    },
    {
      slug: "customer-portals",
      title: "Customer Portals",
      shortTitle: "Customer Portals",
      summary:
        "Secure self-service portals for customers, partners, and suppliers.",
      intro:
        "A good portal reduces routine contact and gives customers a clearer view of their relationship with the business. We design portals around the tasks users actually need to complete.",
      challenges: [
        {
          title: "Portals that duplicate email",
          body: "Users still call or email because the portal does not cover the real tasks.",
        },
        {
          title: "Poor access control",
          body: "Sensitive information is exposed because roles and permissions were an afterthought.",
        },
        {
          title: "Low adoption",
          body: "The portal is launched without onboarding, communication, or feedback loops.",
        },
      ],
      capabilities: [
        {
          title: "User and task research",
          body: "The jobs customers and partners need to complete.",
        },
        {
          title: "Portal experience design",
          body: "Navigation, self-service, status, and communication flows.",
        },
        {
          title: "Secure development",
          body: "Authentication, roles, permissions, and data protection.",
        },
        {
          title: "Adoption and support",
          body: "Onboarding, communication, analytics, and iteration.",
        },
      ],
      related: [
        "custom-web-applications",
        "api-integrations",
        "microsoft-365",
      ],
      icon: "MonitorSmartphone",
    },
    {
      slug: "enterprise-systems",
      title: "Enterprise Systems",
      shortTitle: "Enterprise Systems",
      summary:
        "Internal systems that replace disconnected tools and manual controls.",
      intro:
        "As companies grow, the tools that once worked become a set of disconnected systems held together by spreadsheets and experience. We build internal systems that give teams one reliable way to run the work.",
      challenges: [
        {
          title: "Disconnected tools",
          body: "Data is re-entered between systems and reconciled manually.",
        },
        {
          title: "Controls that depend on memory",
          body: "Approvals and checks are followed because people remember, not because the system enforces them.",
        },
        {
          title: "Reporting by export",
          body: "Management reporting depends on manual extraction and spreadsheet assembly.",
        },
      ],
      capabilities: [
        {
          title: "Systems assessment",
          body: "Current tools, data, roles, and gaps mapped.",
        },
        {
          title: "Target system design",
          body: "Modules, workflows, permissions, and integrations.",
        },
        {
          title: "Build and migrate",
          body: "Application development, data migration, and testing.",
        },
        {
          title: "Operate and improve",
          body: "Monitoring, support, documentation, and a change process.",
        },
      ],
      related: [
        "custom-web-applications",
        "business-systems-integration",
        "erp-advisory",
      ],
      icon: "Building",
    },
    {
      slug: "mobile-applications",
      title: "Mobile Applications",
      shortTitle: "Mobile",
      summary:
        "Mobile tools for field, operational, and customer-facing work.",
      intro:
        "Mobile work has different constraints: intermittent connectivity, small screens, and users who need an answer quickly. We build mobile applications around those realities.",
      challenges: [
        {
          title: "Desktop workflows forced onto mobile",
          body: "Screens and processes designed for a desk do not work in the field.",
        },
        {
          title: "Connectivity assumptions",
          body: "Applications fail when the user is offline or on a weak connection.",
        },
        {
          title: "Distribution and updates",
          body: "Deployment and version management are planned too late.",
        },
      ],
      capabilities: [
        {
          title: "Field research",
          body: "Observe the actual context, tasks, and constraints.",
        },
        {
          title: "Mobile experience design",
          body: "Task-focused screens and flows.",
        },
        {
          title: "Offline and sync design",
          body: "Local storage, conflict handling, and sync strategy.",
        },
        {
          title: "Release management",
          body: "Store deployment, updates, analytics, and support.",
        },
      ],
      related: [
        "custom-web-applications",
        "customer-portals",
        "api-integrations",
      ],
      icon: "Smartphone",
    },
    {
      slug: "api-integrations",
      title: "API Integrations",
      shortTitle: "API Integrations",
      summary:
        "Reliable connections between the systems the business depends on.",
      intro:
        "APIs are the connective tissue of modern operations. We design and build integrations that are secure, observable, and maintainable as the systems around them change.",
      challenges: [
        {
          title: "Undocumented dependencies",
          body: "Integrations exist without contracts, owners, or monitoring.",
        },
        {
          title: "Breaking changes",
          body: "A vendor update takes down a process nobody knew depended on the integration.",
        },
        {
          title: "Security gaps",
          body: "Keys, tokens, and access are managed inconsistently across integrations.",
        },
      ],
      capabilities: [
        {
          title: "Integration design",
          body: "Contracts, data models, authentication, and error handling.",
        },
        {
          title: "API development",
          body: "Secure, documented, and tested endpoints.",
        },
        {
          title: "Monitoring and alerting",
          body: "Visibility into failures, latency, and data quality.",
        },
        {
          title: "Documentation and ownership",
          body: "Contracts, runbooks, and support responsibilities.",
        },
      ],
      related: [
        "business-systems-integration",
        "enterprise-architecture",
        "custom-web-applications",
      ],
      icon: "Webhook",
    },
    {
      slug: "saas-platforms",
      title: "SaaS Platforms",
      shortTitle: "SaaS Platforms",
      summary:
        "Multi-tenant products built for a defined market and operating model.",
      intro:
        "Building a SaaS product is a business decision as much as a technical one. We help define the product, the tenancy and pricing model, and the platform architecture needed to operate it reliably.",
      challenges: [
        {
          title: "Product scope without a market",
          body: "Features accumulate before the target customer and willingness to pay are understood.",
        },
        {
          title: "Architecture that cannot scale economically",
          body: "Early technical choices create cost and reliability problems as tenants grow.",
        },
        {
          title: "Operations treated as an afterthought",
          body: "Billing, onboarding, support, and service levels are designed after launch.",
        },
      ],
      capabilities: [
        {
          title: "Product and market definition",
          body: "Target customer, problem, value proposition, and scope.",
        },
        {
          title: "Platform architecture",
          body: "Tenancy, identity, data isolation, and scalability.",
        },
        {
          title: "Product engineering",
          body: "Incremental delivery of the product and supporting operations.",
        },
        {
          title: "Launch and operations",
          body: "Billing, onboarding, monitoring, support, and service levels.",
        },
      ],
      related: [
        "custom-web-applications",
        "api-integrations",
        "cloud-strategy",
      ],
      icon: "Package",
    },
  ],
});

/* ============================================================================
   SERVICE AREA 07 — WEBSITES & DIGITAL PRESENCE
   ==========================================================================*/

const WEBSITES = makeCategory({
  slug: "websites",
  code: "07",
  name: "Websites & Digital Presence",
  shortName: "Websites",
  tagline: "A website that explains the business and earns the enquiry.",
  summary:
    "Corporate websites, landing pages, e-commerce storefronts, content and search foundations, and ongoing website care, built to explain the business clearly and turn visitors into enquiries.",
  intro: [
    "A company's website is often the first conversation a customer, partner, or lender has with it. We build websites that say plainly what the business does, who it serves, and how to take the next step, and that load quickly on any device.",
    "The work starts with the message and the audience, not the template. We agree the pages, the content each one needs, and the action each visitor should take before design begins, then build on a stack the client owns.",
    "Engagements are scoped around a defined site and launch, with a clear handover of the code, the content, the domain, and the accounts.",
  ],
  highlights: [
    "Corporate and company websites",
    "Landing pages and campaign sites",
    "E-commerce storefronts",
    "Content structure and search foundations",
    "Enquiry forms and integrations",
    "Website care and support",
  ],
  icon: "Globe2",
  approach: [
    {
      title: "Plan",
      body: "Agree the audience, the message, the page structure, and the action each page should drive.",
    },
    {
      title: "Build",
      body: "Design and develop in reviewable stages, with content placed early so nothing is designed around placeholder text.",
    },
    {
      title: "Launch",
      body: "Test, connect the domain, hand over the accounts and documentation, and support the site in operation.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "corporate-websites",
      title: "Corporate Websites",
      shortTitle: "Corporate Websites",
      summary:
        "A clear, fast company website that explains what the business does and how to engage it.",
      intro:
        "A corporate website has one job: help the right visitor understand the business quickly and take the next step. We plan the structure around the questions customers actually ask, write or edit the copy with you, and build a responsive, accessible site you own.",
      challenges: [
        {
          title: "A site that does not say what the company does",
          body: "Visitors leave because the offer, the audience, and the next step are buried or unclear.",
        },
        {
          title: "Slow and hard to read on a phone",
          body: "Most first visits happen on mobile, where heavy pages and small text lose the reader.",
        },
        {
          title: "Locked into a builder or a single developer",
          body: "The business cannot change its own site or move it without starting again.",
        },
      ],
      capabilities: [
        {
          title: "Structure and messaging",
          body: "Page plan, navigation, and the key message for each audience.",
        },
        {
          title: "Responsive design",
          body: "Layouts that read well on phones, tablets, and desktops, with accessible contrast and type.",
        },
        {
          title: "Development and launch",
          body: "A fast, secure build, domain connection, and pre-launch testing.",
        },
        {
          title: "Ownership and handover",
          body: "Code, content, domain, and accounts transferred to the client.",
        },
      ],
      related: ["landing-pages", "content-and-seo", "website-care"],
      icon: "PanelTop",
    },
    {
      slug: "landing-pages",
      title: "Landing Pages & Campaign Sites",
      shortTitle: "Landing Pages",
      summary:
        "Focused pages for a product, a launch, or a campaign, built to drive one action.",
      intro:
        "A landing page works when it has one audience, one message, and one action. We build focused pages for product launches, campaigns, and new offers, connected to the forms and tools that capture the response.",
      challenges: [
        {
          title: "Campaign traffic sent to the home page",
          body: "Paid or earned attention lands on a general page and drifts away.",
        },
        {
          title: "Too many messages on one page",
          body: "Competing offers and links dilute the action the campaign needs.",
        },
        {
          title: "No way to tell what worked",
          body: "Responses are not captured or attributed, so the next campaign starts blind.",
        },
      ],
      capabilities: [
        {
          title: "Offer and message",
          body: "A single, clear proposition for a defined audience.",
        },
        {
          title: "Page design and build",
          body: "Fast, mobile-first pages with one primary call to action.",
        },
        {
          title: "Forms and capture",
          body: "Enquiry, sign-up, or booking forms connected to where the team works.",
        },
        {
          title: "Measurement",
          body: "Privacy-conscious tracking of visits and responses, agreed in advance.",
        },
      ],
      related: ["corporate-websites", "ecommerce-storefronts", "content-and-seo"],
      icon: "MousePointerClick",
    },
    {
      slug: "ecommerce-storefronts",
      title: "E-commerce Storefronts",
      shortTitle: "E-commerce",
      summary:
        "Online stores with product catalogues, checkout, and order handling for growing sellers.",
      intro:
        "Selling online needs more than a product page. We set up storefronts with a clear catalogue, a checkout customers trust, and an order flow the team can actually run, on a platform sized to the business.",
      challenges: [
        {
          title: "Orders taken by message and spreadsheet",
          body: "Sales arrive through chat and social pages, and details are copied by hand.",
        },
        {
          title: "A checkout customers abandon",
          body: "Unclear prices, shipping, or payment steps lose the sale at the last moment.",
        },
        {
          title: "The wrong platform for the stage",
          body: "Too little for growth, or too much cost and complexity for the volume.",
        },
      ],
      capabilities: [
        {
          title: "Platform selection",
          body: "A recommendation sized to catalogue, volume, and budget.",
        },
        {
          title: "Catalogue and checkout",
          body: "Product structure, pricing, shipping rules, and payment setup.",
        },
        {
          title: "Order handling",
          body: "Notifications, fulfilment steps, and connections to existing tools.",
        },
        {
          title: "Launch support",
          body: "Testing, go-live, and a handover the team can run day to day.",
        },
      ],
      related: ["corporate-websites", "website-care", "workflow-automation"],
      icon: "Store",
    },
    {
      slug: "content-and-seo",
      title: "Website Content & Search Foundations",
      shortTitle: "Content & SEO",
      summary:
        "Clear page content and the technical groundwork that helps search engines understand the site.",
      intro:
        "Good content and sound technical foundations make a site easier to find and easier to trust. We structure and edit page content, set up titles, descriptions, sitemaps, and structured data, and fix the technical issues that hold a site back.",
      challenges: [
        {
          title: "Pages that say little",
          body: "Thin or generic copy gives visitors and search engines nothing to go on.",
        },
        {
          title: "Technical problems nobody sees",
          body: "Missing titles, broken links, and slow pages quietly limit how a site performs.",
        },
        {
          title: "Promises of rankings",
          body: "Guaranteed positions are not something any honest provider can offer.",
        },
      ],
      capabilities: [
        {
          title: "Content structure",
          body: "Page hierarchy, headings, and copy written for the reader first.",
        },
        {
          title: "Technical foundations",
          body: "Titles, descriptions, sitemaps, structured data, and link previews.",
        },
        {
          title: "Performance and accessibility",
          body: "Faster pages and accessible markup that help every visitor.",
        },
        {
          title: "Clear reporting",
          body: "What was changed and what to watch, without ranking guarantees.",
        },
      ],
      related: ["corporate-websites", "landing-pages", "website-care"],
      icon: "PenLine",
    },
    {
      slug: "website-care",
      title: "Website Care & Support",
      shortTitle: "Website Care",
      summary:
        "Updates, monitoring, fixes, and small improvements under an agreed support scope.",
      intro:
        "A website needs looking after once it is live. We keep sites updated, secure, and working, handle content changes and fixes, and agree larger improvements before work starts.",
      challenges: [
        {
          title: "Nobody owns the site after launch",
          body: "Updates are missed, forms break, and problems are found by customers first.",
        },
        {
          title: "Small changes take weeks",
          body: "Simple edits wait in a queue because there is no agreed way to request them.",
        },
        {
          title: "Costs that are hard to predict",
          body: "Ad hoc fixes are billed without a scope or an allowance.",
        },
      ],
      capabilities: [
        {
          title: "Updates and security",
          body: "Routine updates to the software the site depends on.",
        },
        {
          title: "Monitoring and fixes",
          body: "Checks on uptime and forms, and repair of reported faults.",
        },
        {
          title: "Content changes",
          body: "Edits and small additions within the agreed allowance.",
        },
        {
          title: "Planned improvements",
          body: "Larger changes estimated and agreed before work begins.",
        },
      ],
      related: ["corporate-websites", "content-and-seo", "ecommerce-storefronts"],
      icon: "LifeBuoy",
    },
  ],
});

/* ============================================================================
   SERVICE AREA 08 — AI & AUTOMATION
   ==========================================================================*/

const AI_AUTOMATION = makeCategory({
  slug: "ai-automation",
  code: "08",
  name: "AI & Automation",
  shortName: "AI & Automation",
  tagline: "Practical AI, tied to a measurable business outcome.",
  summary:
    "AI strategy, AI automation, AI-powered workflows, knowledge management, and intelligent business assistants delivered with clear governance and human oversight.",
  intro: [
    "AI is most useful when it is tied to a specific process and measured against a real outcome. We help organizations move past experimentation to practical deployments that reduce effort, improve consistency, and keep humans in control of consequential decisions.",
    "Our approach is deliberately conservative: define the use case, test the data and the risk, prototype with real users, and scale only when the result is measurable. We do not deploy AI to replace judgment where accountability cannot be delegated.",
    "Engagements are scoped around a use case, a workflow, or a defined productivity outcome, with governance and evaluation built in.",
  ],
  highlights: [
    "AI strategy and governance",
    "AI automation and workflow design",
    "Knowledge management systems",
    "Intelligent business assistants",
    "Data readiness and evaluation",
    "Human oversight and risk controls",
  ],
  icon: "Bot",
  approach: [
    {
      title: "Identify",
      body: "Select use cases with clear value, available data, and an acceptable risk profile.",
    },
    {
      title: "Prototype",
      body: "Build a small, evaluated prototype with real users and a defined success measure.",
    },
    {
      title: "Scale",
      body: "Harden, govern, integrate, and monitor the solution in production.",
    },
  ],
  delivery: DIRECT_DELIVERY,
  services: [
    {
      slug: "ai-strategy",
      title: "AI Strategy",
      shortTitle: "AI Strategy",
      summary:
        "A practical AI agenda tied to business priorities and risk tolerance.",
      intro:
        "AI strategy is not a list of tools. It is a set of choices about where AI can create value, what data and controls are required, and how the organization will govern it. We help leaders make those choices explicitly.",
      challenges: [
        {
          title: "Experimentation without a portfolio",
          body: "Pilots multiply without a view of value, overlap, or the path to production.",
        },
        {
          title: "Unclear risk appetite",
          body: "Leadership has not defined which decisions can be automated, assisted, or must remain human.",
        },
        {
          title: "Data not ready",
          body: "Use cases are selected before the underlying data quality and access are understood.",
        },
      ],
      capabilities: [
        {
          title: "Opportunity assessment",
          body: "Use cases ranked by value, feasibility, data readiness, and risk.",
        },
        {
          title: "AI governance",
          body: "Principles, decision rights, review, and acceptable-use policies.",
        },
        {
          title: "Data readiness",
          body: "Quality, access, privacy, and retention requirements for priority use cases.",
        },
        {
          title: "AI roadmap",
          body: "A sequenced portfolio from pilot to production.",
        },
      ],
      related: [
        "ai-automation",
        "data-strategy",
        "governance-support",
      ],
      icon: "Brain",
    },
    {
      slug: "ai-automation",
      title: "AI Automation",
      shortTitle: "AI Automation",
      summary:
        "Automating repetitive knowledge work with measurable quality controls.",
      intro:
        "AI can take on parts of knowledge work that are repetitive but not rule-based: summarization, classification, extraction, drafting, and routing. We automate those steps with evaluation and human review where it matters.",
      challenges: [
        {
          title: "Automation without evaluation",
          body: "Outputs are accepted without a test set, quality measure, or review process.",
        },
        {
          title: "Hidden error costs",
          body: "Small error rates become expensive when the process operates at volume.",
        },
        {
          title: "No human escalation",
          body: "Edge cases are handled by the model instead of being routed to a person.",
        },
      ],
      capabilities: [
        {
          title: "Use-case assessment",
          body: "Task volume, variability, error tolerance, and data availability.",
        },
        {
          title: "Workflow design",
          body: "Model steps, human review, escalation, and audit trail.",
        },
        {
          title: "Evaluation",
          body: "Test sets, quality measures, and acceptance criteria.",
        },
        {
          title: "Deployment and monitoring",
          body: "Integration, logging, review, and continuous improvement.",
        },
      ],
      related: [
        "ai-workflows",
        "ai-strategy",
        "power-automate",
      ],
      icon: "Sparkles",
    },
    {
      slug: "ai-workflows",
      title: "AI-Powered Workflows",
      shortTitle: "AI Workflows",
      summary:
        "End-to-end workflows that combine AI, automation, and human decisions.",
      intro:
        "The highest-value AI deployments are usually workflows, not standalone models. We combine AI steps with deterministic automation and human approval so the process is faster without becoming less accountable.",
      challenges: [
        {
          title: "Model-centric design",
          body: "Teams start with a model and then look for a process, rather than starting with the work.",
        },
        {
          title: "Unclear accountability",
          body: "Nobody owns the outcome when an AI-assisted workflow produces an error.",
        },
        {
          title: "Integration complexity",
          body: "AI steps are added without connecting them to the systems where the work actually happens.",
        },
      ],
      capabilities: [
        {
          title: "Workflow mapping",
          body: "Steps, decisions, data, and handoffs across the process.",
        },
        {
          title: "AI and automation design",
          body: "Where to use AI, where to use rules, and where a human must decide.",
        },
        {
          title: "Integration and build",
          body: "Connecting models, systems, approvals, and audit trails.",
        },
        {
          title: "Governance and monitoring",
          body: "Quality measures, review, escalation, and change control.",
        },
      ],
      related: [
        "ai-automation",
        "workflow-automation",
        "ai-strategy",
      ],
      icon: "GitMerge",
    },
    {
      slug: "knowledge-management",
      title: "Knowledge Management Systems",
      shortTitle: "Knowledge Management",
      summary:
        "Making organizational knowledge searchable, current, and usable.",
      intro:
        "Most organizations hold critical knowledge in documents, inboxes, and individual experience. AI can make that knowledge easier to find and use, but only with clear ownership, structure, and access controls.",
      challenges: [
        {
          title: "Content without ownership",
          body: "Documents accumulate without review dates, owners, or a single source of truth.",
        },
        {
          title: "Search that does not answer questions",
          body: "Keyword search returns documents rather than the answer a user needs.",
        },
        {
          title: "Access and confidentiality",
          body: "Knowledge tools expose information to people who should not see it.",
        },
      ],
      capabilities: [
        {
          title: "Knowledge audit",
          body: "Content sources, owners, quality, and access requirements.",
        },
        {
          title: "Information architecture",
          body: "Structure, taxonomy, and lifecycle for the knowledge base.",
        },
        {
          title: "Retrieval and assistant design",
          body: "Search, question answering, citations, and feedback.",
        },
        {
          title: "Governance",
          body: "Ownership, review, permissions, and retention.",
        },
      ],
      related: [
        "intelligent-assistants",
        "data-strategy",
        "microsoft-365",
      ],
      icon: "BookOpen",
    },
    {
      slug: "intelligent-assistants",
      title: "Intelligent Business Assistants",
      shortTitle: "Assistants",
      summary:
        "Assistants that help teams find information, draft work, and complete tasks.",
      intro:
        "An intelligent assistant is useful when it is embedded in the work and grounded in the organization's own information. We design assistants with clear scope, citations, and escalation to a person.",
      challenges: [
        {
          title: "Generic assistants with no context",
          body: "Off-the-shelf tools do not understand the organization's processes, terminology, or data.",
        },
        {
          title: "Unsupported answers",
          body: "Assistants produce confident responses without sources or a path to verification.",
        },
        {
          title: "No adoption plan",
          body: "Users try the tool once, do not trust it, and return to their old process.",
        },
      ],
      capabilities: [
        {
          title: "Assistant use-case definition",
          body: "Tasks, users, boundaries, and success measures.",
        },
        {
          title: "Knowledge grounding",
          body: "Approved sources, retrieval, citations, and access control.",
        },
        {
          title: "Interaction design",
          body: "Prompts, guardrails, escalation, and feedback.",
        },
        {
          title: "Pilot and adoption",
          body: "Evaluation, training, monitoring, and iteration.",
        },
      ],
      related: [
        "knowledge-management",
        "ai-workflows",
        "microsoft-365",
      ],
      icon: "MessageCircle",
    },
  ],
});

export const SERVICE_CATEGORIES: ServiceCategoryContent[] = [
  BUSINESS_CONSULTING,
  MANAGEMENT_CONSULTING,
  IT_CONSULTING,
  DIGITAL_TRANSFORMATION,
  BUSINESS_APPLICATIONS,
  SOFTWARE_DEVELOPMENT,
  WEBSITES,
  AI_AUTOMATION,
];

export function getCategory(slug: string): ServiceCategoryContent | undefined {
  return SERVICE_CATEGORIES.find((category) => category.slug === slug);
}

export function getService(
  categorySlug: string,
  serviceSlug: string,
): ServiceContent | undefined {
  return getCategory(categorySlug)?.services.find(
    (service) => service.slug === serviceSlug,
  );
}

export function findService(
  serviceSlug: string,
): { category: ServiceCategoryContent; service: ServiceContent } | undefined {
  for (const category of SERVICE_CATEGORIES) {
    const service = category.services.find((item) => item.slug === serviceSlug);
    if (service) return { category, service };
  }
  return undefined;
}

/** All legalReview-flagged slugs - surfaced to the build report / founder. */
export const LEGAL_REVIEW_REQUIRED: string[] = SERVICE_CATEGORIES.flatMap(
  (category) =>
    category.services
      .filter((service) => service.legalReview)
      .map((service) => `${category.slug}/${service.slug}`),
);
