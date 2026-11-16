# Chris Charis Concept: official website

The official website of **Chris Charis Concept**, trading name of Chris Charis Social Enterprise for Art and Tech LTD/GTE (RC 9786077), Benin City, Nigeria.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Sanity (CMS) · Postgres via Drizzle (Neon) · Resend · Brevo · GA4 (consent-gated) · Vercel.

| Document | For |
| --- | --- |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Putting the site live: services, environment variables, domain, backups |
| [EDITING-GUIDE.md](EDITING-GUIDE.md) | Staff using the CMS |
| [CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md) | Content still needed from the organisation |
| [QA-REPORT.md](QA-REPORT.md) | Test results |
| [MOTION.md](MOTION.md) | Motion and interaction standard (the 20 UX and animation principles) |

## Running locally

```bash
npm install
cp .env.example .env.local   # every value is optional
npm run dev                  # http://localhost:3000
```

| Script | Does |
| --- | --- |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | Code checks |
| `npm run test:e2e` | Full QA suite (after `npm run build`) |
| `npm run db:migrate` | Create/update database tables (needs `DATABASE_URL`) |
| `npm run cms:seed` | Export current content for import into Sanity |

The Sanity Studio lives in `studio/` with its own `package.json` (`cd studio && npm install && npm run dev`).

Requires Node.js 20.9 or later.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/app/globals.css` | **Design tokens**: brand colours, fonts, type scale. A rebrand starts here |
| `src/config/` | Brand assets, organisation identity and approved text, navigation |
| `src/content/` | Verified local content and image inventory; the fallback for anything not yet in the CMS |
| `src/lib/content.ts` | The only way pages read content (CMS first, local fallback) |
| `src/lib/cms/` | Sanity client, GROQ queries, merge rules |
| `src/lib/forms/`, `src/app/actions/` | Form definitions, validation and delivery (database + email) |
| `src/lib/db/`, `drizzle/` | Database schema and migrations |
| `src/components/` | `layout/`, `home/`, `projects/`, `organisations/`, `media/`, `forms/`, `legal/`, `ui/` |
| `studio/` | Sanity Studio and content schemas |
| `e2e/` | Playwright QA suite |

## Content rules

Nothing on this site is invented. Values the organisation has not supplied are empty and hidden, or flagged with a "Content needed" note on non-production builds (`NEXT_PUBLIC_CONTENT_NOTES=off` hides them). Photos without a file show a labelled frame naming the photo needed. Participant photos and stories require recorded consent (Nigeria Data Protection Act 2023).
