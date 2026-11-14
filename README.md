# SGG Ventures LLC — Corporate Website

Official website for **SGG Ventures LLC**, a Wyoming limited liability company and a strategic business advisory and technology consulting firm. The firm helps organizations achieve sustainable growth through business and management consulting, digital transformation, and business technology solutions.

## Positioning

> Strategic Business. Intelligent Technology. Sustainable Growth.

Eight service areas, 44 defined services:

1. Business Consulting
2. Management Consulting
3. IT Consulting
4. Digital Transformation
5. Business Applications
6. Custom Software Development
7. Websites & Digital Presence
8. AI & Automation

The entity is a Wyoming LLC, formed November 6, 2026. Addresses are kept private.

## Tech Stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 4** custom design system
- **Prisma** ORM (SQLite for local development, PostgreSQL-ready)
- **React Hook Form + Zod** server-validated consultation and partnership forms
- **Framer Motion** refined micro-interactions
- **Lucide** iconography
- Content layer in structured TypeScript modules (CMS-ready)

## Local Development

```bash
npm install
npm run db:push        # create prisma/dev.db (SQLite) from schema
npm run dev            # http://localhost:3000
```

Environment variables are documented in `.env.example`. Copy it to `.env.local` and fill values as needed.

## Production Build

```bash
npm run build
npm run start
```

## Routes

- `/` — homepage
- `/about`, `/about/leadership`, `/about/governance`
- `/services`, `/services/[category]`, `/services/[category]/[service]`
- `/industries`, `/industries/[industry]`
- `/case-studies`, `/case-studies/[slug]`
- `/insights`, `/insights/[slug]`
- `/faq`, `/company-profile` (print-friendly; Print / Save as PDF)
- `/partnerships`, `/careers`, `/contact`
- `/legal/[slug]` — privacy, terms, regulatory, risk, cookies

Retired M&A pages (`/services/mergers-acquisitions/*`) redirect to `/services` (see `next.config.ts`).
- `/portal`, `/admin` — private client/staff areas (noindex)

## Key Directories

- `src/content/` — structured service, industry, case-study, insight, company, and legal content (the content layer a CMS will replace)
- `src/components/` — layout, homepage, service templates, forms, shared/ui components
- `src/lib/` — site config, navigation, SEO/JSON-LD, validation schemas, server utilities (db, email, auth)
- `prisma/` — database schema

## Compliance Notes

Service descriptions deliberately distinguish:

- **Direct delivery** — consulting, advisory, and technology services performed by SGG Ventures
- **Qualified third party** — work requiring a licence, registration, or certification SGG Ventures does not hold (legal, tax, accounting, securities, regulated technology)
- **Coordination** — SGG Ventures coordinates workstreams while a qualified third party performs the specialist act

The firm does not provide securities brokerage, investment management, or regulated financial advice. The name "Ventures" does not imply a venture fund or a regulated investment status.

Do not add unverified regulatory licences, affiliations, registration numbers, client names, testimonials, or statistics. Content pages flagged `legalReview: true` in `src/content/legal.ts` require review by counsel before publication.

Case studies are anonymized and labelled representative. Testimonials must not be published without written client consent.

## Outstanding inputs

- Wyoming LLC filing number (a placeholder in `src/lib/site.ts`)
- Confirmed leadership names, titles, and biographies
- Client-approved case studies or testimonials, if they are ever to be published

## Accounts and sign-in

- `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/verify-email`; the portal is at `/portal` (`/portal/login` redirects to `/login`).
- Self sign-up creates a **client** account. Staff accounts come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (first sign-in) or are created in the portal.
- Passwords are scrypt-hashed; sessions are random tokens stored as SHA-256 hashes in an httpOnly cookie. Five failed log-ins lock an account for 15 minutes.
- Verification (24 h) and reset (1 h) links are single-use tokens, stored hashed. A password reset signs out every other session.
- Sign-ups are limited to 5 per network per hour; reset emails to 3 per account per hour.
- Account emails need `RESEND_API_KEY` and `AUTH_FROM_EMAIL` (or `INQUIRY_FROM_EMAIL`). Without them, links are printed to the server log in development only.
- Schema changes (`users.emailVerifiedAt`, `auth_tokens`) must be applied with `npx prisma db push` before deploying.
