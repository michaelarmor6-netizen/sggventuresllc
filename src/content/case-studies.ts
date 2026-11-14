/**
 * Representative case studies.
 *
 * These are anonymized engagement patterns, not client testimonials and not
 * claims about specific named organizations. No financial results, client
 * names, or attributable outcomes are invented. Replace or supplement with
 * consented material before publishing real case studies.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  serviceAreas: string[];
  summary: string;
  context: string[];
  approach: { title: string; body: string }[];
  outcome: string[];
  confidentiality: string;
};

export const CASE_STUDY_DISCLOSURE =
  "These case studies describe representative engagement patterns. Client identities, specific figures, and attributable results are omitted. They are not testimonials, and they do not represent a promise of a particular outcome.";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "market-entry-assessment-regional-manufacturer",
    title: "Market entry assessment for a regional manufacturer",
    sector: "Industrial manufacturing",
    serviceAreas: ["business-consulting", "management-consulting"],
    summary:
      "A mid-sized manufacturer wanted to enter an adjacent regional market but had no shared view of demand, channel structure, or the operating burden of serving it.",
    context: [
      "Leadership had received conflicting market estimates from two advisers and a distributor. Each used a different definition of the addressable segment, and none connected demand to the cost of serving it.",
      "The company had strong production capability but no local sales presence, no service model for the new region, and an unresolved question about whether to enter directly or through a partner.",
    ],
    approach: [
      {
        title: "Define the decision",
        body: "We framed the engagement around a single decision: whether to enter, and if so, through which route and at what staged commitment.",
      },
      {
        title: "Build a common fact base",
        body: "Demand signals, competitor positioning, pricing, channel economics, and the operating requirements were assembled into one model with explicit assumptions.",
      },
      {
        title: "Compare the options",
        body: "Direct entry, distributor partnership, acquisition, and a limited pilot were assessed against margin, cash, capability, and risk.",
      },
      {
        title: "Sequence the plan",
        body: "The recommended route was translated into a staged plan with decision gates, owners, budget, and measures of early traction.",
      },
    ],
    outcome: [
      "Leadership selected a partnership-led entry with a defined pilot period rather than committing to a full direct presence.",
      "The plan identified the service and support capabilities that had to exist before volume could scale.",
      "The board received a written case with assumptions and trade-offs stated plainly, which it used to approve a bounded first phase.",
    ],
    confidentiality:
      "Sector and engagement pattern are described; the client is not identified.",
  },
  {
    slug: "erp-selection-implementation-assurance",
    title: "ERP selection and implementation assurance",
    sector: "Distribution",
    serviceAreas: ["business-applications", "it-consulting", "management-consulting"],
    summary:
      "A distributor needed to replace an ageing ERP but had requirements shaped by vendor demonstrations rather than its own operating model.",
    context: [
      "The incumbent system was supported but increasingly difficult to change. Three vendors had presented, and the internal shortlist reflected the quality of the demonstrations more than the fit to the business.",
      "Previous technology projects had been led by the integrator, with limited client-side ownership of decisions and data quality.",
    ],
    approach: [
      {
        title: "Requirements definition",
        body: "Core processes, data, controls, integration needs, and reporting requirements were documented with the operating teams.",
      },
      {
        title: "Selection support",
        body: "Vendors were assessed against the same fit-gap criteria, with total cost and implementation risk compared alongside functionality.",
      },
      {
        title: "Client-side governance",
        body: "A decision log, risk register, and reporting cadence were established so the client retained ownership of the programme.",
      },
      {
        title: "Readiness and adoption",
        body: "Data preparation, process change, training, and cutover planning were treated as part of the programme rather than afterthoughts.",
      },
    ],
    outcome: [
      "The client selected a system on the basis of operating fit and total cost rather than demonstration quality.",
      "Implementation decisions were recorded and escalated through a client-owned governance routine.",
      "The business entered cutover with defined data ownership and a training plan for the teams affected.",
    ],
    confidentiality:
      "Sector and engagement pattern are described; the client is not identified.",
  },
  {
    slug: "workflow-digitization-multi-site-services",
    title: "Workflow digitization for a multi-site services company",
    sector: "Field services",
    serviceAreas: ["digital-transformation", "business-applications"],
    summary:
      "A multi-site services business ran scheduling, approvals, and job completion through email and spreadsheets, with no reliable view of status or exceptions.",
    context: [
      "Each site had developed its own workarounds. Job status lived in inboxes, approvals depended on individual memory, and management reporting was assembled manually each week.",
      "The company had Microsoft 365 but was using a fraction of its capability, and previous automation attempts had created unmonitored flows.",
    ],
    approach: [
      {
        title: "Map the current process",
        body: "We documented steps, handoffs, data, roles, and exceptions across sites, then quantified where delay and rework occurred.",
      },
      {
        title: "Design the target workflow",
        body: "The process was simplified before automation: unnecessary approvals were removed, ownership was assigned, and controls were made explicit.",
      },
      {
        title: "Build on the existing platform",
        body: "Digital forms, routing, approvals, and notifications were built with Power Platform and integrated with the existing Microsoft 365 environment.",
      },
      {
        title: "Pilot and embed",
        body: "The workflow was piloted at two sites, refined with users, then rolled out with training, documentation, and monitoring.",
      },
    ],
    outcome: [
      "Job status and approvals moved into a shared system with an auditable record.",
      "Site-level workarounds were replaced by one process with defined exceptions.",
      "Management reporting was produced from the workflow rather than assembled manually.",
    ],
    confidentiality:
      "Sector and engagement pattern are described; the client is not identified.",
  },
  {
    slug: "customer-portal-b2b-supplier",
    title: "Customer portal for a B2B supplier",
    sector: "Wholesale and distribution",
    serviceAreas: ["software-development", "digital-transformation"],
    summary:
      "A B2B supplier handled routine order status, document requests, and account questions through a small service team and a shared mailbox.",
    context: [
      "Customers could not see order status without contacting the service team, and the team spent much of its day answering the same questions.",
      "An earlier portal had low adoption because it covered only a subset of the tasks customers actually needed to complete.",
    ],
    approach: [
      {
        title: "User and task research",
        body: "We interviewed customers and service staff to identify the tasks that generated the most contact and the information customers needed.",
      },
      {
        title: "Portal experience design",
        body: "Navigation, self-service, status, documents, and communication flows were designed around those tasks.",
      },
      {
        title: "Secure development",
        body: "Authentication, roles, permissions, and data protection were designed alongside the application rather than added later.",
      },
      {
        title: "Adoption and support",
        body: "Onboarding, communication, analytics, and a support model were included in the launch plan.",
      },
    ],
    outcome: [
      "Routine status and document requests moved into a self-service channel.",
      "The service team gained a clearer view of customer activity and exceptions.",
      "The portal was launched with a defined owner, documentation, and a process for iteration.",
    ],
    confidentiality:
      "Sector and engagement pattern are described; the client is not identified.",
  },
  {
    slug: "ai-knowledge-assistant-professional-services",
    title: "AI-assisted knowledge assistant for a professional services firm",
    sector: "Professional services",
    serviceAreas: ["ai-automation", "digital-transformation", "business-applications"],
    summary:
      "A professional services firm wanted to use AI to make internal knowledge easier to find, but had no view of content ownership, access rules, or quality controls.",
    context: [
      "Guidance, templates, and precedent were spread across document libraries, inboxes, and individual experience. Search returned documents rather than answers.",
      "Leadership was interested in AI but had not defined which decisions could be assisted, which had to remain human, or how outputs would be evaluated.",
    ],
    approach: [
      {
        title: "Use-case and risk assessment",
        body: "Candidate use cases were ranked by value, data readiness, feasibility, and the consequences of an incorrect answer.",
      },
      {
        title: "Knowledge audit",
        body: "Content sources, owners, quality, review dates, and access requirements were mapped before any model work began.",
      },
      {
        title: "Prototype with evaluation",
        body: "A retrieval-based assistant was built over approved sources, with citations, access controls, and a defined test set.",
      },
      {
        title: "Governance and adoption",
        body: "Review responsibilities, escalation to a person, feedback, and monitoring were agreed before wider rollout.",
      },
    ],
    outcome: [
      "The firm established a governed knowledge base with named owners and review dates.",
      "The assistant was piloted with a defined user group and an evaluation routine rather than an open launch.",
      "Decisions that required professional judgment remained with people, with the assistant limited to retrieval and drafting support.",
    ],
    confidentiality:
      "Sector and engagement pattern are described; the client is not identified.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
