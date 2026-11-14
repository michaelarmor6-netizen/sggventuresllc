/**
 * Company and homepage content.
 *
 * Process and practice descriptions only. Client names, testimonials,
 * metrics, team members, credentials, and partnerships are published only
 * with evidence (see docs/SGG_CONTENT_CONFIRMATIONS.md).
 */

export const PURPOSE =
  "To help small businesses and online sellers turn everyday tasks into simpler digital workflows, with software that is clear to use and sized to the business.";

/** How we work — used on the homepage, services overview, and service pages. */
export const HOW_WE_WORK: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Understand your business",
    body: "We discuss your users, current workflow, goals, and constraints.",
  },
  {
    step: "02",
    title: "Agree the scope",
    body: "Deliverables, responsibilities, milestones, and commercial terms are defined before work begins.",
  },
  {
    step: "03",
    title: "Build and review",
    body: "We develop in agreed stages, with your feedback on working progress.",
  },
  {
    step: "04",
    title: "Launch and support",
    body: "We complete the handover and provide the support agreed for the project.",
  },
];

/** Who we help — three customer groups. */
export const AUDIENCES: { title: string; body: string; icon: string }[] = [
  {
    title: "Small businesses",
    body: "Improving their online presence or the internal systems they run on.",
    icon: "Store",
  },
  {
    title: "Online sellers",
    body: "Managing customer enquiries, checkout, and orders.",
    icon: "ShoppingBag",
  },
  {
    title: "Startups",
    body: "Developing and validating an initial product.",
    icon: "Rocket",
  },
];

/** Practical solutions — examples of the kind of tool we build. */
export const SOLUTIONS: { title: string; body: string; href: string }[] = [
  {
    title: "Order management",
    body: "One place to record orders, track their status, and see what needs attention.",
    href: "/services/business-applications",
  },
  {
    title: "Checkout workflows",
    body: "Checkout links and payment steps connected to the order they belong to.",
    href: "/services/business-applications",
  },
  {
    title: "Customer messaging",
    body: "Enquiries routed to the right person, with drafted replies ready for review.",
    href: "/services/automation",
  },
  {
    title: "Internal tools",
    body: "Simple applications for bookings, customer records, and day-to-day operations.",
    href: "/services/business-applications",
  },
];

/** What your project includes. */
export const PROJECT_INCLUDES: { title: string; body: string; icon: string }[] = [
  {
    title: "A written scope",
    body: "What will be built, what is not included, and what we need from you.",
    icon: "ClipboardList",
  },
  {
    title: "Milestones",
    body: "Work divided into stages, each with something you can review.",
    icon: "Milestone",
  },
  {
    title: "Regular communication",
    body: "An agreed channel and rhythm for updates, questions, and feedback.",
    icon: "MessagesSquare",
  },
  {
    title: "Ownership terms",
    body: "Who owns the code, content, and accounts, stated in the project terms.",
    icon: "FileCheck2",
  },
  {
    title: "Handover",
    body: "The access, files, and notes you need to run what was built.",
    icon: "PackageCheck",
  },
];

/** Why work with SGG — delivery practices, not superiority claims. */
export const PRACTICES: { title: string; body: string }[] = [
  {
    title: "Scope before code",
    body: "Deliverables and terms are written down and agreed before development starts.",
  },
  {
    title: "Working progress, not status reports",
    body: "You review something that runs at each stage, so problems surface early.",
  },
  {
    title: "Sized to the business",
    body: "We recommend the simplest thing that solves the problem, and say when an existing tool would do.",
  },
  {
    title: "Costs stated plainly",
    body: "Ongoing costs such as hosting and third-party fees are identified up front.",
  },
  {
    title: "Human review where it matters",
    body: "Automation and AI features include a point where a person checks the result.",
  },
  {
    title: "A proper handover",
    body: "You receive the access and documentation agreed for the project.",
  },
];
