# QA report

Run on 16 November 2026 against a production build (`next build` + `next start`), Next.js 16.4.6.

## Automated suite: `npm run test:e2e`
**127 passed, 2 skipped** (the desktop-only menu test is skipped on mobile and vice versa).

| Area | What is checked |
| --- | --- |
| Routes (desktop + Pixel 7) | All 37 pages return 200, have exactly one `<h1>`, show the header and registered footer, log no console errors, and never scroll sideways |
| Responsive | No horizontal overflow at 320, 768 and 1024 px on the heaviest pages |
| Accessibility | axe-core, WCAG 2.1 A and AA rules, every page: **0 violations** |
| Links | Every internal link found on every page resolves (no 4xx/5xx) |
| Navigation | Skip link; Our Work mega-menu by keyboard and Escape; mobile drawer opens, expands, closes with Escape |
| Forms | Field errors, typed values kept after an error, partner prefill from `?interest=fusion`, donation minimum, donation never claims a payment |
| Media | Gallery filter, keyboard navigation, full-screen viewer (arrows, Escape), grid view; Our Work coverflow opens the centred project |
| Consent | Banner choice remembered and reopenable; GA never requested before consent |

## Performance and quality: Lighthouse 13 (mobile emulation, simulated slow 4G)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| / | 99 | 100 | 100 | 100 | 0.9 s | 0 | 120 ms |
| /our-work | 100 | 100 | 100 | 100 | 0.9 s | 0 | 90 ms |
| /media/gallery | 100 | 100 | 100 | 100 | 0.9 s | 0 | 90 ms |
| /about | 100 | 100 | 100 | 100 | 0.9 s | 0 | 70 ms |
| /contact | 96 | 100 | 100 | 100 | 0.8 s | 0 | 230 ms |

Real photographs and the hero video will add weight. Images go through `next/image` (AVIF/WebP, responsive sizes, lazy loading) and the hero video loads only after the page is interactive, never on data-saver connections or for reduced-motion users. Re-run Lighthouse after content is loaded.

## Hero slideshow and page transitions
- Slideshow autoplays every 6.5 s with a 1.4 s crossfade and slow zoom; holds while hovered or focused and when the tab is hidden; pause button, previous/next, and per-slide progress buttons work; wraps from 6 to 1; no autoplay for reduced-motion users.
- Page navigations start a browser view transition (content fades out and up-in; header stays still); disabled for reduced motion; browsers without support switch instantly.
- Homepage after the change: Lighthouse mobile Performance 98, Accessibility/Best practices/SEO 100, LCP 0.9 s, CLS 0.

## Integrations verified here
- **Postgres:** migration applied to a local Postgres 16; contact and quote submissions stored with all fields, consent and honeypot fields excluded, IP stored only as a hash; duplicate newsletter sign-ups stored once (case-insensitive).
- **Sanity:** Studio builds; `sanity schema validate` reports 0 errors and 0 warnings; every website GROQ query executed with `groq-js` against the seed data returns the expected shapes, and the stories query returns only consent-granted stories.
- **Analytics:** with a test GA4 ID, nothing is requested before consent; after acceptance gtag loads and records a page view; withdrawing consent disables tracking immediately.
- **SEO:** canonical, Open Graph, X card and OG image on every page; `sitemap.xml` lists 37 URLs; `robots.txt` blocks indexing on preview deployments; Organization, Event, NewsArticle and BreadcrumbList structured data.
- **Security headers:** CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy present; no CSP violations in the browser.

## Not verifiable without the organisation's accounts
Resend delivery, Brevo sync, the live Sanity project and webhook, Neon in production, and GA4 reports. Each switches on with its keys (see `DEPLOYMENT.md`) and should be smoke-tested on the staging deployment: submit each form once, publish one CMS change, and confirm the GA4 real-time view.

## Not in scope yet
Paystack payments (by decision). The donate page states that no payment is taken.
