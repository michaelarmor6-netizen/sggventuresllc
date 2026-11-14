/**
 * Insights. Notes from the practice. No invented performance figures.
 */

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category:
    | "Strategy & Growth"
    | "Technology & AI"
    | "News & Updates";
  date: string;
  readMinutes: number;
  authoredBy: string;
  sections: ArticleSection[];
};

export const ARTICLES: Article[] = [
  {
    slug: "the-plan-stalls-at-handover",
    title: "The plan stalls at handover",
    excerpt:
      "Most strategies are not wrong. They are written without the operating changes they require, then handed to a technology team that was never in the room.",
    category: "Strategy & Growth",
    date: "2026-10-14",
    readMinutes: 6,
    authoredBy: "SGG Ventures Advisory Team",
    sections: [
      {
        heading: "The gap is usually structural",
        paragraphs: [
          "A strategy document can be sound and still fail in the first quarter of execution. The usual cause is not a weak recommendation. It is that the recommendation was written as a set of conclusions rather than a set of operating changes.",
          "If the plan requires a different approval path, a new data owner, or a changed reporting line, those are design decisions. They need to be made with the people who will operate them, before the technology work is scoped.",
        ],
      },
      {
        heading: "What handover loses",
        paragraphs: [
          "When the advisory team and the delivery team are separate firms, the reasoning behind the plan is rarely transferred. The build team receives requirements, not context. The client then spends the programme reconstructing decisions that were made months earlier.",
        ],
        bullets: [
          "Assumptions that were never written down become requirements by default",
          "Trade-offs are reopened because the reason for the choice was not recorded",
          "The operating model is designed around the software rather than the work",
          "Adoption is treated as a communication task instead of a design constraint",
        ],
      },
      {
        heading: "Design the system and the work together",
        paragraphs: [
          "We treat the operating model, the data, and the application as one design problem. That does not mean every engagement includes a build. It means the recommendation states what has to change operationally and what the system has to support, in language both sides can use.",
          "Where a client already has a delivery partner, we work alongside them. Where the work is ours, the same people who shaped the recommendation remain accountable through delivery.",
        ],
      },
      {
        heading: "A test for any plan",
        paragraphs: [
          "Ask three questions of a strategy document: which decision changes on Monday, who owns it, and what system or record makes it visible? If the answers are not on the page, the plan is not finished — it is a position paper.",
        ],
      },
    ],
  },
  {
    slug: "what-independent-really-means-in-advisory",
    title: "What independent should mean when you hire an adviser",
    excerpt:
      "Independent is the most used word in this business. Here is a definition you can test in a meeting, without taking our word for it.",
    category: "Strategy & Growth",
    date: "2026-08-22",
    readMinutes: 5,
    authoredBy: "SGG Ventures Advisory Team",
    sections: [
      {
        heading: "Two ways this work is paid for",
        paragraphs: [
          "Some advisers earn when you transact, or when you licence a product they represent. The advice and the ticket are the same business. Others earn for the analysis and the delivery, whether you then buy, sell, build, or sit still.",
          "The second model is harder to run. It is also what most people think they bought when they heard the word independent.",
        ],
      },
      {
        heading: "Three tests we use on ourselves",
        paragraphs: [
          "We treat independence as three checks, not a tone of voice:",
        ],
        bullets: [
          "We are not paid by the product, the transaction, or the provider we recommend",
          "We write options down, including doing nothing",
          "Anything that needs a licence or certification is done by a firm that holds one, and that split is on paper",
        ],
      },
      {
        heading: "Ask any adviser these three questions",
        paragraphs: [
          "How are you paid for this work, and for anything that follows it? What did you consider telling us not to do? Which parts of this need an authorisation, and who holds it? Honest answers to those three questions sort a room faster than a credential list.",
        ],
      },
    ],
  },
  {
    slug: "ai-governance-before-model-selection",
    title: "AI adoption is a governance problem before it is a model problem",
    excerpt:
      "The difficult questions about AI are not which model to use. They are which decisions may be assisted, whose content is approved, and who is accountable when an answer is wrong.",
    category: "Technology & AI",
    date: "2026-09-02",
    readMinutes: 6,
    authoredBy: "SGG Ventures Technology Team",
    sections: [
      {
        heading: "Start with the decision, not the model",
        paragraphs: [
          "Most AI programmes begin with a platform choice and only later ask what the tool is allowed to decide. That order produces pilots that impress in a demonstration and stall in production, because nobody agreed what a correct answer looks like or who owns an incorrect one.",
          "A better sequence is to name the decision, the evidence required, the consequence of an error, and the person accountable for the outcome. The technology choice follows from those answers.",
        ],
      },
      {
        heading: "The content is the hard part",
        paragraphs: [
          "Retrieval-based assistants are only as good as the material they retrieve. In most organizations, guidance, templates, and precedent are spread across document libraries, inboxes, and individual experience. Ownership is unclear and review dates are missing.",
        ],
        bullets: [
          "Which sources are approved, and who approved them",
          "How outdated content is identified and removed",
          "What access rules apply to each source",
          "How citations are presented so a person can check the answer",
        ],
      },
      {
        heading: "Keep a person in the loop by design",
        paragraphs: [
          "An assistant that drafts and retrieves is a different risk from an assistant that decides. We design the boundary explicitly: what the system may do autonomously, what it may propose, and what must be confirmed by a named role.",
          "Evaluation should be routine rather than ceremonial. A defined test set, a feedback route, and a review cadence tell you more than a one-off accuracy claim.",
        ],
      },
      {
        heading: "Governance is not a brake",
        paragraphs: [
          "The organizations that get value from AI are usually the ones that decided early what they would not automate. That clarity lets them move faster on the use cases that remain, because the review path is already agreed.",
        ],
      },
    ],
  },
  {
    slug: "website-launch",
    title: "This website is live",
    excerpt:
      "A public site for SGG Ventures LLC: seven service areas, how to reach us, and the disclosures. Names, credentials, and offices still go up only when we can show them.",
    category: "News & Updates",
    date: "2026-11-03",
    readMinutes: 3,
    authoredBy: "SGG Ventures LLC",
    sections: [
      {
        heading: "What is here",
        paragraphs: [
          "SGG Ventures LLC now has a public website. It describes seven service areas — Business Consulting, Management Consulting, IT Consulting, Digital Transformation, Business Applications, Custom Software Development, and AI & Automation — plus a way to request a consultation and a way for specialist firms to propose a partnership.",
        ],
      },
      {
        heading: "What is not here yet",
        paragraphs: [
          "We describe work we do directly and work a qualified third party must do. We have kept those descriptions tight. They will change only when a licence, certification, or credential is confirmed.",
          "Leadership names, additional office addresses, registration numbers, client names, and any claim about results are off the site until they are checked. When they are checked, they will appear here through the same process we use for the rest of the pages.",
        ],
        bullets: [
          "Service, industry, and case-study pages are up",
          "Inquiry and partnership forms are open",
          "Regulatory and risk pages are published as drafts for counsel",
        ],
      },
      {
        heading: "How to reach us",
        paragraphs: [
          "Use the consultation form, or call during Eastern business hours. If you are a technology vendor, implementation firm, professional practice, or managed service provider that wants to work with us, use the partnership form.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function sortedArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.date.localeCompare(a.date));
}

export const ARTICLE_CATEGORIES = [
  "Strategy & Growth",
  "Technology & AI",
  "News & Updates",
] as const;
