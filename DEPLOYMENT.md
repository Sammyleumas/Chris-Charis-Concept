# Deployment guide

How to put the Chris Charis Concept website online and keep it running. Written for the CTO; each step says where the setting lives.

## 1. How the pieces fit

| Piece | Service | What it does | Needed for launch? |
| --- | --- | --- | --- |
| Website | **Vercel** (Next.js 16) | Hosts the site, SSL, staging previews | Yes |
| Content | **Sanity** (Studio in `studio/`) | Staff edit projects, news, photos, figures | Yes |
| Submissions | **Neon** Postgres | Stores every form submission and newsletter consent | Yes |
| Form email | **Resend** | Emails each submission to the team inbox | Yes |
| Newsletter | **Brevo** | Mailing list | Recommended |
| Analytics | **Google Analytics 4** | Visitor statistics, only after cookie consent | Recommended |
| Hero video | **Cloudinary** (or similar) | Hosts the 20-second background loop | When the video exists |
| Donations | **Paystack** | Not connected yet. The donate page says so and never takes payment | Later |

Every integration is optional in code: without its keys the feature shows an honest "not connected yet" message instead of failing.

## 2. Environments

| Environment | Where | Purpose |
| --- | --- | --- |
| Local | `npm run dev` | Development |
| **Staging** | Vercel *Preview* deployments (every branch and pull request) | Review before launch; `robots.txt` blocks search engines automatically |
| **Production** | Vercel *Production* (the `main` branch) on the final domain | The live site |

Use separate values for Preview and Production in Vercel where it matters (for example a test Brevo list and `NEXT_PUBLIC_CONTENT_NOTES` left empty on Preview so reviewers see what content is missing).

## 3. One-time setup, in order

### 3.1 Vercel
1. Sign in at vercel.com with the organisation's GitHub account and **Import** `Sammyleumas/chris-charis-concept`.
2. Framework: Next.js (detected). Build command `npm run build`, output default.
3. Add the environment variables from section 4.
4. Deploy. The first deployment works with no other services connected.

### 3.2 Domain and SSL
1. Vercel → Project → Settings → Domains → add the domain (e.g. `chrischarisconcept.org` and `www.`).
2. At the domain registrar, add the DNS records Vercel shows. SSL certificates are issued automatically.
3. Set `NEXT_PUBLIC_SITE_URL=https://<domain>` for Production and redeploy (used for canonical URLs, the sitemap and social images).
4. In Google Search Console, add the domain and submit `https://<domain>/sitemap.xml`.

### 3.3 Database (Neon)
1. Create a project at neon.tech (region: closest to Vercel's region, e.g. Frankfurt `eu-central-1`).
2. Copy the **pooled** connection string into `DATABASE_URL` (Production and Preview; a separate Neon *branch* for Preview is ideal).
3. Create the tables once from your computer:
   ```bash
   DATABASE_URL="postgres://…" npm run db:migrate
   ```
4. To read submissions: Neon's SQL editor, or `npm run db:studio` locally.
   ```sql
   select created_at, kind, name, email, data from submissions order by created_at desc;
   ```
5. Set `IP_HASH_SALT` to any long random string.

### 3.4 Email (Resend)
1. Create an account at resend.com, add the domain and add the DNS records it shows (SPF/DKIM).
2. Create an API key → `RESEND_API_KEY`.
3. `FORMS_FROM_EMAIL` = an address on the verified domain (e.g. `website@<domain>`); `FORMS_TO_EMAIL` = the inbox that should receive enquiries. Optional `FSH_QUOTES_TO_EMAIL` for Fusion Solutions Hub quotes.

### 3.5 CMS (Sanity)
1. Create a project at sanity.io/manage (dataset `production`). Note the **project ID**.
2. Website variables: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`.
3. Deploy the Studio (from your computer):
   ```bash
   cd studio
   cp .env.example .env   # set SANITY_STUDIO_PROJECT_ID
   npm install
   npx sanity login
   npm run deploy         # → https://chris-charis-concept.sanity.studio
   ```
4. Load the current website content into the CMS:
   ```bash
   npm run cms:seed                 # from the repository root
   cd studio && npm run import-seed
   ```
5. **Webhook** (so publishing updates the site within a minute): sanity.io/manage → API → Webhooks → Create.
   URL `https://<domain>/api/revalidate`, dataset `production`, trigger on create/update/delete, HTTP method POST, add header `x-revalidate-secret` = a long random string. Put the same string in Vercel as `SANITY_REVALIDATE_SECRET`.
6. **People and roles** (sanity.io/manage → Members): invite the CTO as *Administrator*, the communications team as *Editor*, project leads with the most restricted role your plan offers (*Contributor* where available). Role availability depends on the Sanity plan; check sanity.io/pricing before inviting.

### 3.6 Newsletter (Brevo)
Create a contact list, then set `BREVO_API_KEY` and `BREVO_LIST_ID`. Every sign-up is also stored in the database with its consent time.

### 3.7 Analytics (GA4)
Create a GA4 property, copy the Measurement ID (`G-…`) into `NEXT_PUBLIC_GA_ID`. GA loads only after a visitor accepts analytics cookies. Mark these events as key events in GA4: `contact_submit`, `volunteer_application`, `partnership_enquiry`, `careers_application`, `quote_request`, `sign_up`, `donation_initiated`, `event_application_click`.

### 3.8 Hero video
Upload the approved 20-second clip (MP4, H.264, under ~4 MB, no audio) to Cloudinary and paste its delivery URL into **Site settings → Hero video URL** in the Studio. If you use a host other than `res.cloudinary.com` or Sanity, add it to `media-src` in `next.config.ts`.

## 4. Environment variables

| Variable | Scope | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | `https://<domain>` |
| `NEXT_PUBLIC_CONTENT_NOTES` | Production | Set to `off` so internal "Content needed" notes never show publicly |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | All | CMS |
| `SANITY_REVALIDATE_SECRET` | All | Must match the webhook header |
| `DATABASE_URL`, `IP_HASH_SALT` | All (secret) | Neon pooled URL |
| `RESEND_API_KEY`, `FORMS_FROM_EMAIL`, `FORMS_TO_EMAIL`, `FSH_QUOTES_TO_EMAIL` | All (secret) | Form email |
| `BREVO_API_KEY`, `BREVO_LIST_ID` | All (secret) | Newsletter |
| `NEXT_PUBLIC_GA_ID` | Production | GA4 |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | Optional | Fallback if the CMS field is empty |

Variables starting `NEXT_PUBLIC_` are visible in the browser by design; never put secrets in them. Secrets live only in Vercel, never in the repository.

## 5. Security already in place
- Content Security Policy, HSTS, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and no `X-Powered-By` (see `next.config.ts`).
- Every form is validated on the server, has a spam trap and a per-visitor rate limit; IP addresses are stored only as salted hashes.
- The revalidation webhook checks its secret with a timing-safe comparison.
- Admin access (Vercel, Sanity, Neon, Resend, Brevo, GA): enable two-factor login for every account and keep administrator access to the CTO.
- Monthly: `npm outdated` and `npm audit`, update, run the QA suite, deploy.

## 6. Monitoring and backups
- **Errors and logs:** Vercel → Project → Logs (form failures are logged with the form name, never personal data). Optional: add Sentry later for alerting.
- **Uptime:** a free monitor (e.g. UptimeRobot or Better Stack) pinging the homepage every 5 minutes.
- **Database:** Neon keeps point-in-time history (length depends on plan). For a monthly offline copy: `pg_dump "$DATABASE_URL" > backup.sql`.
- **CMS:** Sanity keeps document history. Monthly export: `cd studio && npx sanity dataset export production backup.tar.gz`.
- **Code:** GitHub is the source of truth; every deployment can be rolled back from Vercel → Deployments → Promote.

## 7. Release checklist
1. `npm run lint && npm run typecheck && npm run build && npm run test:e2e` all pass (127 tests).
2. Review the Vercel Preview deployment on a phone and a laptop.
3. Content checklist (`CONTENT-CHECKLIST.md`) items for launch are done; legal pages approved and their `approved` flag set to `true` in `src/content/legal/documents.ts`.
4. `NEXT_PUBLIC_CONTENT_NOTES=off` in Production.
5. Merge to `main` → Vercel deploys to Production.
6. Submit the sitemap in Search Console; announce on all handles (brief §11).

## 8. Paystack (later)
The donate form, validation and analytics event are built. Connecting Paystack needs: a verified Paystack business account, `PAYSTACK_SECRET_KEY`, a server action that initialises the transaction (or a subscription plan for monthly gifts), a callback page that verifies the transaction on the server, a webhook route that checks Paystack's signature, a `donations` table, and an email receipt. Until then the form says no payment has been taken.
