# SGG Ventures LLC — Content Confirmations

Last updated: 13 November 2026

This file lists every fact the website needs from the owner before it can be published, and where to enter it once confirmed. Until an item is confirmed, the site **omits** it — nothing below is shown to visitors as a placeholder.

Most confirmed facts go in one place: `PUBLIC_FACTS` in `src/lib/site.ts`. Setting a value there publishes it in the footer, the About page, the Contact page, and the structured data.

## 1. Blocking launch

These do not block local work, but the site should not go live without them.

| # | Item | Why it matters | Where it goes |
| --- | --- | --- | --- |
| 1 | **Production domain** | Live at `https://www.sggventures.online`. `NEXT_PUBLIC_SITE_URL` must be set to that origin in Vercel so the sitemap, canonical URLs, and robots.txt use it (currently they fall back to the `vercel.app` domain). | `NEXT_PUBLIC_SITE_URL` in Vercel (Production) |
| 2 | **Enquiry inbox** — an address that is owned, monitored, and able to receive mail | Without it, enquiries are stored in the portal but nobody is emailed | `INQUIRY_NOTIFY_EMAIL` |
| 3 | **Sender address on a domain verified in Resend**, plus the Resend API key | Required for notification emails to send | `INQUIRY_FROM_EMAIL`, `RESEND_API_KEY` |
| 4 | **Production database** and applying the schema change (`budget`, `timeline` added; `country` optional) | The enquiry form returns an error until the columns exist | `DATABASE_URL`, then `npx prisma db push` |
| 5 | **Staff portal credentials** (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, long random `ADMIN_SESSION_SECRET`) | Staff read enquiries in `/portal` | Hosting environment |
| 6 | **Hosting project** | Set the production hosting project and confirm its environment variables. | Hosting dashboard |

## 2. Company facts (omitted until confirmed)

| Item | Status | Notes | Where it goes |
| --- | --- | --- | --- |
| Legal name | Used as "SGG Ventures LLC" | Confirm the exact form on the formation record (e.g. "SGG Ventures, LLC" with a comma) | `COMPANY.legalName` |
| Formation state | **Confirmed — Wyoming** | Articles of Organization filed 2026-11-06. Published as "Wyoming limited liability company". | `PUBLIC_FACTS.entityDescription` |
| Formation status | **Confirmed — registered** | Formation granted 2026-11-06. Legal name may carry "LLC". | — |
| Address | **Kept private** | Registered agent and office addresses are not published. | — |
| Operating location | **Tentative — remote delivery** | No fixed office is claimed. About page states projects are delivered remotely. Confirm and refine when known. | About page copy |
| Public email | **Confirmed — info@sggventures.online** | Published as the direct alternative to the enquiry form. | `PUBLIC_FACTS.email` |
| Phone | **Confirmed — +1 917 672 7178** | Published. | `PUBLIC_FACTS.phone` |

## 3. Services

All four services are confirmed as offered today. Source-code ownership and handover are negotiated per project rather than a standard term, so the copy describes them as agreed in the project terms.

| Service | Page | Status |
| --- | --- | --- |
| Business websites | `/services/websites` | Offered now |
| Custom business applications | `/services/business-applications` | Offered now |
| AI and workflow automation | `/services/automation` | Offered now |
| Maintenance and support | `/services/support` | Offered now |

Other points:

- **Development stage.** Pre-launch. Copy uses present-tense service descriptions and makes no claim about past customers or delivered projects. Explicit "launching" wording is acceptable.
- **Response time.** No response time is promised anywhere. Add one only as an operational commitment you will meet.
- **Pricing.** No prices or price ranges are shown. The enquiry form's budget field is free text.

## 4. Not published — needs evidence first

| Item | Needed before publishing |
| --- | --- |
| **Our Products** page (`/products`) | For each product: name, purpose, intended users, the documented relationship to SGG Ventures LLC (owned, operated, licensed), accurate status (In development / Private beta / Available), and a working link. This applies to Guma One, GumaKart, and any other app. Subscription plans are shown only if they exist. |
| **Work / portfolio** page (`/work`) | Real projects with permission for names, screenshots, quotes, and results. Demos must be labelled as demos. |
| Testimonials, client names, metrics | Written permission and a source for every figure |
| Team, leadership, credentials, partnerships | Confirmed names and facts only |
| Product screenshots to replace stock photographs | Three service pages use Unsplash photographs captioned as illustrative. Replace with real screenshots when available (`src/lib/photos.ts`). |

## 5. Removed from the previous site

These were removed because they are not confirmed SGG Ventures offerings or facts. They can return only with confirmation.

- Business consulting, management consulting, M&A advisory, IT consulting, and executive advisory service areas, and the "eight areas / 45 services" claim
- Microsoft, Power Platform, CRM, and ERP capability claims
- Statements about independence, vendor commissions, and third-party specialist arrangements
- Industries pages (replaced by one "Who we help" section)
- Case studies and insights articles (representative or undated content, not SGG Ventures work)
- Leadership, governance, careers, partnerships, FAQ, and company profile pages
- Regulatory and risk disclosure pages (written for the previous company's name and services)
- The partnership enquiry form (its database table is kept so old rows stay readable)
- "Sign in" in the public header (the portal still exists at `/portal/login`)

## 6. Policies

The privacy, terms, and cookie pages were rewritten to describe what this website does today. They deliberately leave out anything unconfirmed:

- **No retention period** is stated. Decide one and add it.
- **No governing-law clause.** Add after the formation state is confirmed.
- **Providers are described by role** (hosting, database, email delivery), not by name. Name them once the production stack is fixed.
- **Legal review.** These pages have not been reviewed by a lawyer.

## 7. Leftovers to tidy (not visible to visitors)

- `public/images/` still contains photographs used only by the previous site (`advisory`, `finance`, `trade`, `hero-office`, `business-consulting`, `management-consulting`, `it-consulting`, `business-applications`). They are unreferenced and can be deleted.
- The portal session cookie is still named `sfg_session`. Renaming it signs everyone out once; do it at a convenient time.
- `package-lock.json` had an uncommitted change before this work and is slightly out of sync with `package.json` (`npm ci` reports two missing optional packages). Run `npm install` once and commit the result.
