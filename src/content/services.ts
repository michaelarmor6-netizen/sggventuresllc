/**
 * Services content — the four service areas.
 *
 * Each area is a page at /services/[category]. Copy describes what is built
 * and how a project is run. No client names, results, metrics, credentials,
 * or partner claims without evidence (see docs/SGG_CONTENT_CONFIRMATIONS.md).
 */

export type ServiceCategoryContent = {
  slug: string;
  code: string;
  name: string;
  shortName: string;
  /** One line for menus. */
  navDescription: string;
  /** Card copy on the homepage and services overview. */
  tagline: string;
  /** Page hero and meta description. */
  summary: string;
  problem: { title: string; paragraphs: string[] };
  audience: string[];
  deliverables: { title: string; body: string }[];
  scopeLimits: string[];
  ongoingCosts: string[];
  icon: string;
};

export const SERVICE_CATEGORIES: ServiceCategoryContent[] = [
  {
    slug: "websites",
    code: "01",
    name: "Business websites",
    shortName: "Websites",
    navDescription: "Clear, responsive sites that bring enquiries",
    tagline:
      "Clear, responsive websites that explain your business and make it easier for customers to get in touch.",
    summary:
      "Clear, responsive websites that explain what your business does and make it easy for customers to get in touch.",
    problem: {
      title: "When the website is not doing its job",
      paragraphs: [
        "Many small-business websites are hard to read on a phone, slow to load, or unclear about what the business actually offers. Visitors leave before they find a way to get in touch.",
        "We build websites around the questions a customer arrives with: what you do, who it is for, what it costs or how to find out, and how to contact you. The design follows from that, not the other way round.",
      ],
    },
    audience: [
      "Small businesses that need a first website or a clearer replacement",
      "Online sellers who want a home for their brand beyond a marketplace or social page",
      "Startups that need a simple site to explain a product and collect interest",
    ],
    deliverables: [
      {
        title: "Page structure and copy guidance",
        body: "A page plan agreed before design starts, with guidance on the content each page needs from you.",
      },
      {
        title: "Responsive design and build",
        body: "Pages that work on phones, tablets, and desktops, built with readable type, clear headings, and accessible contrast.",
      },
      {
        title: "Contact and enquiry forms",
        body: "A working enquiry route, tested before launch, so messages reach the inbox you choose.",
      },
      {
        title: "Search and sharing basics",
        body: "Page titles, descriptions, a sitemap, and link previews set up so the site is presented properly in search results and when shared.",
      },
      {
        title: "Launch and handover",
        body: "Help connecting your domain, a pre-launch check, and a handover of the access and files agreed in the project scope.",
      },
    ],
    scopeLimits: [
      "Photography, logo design, and copywriting are included only where the proposal says so.",
      "Search rankings and traffic levels depend on many factors outside the build and are not guaranteed.",
      "Changes requested after sign-off of a stage are estimated and agreed separately.",
    ],
    ongoingCosts: [
      "Domain name registration, renewed with your registrar.",
      "Website hosting, billed by the hosting provider.",
      "Optional maintenance and support, if you choose an agreed support scope.",
    ],
    icon: "MonitorSmartphone",
  },
  {
    slug: "business-applications",
    code: "02",
    name: "Custom business applications",
    shortName: "Business applications",
    navDescription: "Tools for orders, customers, and bookings",
    tagline:
      "Applications for managing orders, customers, bookings, and internal workflows.",
    summary:
      "Custom applications for managing orders, customers, bookings, and the internal workflows that off-the-shelf tools do not fit.",
    problem: {
      title: "When spreadsheets and chat threads stop keeping up",
      paragraphs: [
        "A growing business often runs on a mix of spreadsheets, messaging apps, and memory. Orders get missed, the same details are typed twice, and nobody is sure which version is current.",
        "A custom application puts that work in one place, shaped around how your team already operates. We start from the workflow, agree what the first version must do, and build that before adding anything else.",
      ],
    },
    audience: [
      "Online sellers handling customer enquiries, checkout links, and orders by hand",
      "Small businesses that need a simple internal tool for bookings, customers, or stock",
      "Startups building and validating a first version of a product",
    ],
    deliverables: [
      {
        title: "Workflow and requirements review",
        body: "A written description of the process the application supports, the people who use it, and what the first version includes.",
      },
      {
        title: "Application design and build",
        body: "A web application built in agreed stages, with working progress shown for feedback at each stage.",
      },
      {
        title: "Accounts and access",
        body: "Sign-in and roles appropriate to the application, so people see and change only what they should.",
      },
      {
        title: "Connections to other services",
        body: "Integration with payment, messaging, or other services where they are needed and the provider supports it.",
      },
      {
        title: "Deployment and handover",
        body: "Setup on agreed hosting, basic documentation, and transfer of the access and source code stated in the project terms.",
      },
    ],
    scopeLimits: [
      "The first version covers the agreed scope; further features are scoped and priced as later stages.",
      "Third-party services have their own terms, fees, and approval processes, which we do not control.",
      "Native mobile apps are a separate discussion and are not assumed in a web application project.",
    ],
    ongoingCosts: [
      "Hosting and database charges from the infrastructure provider.",
      "Fees from any third-party services the application uses, such as payment or messaging providers.",
      "Optional maintenance and support under an agreed scope.",
    ],
    icon: "AppWindow",
  },
  {
    slug: "automation",
    code: "03",
    name: "AI and workflow automation",
    shortName: "Automation",
    navDescription: "Less repetitive work, with human review",
    tagline:
      "Practical tools that reduce repetitive work, with human review where needed.",
    summary:
      "Practical automation and AI-assisted tools that take repetitive steps off your team, with human review where it matters.",
    problem: {
      title: "When the same task is done by hand every day",
      paragraphs: [
        "Copying details between systems, answering the same enquiry questions, and preparing routine updates takes time away from the work that needs a person.",
        "We look for the steps that are repetitive and well defined, automate those, and keep a person in the loop wherever a wrong answer would matter. Automation is recommended only where it is likely to be worth maintaining.",
      ],
    },
    audience: [
      "Online sellers answering a high volume of similar customer enquiries",
      "Small businesses moving information between forms, spreadsheets, and other tools by hand",
      "Teams that want to try AI assistance on a contained, low-risk task first",
    ],
    deliverables: [
      {
        title: "Process review",
        body: "A short assessment of which steps are suitable for automation, which are not, and what each would involve.",
      },
      {
        title: "Workflow automation",
        body: "Automated hand-offs between the tools you use, such as routing a form submission, creating a record, or sending a notification.",
      },
      {
        title: "AI-assisted drafting and sorting",
        body: "Assistants that draft replies, summarise messages, or categorise requests for a person to check and send.",
      },
      {
        title: "Review points and fallbacks",
        body: "Clear points where a person approves or corrects the output, and a defined path when the automation cannot handle a case.",
      },
      {
        title: "Documentation",
        body: "Plain notes on what the automation does, what it relies on, and how to switch it off.",
      },
    ],
    scopeLimits: [
      "AI output can be incomplete or wrong and should be reviewed before it is relied on.",
      "Automation depends on the third-party tools involved continuing to offer the access it uses.",
      "We do not recommend automating decisions that carry legal, financial, or safety consequences without human review.",
    ],
    ongoingCosts: [
      "Usage-based fees from AI model providers, where AI features are used.",
      "Subscription fees for any automation or integration platforms involved.",
      "Optional maintenance and support under an agreed scope.",
    ],
    icon: "Workflow",
  },
  {
    slug: "support",
    code: "04",
    name: "Maintenance and support",
    shortName: "Support",
    navDescription: "Updates and fixes under an agreed scope",
    tagline:
      "Ongoing updates, troubleshooting, and improvements under an agreed support scope.",
    summary:
      "Ongoing updates, troubleshooting, and improvements for websites and applications, under a support scope agreed in advance.",
    problem: {
      title: "When the launch is not the end of the work",
      paragraphs: [
        "Websites and applications need attention after launch: software updates, small content changes, the occasional fault, and improvements once real use shows what is missing.",
        "A support arrangement states what is covered, how to raise a request, and how further work is estimated, so both sides know what to expect.",
      ],
    },
    audience: [
      "Businesses whose website or application we have built",
      "Businesses with an existing site or application that needs a maintainer, subject to an initial review",
    ],
    deliverables: [
      {
        title: "Updates",
        body: "Routine updates to the software the site or application depends on, within the agreed scope.",
      },
      {
        title: "Troubleshooting",
        body: "Investigation and repair of faults that are reported through the agreed channel.",
      },
      {
        title: "Small changes",
        body: "Content edits and minor adjustments up to the allowance in the support scope.",
      },
      {
        title: "Improvements",
        body: "Larger changes estimated and agreed before work starts, outside the routine allowance.",
      },
    ],
    scopeLimits: [
      "Support covers what the agreed scope lists; it is not an unlimited development retainer.",
      "Systems we did not build are taken on only after a review of their current state.",
      "Response times apply only where they are written into the support agreement.",
    ],
    ongoingCosts: [
      "The support fee stated in the agreement.",
      "Hosting, domain, and third-party service fees, which remain with their providers.",
    ],
    icon: "LifeBuoy",
  },
];

export function getCategory(slug: string): ServiceCategoryContent | undefined {
  return SERVICE_CATEGORIES.find((category) => category.slug === slug);
}
