# Chris Charis Concept — official website

The official website of **Chris Charis Concept**, trading name of Chris Charis Social Enterprise for Art and Tech LTD/GTE (RC 9786077), Benin City, Nigeria.

Built with Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4, Motion and Lucide.

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint
```

Requires Node.js 20.9 or later.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/app/globals.css` | **Design tokens**: brand colours, fonts, type scale. A rebrand starts here. |
| `src/config/brand.ts` | Logo file paths (light/dark). |
| `src/config/site.ts` | Organisation identity, approved text blocks, contact details, social links, external link register. |
| `src/config/navigation.ts` | Header and footer menus. |
| `src/content/` | Local content layer: projects, organisations, impact figures, timeline, featured initiative, image inventory. |
| `src/lib/content.ts` | The only way pages read content. Will be pointed at the Sanity CMS in Phase 11. |
| `src/components/` | `layout/` header, mega-menu, mobile nav, footer · `home/` homepage sections · `ui/` shared building blocks · `forms/` · `media/` · `seo/` |

## Adding photographs

Every photo is registered in `src/content/images.ts`. Entries with `src: null` render a labelled frame describing the photo needed.

1. Put the file in `public/images/<folder>/` (JPG or WebP, at least 2000px wide for heroes).
2. Set `src: "/images/<folder>/<file>.jpg"`, plus `width` and `height`.
3. Optionally set `focus: "50% 30%"` to keep faces in frame when cropped.

Only use photographs with participant consent (Nigeria Data Protection Act 2023).

## Adding the logo

Put the supplied SVGs in `public/brand/` and set `brand.logo.light` and `brand.logo.dark` in `src/config/brand.ts`.

## Content rules

Nothing on this site is invented. Values the client has not supplied are `null` and are hidden, or flagged with a "Content needed" note on non-production builds. Set `NEXT_PUBLIC_CONTENT_NOTES=off` in production. See `CONTENT-CHECKLIST.md`.
