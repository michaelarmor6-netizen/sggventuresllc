/**
 * Corporate identity and trust content.
 *
 * Everything here is positioning and process description. It contains no
 * invented credentials, client names, testimonials, or performance metrics.
 */

export const MISSION =
  "To help organizations make better decisions and build the systems that make those decisions work. That means independent business judgment, backed by people who can actually deliver the technology.";

export const VISION =
  "To be the advisory and technology partner that growing organizations call when the next decision matters, and to be known for work that holds up after the engagement ends.";

export const CORE_VALUES: { title: string; body: string }[] = [
  {
    title: "Independence",
    body: "We are paid for the analysis and the delivery, not for a product, a transaction, or a referral. Recommendations include the option of doing nothing.",
  },
  {
    title: "Clarity",
    body: "Scope, roles, assumptions, and trade-offs are written down. A client should be able to explain what we are doing and why.",
  },
  {
    title: "Accountability",
    body: "Every engagement has a named lead. Decisions, dependencies, and open items are recorded rather than remembered.",
  },
  {
    title: "Discretion",
    body: "Client information is handled under the engagement terms and the safeguards appropriate to its sensitivity.",
  },
  {
    title: "Practicality",
    body: "A recommendation that cannot be operated is not finished. We design for the team that has to run it after we leave.",
  },
  {
    title: "Candour",
    body: "If a problem is outside our capability, we say so. If a licence or specialist is required, that work is performed by a qualified third party named in the engagement.",
  },
];

export const CORPORATE_DNA: { title: string; body: string }[] = [
  {
    title: "Advisory discipline",
    body: "Structured diagnosis, explicit options, and a written recommendation. The same standard applies to a strategy question and a software build.",
  },
  {
    title: "Technology fluency",
    body: "We understand how systems, data, and applications actually get built and run, which is rarely how the business case described them.",
  },
  {
    title: "Operating focus",
    body: "The measure of the work is what changes in the business: a decision made, a process improved, a system adopted, a risk reduced.",
  },
  {
    title: "Commercial realism",
    body: "Recommendations account for cost, capacity, cash, and the management attention required to execute them.",
  },
];

export const UNIQUE_VALUE_PROPOSITION =
  "One firm for the strategy and the system: independent business advice and technology delivery under a single accountable scope.";

export const DIFFERENTIATORS: { title: string; body: string }[] = [
  {
    title: "Strategy and execution on one file",
    body: "The recommendation and the operating change are designed together, so the plan does not stall at the handover to a technology team.",
  },
  {
    title: "Independent by design",
    body: "We do not earn commissions from software vendors, cloud providers, or transaction counterparties. The advice is the service.",
  },
  {
    title: "Written scope, named lead",
    body: "Every engagement states what is included, what is not, who leads the work, and how progress will be reported.",
  },
  {
    title: "Technology that fits the business",
    body: "We configure and build around the operating model, and we say when an existing system should be improved rather than replaced.",
  },
  {
    title: "Clear delivery boundaries",
    body: "Where legal, tax, accounting, securities, or regulated technology work is required, a qualified third party performs it and is named in the engagement.",
  },
  {
    title: "Built for the mid-market",
    body: "Our approach is sized for SMEs, growth-stage companies, private owners, and corporate teams that need senior attention without a large-firm structure.",
  },
];

export const TAGLINE_OPTIONS = [
  "Strategic Business. Intelligent Technology. Sustainable Growth.",
  "Advisory, Technology, and Growth Solutions.",
  "From Strategy to Execution.",
] as const;

/** Firm-wide methodology, referenced on /about and /company-profile. */
export const METHODOLOGY: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Understand",
    body: "Establish the facts, the decision, the constraints, and the people who will have to act on the outcome.",
  },
  {
    step: "02",
    title: "Define",
    body: "Agree the question, the scope, the success measures, and the delivery model in writing before work begins.",
  },
  {
    step: "03",
    title: "Deliver",
    body: "Work in defined stages with a named lead, scheduled checkpoints, and decisions documented as they are made.",
  },
  {
    step: "04",
    title: "Embed",
    body: "Transfer the deliverable, the documentation, and the ownership so the result survives after the engagement ends.",
  },
];

export const ENGAGEMENT_PROCESS: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Initial conversation",
    body: "A short discovery call to understand the situation, the timeline, and whether SGG Ventures is a sensible fit. No cost, no obligation.",
  },
  {
    step: "02",
    title: "Scope and proposal",
    body: "A written proposal covering the question, the work, the deliverables, the team, the fees, and what is explicitly out of scope.",
  },
  {
    step: "03",
    title: "Engagement",
    body: "Work begins against the agreed plan. Progress is reported at scheduled checkpoints, with decisions and dependencies recorded.",
  },
  {
    step: "04",
    title: "Handover",
    body: "Deliverables, documentation, and ownership are transferred. Ongoing support or a follow-on phase is agreed separately.",
  },
];

export type FaqItem = { question: string; answer: string; category: string };

export const FAQS: FaqItem[] = [
  {
    category: "The firm",
    question: "What kind of firm is SGG Ventures LLC?",
    answer:
      "SGG Ventures LLC is a strategic business advisory and technology consulting firm. We provide business and management consulting, IT consulting, digital transformation, business applications, custom software development, websites and digital presence, and AI and automation services.",
  },
  {
    category: "The firm",
    question:
      "The name includes 'Ventures'. Does the firm provide investment, brokerage, or fund management services?",
    answer:
      "No. SGG Ventures does not provide securities brokerage, investment management, or regulated financial advice, and does not present itself as a broker, dealer, placement agent, or licensed intermediary. Where a transaction involves securities, regulated brokerage or placement activity is performed by appropriately licensed institutions engaged for that purpose.",
  },
  {
    category: "The firm",
    question: "Where is the company organized?",
    answer:
      "SGG Ventures LLC is a Wyoming limited liability company, formed on November 6, 2026.",
  },
  {
    category: "Engagements",
    question: "How does an engagement start?",
    answer:
      "With a discovery call and a written scope. We discuss the decision or problem, the constraints, and the timeline, then propose a defined piece of work with deliverables, fees, and a named lead. No engagement begins without a signed written agreement.",
  },
  {
    category: "Engagements",
    question: "How are fees structured?",
    answer:
      "Fees depend on the service and the scope. Most work is priced as a fixed fee for a defined deliverable or as a staged programme with agreed checkpoints. The fee, the payment schedule, and the assumptions are stated in the proposal before work begins.",
  },
  {
    category: "Engagements",
    question: "Do you work with clients outside the United States?",
    answer:
      "Yes. Projects are delivered remotely, so we work with clients across the United States and internationally. Travel, where needed, is agreed case by case and reflected in the scope.",
  },
  {
    category: "Engagements",
    question: "Who actually does the work?",
    answer:
      "SGG Ventures delivers its consulting, advisory, and technology services directly. Where an engagement requires a licensed professional (legal, tax, accounting, securities, or a regulated technology certification), that work is performed by a qualified third party named in the engagement.",
  },
  {
    category: "Engagements",
    question: "How is confidential information handled?",
    answer:
      "Client information is handled under the engagement terms and the safeguards appropriate to its sensitivity. We are willing to sign a mutual confidentiality agreement before detailed information is shared.",
  },
  {
    category: "Technology",
    question:
      "Can you implement the technology, or only advise on it?",
    answer:
      "Both. We provide assessments, architecture, and roadmaps, and we also build and implement business applications, integrations, custom software, and AI-assisted workflows. The delivery model is stated on each service page.",
  },
  {
    category: "Technology",
    question: "Do you resell software licences?",
    answer:
      "No. We do not earn commissions from software vendors or cloud providers. Where a platform is recommended, the licensing relationship is between the client and the vendor.",
  },
  {
    category: "Working together",
    question: "What if we are not sure which service we need?",
    answer:
      "That is a normal starting point. Describe the decision or the problem in the contact form, and we will tell you which capability applies and whether a short diagnostic is the right first step.",
  },
];
