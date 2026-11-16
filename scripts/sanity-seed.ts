/**
 * Exports the verified local content as Sanity documents (NDJSON), so the
 * CMS starts with everything the website already shows.
 *
 *   npm run cms:seed            → writes studio/seed/content.ndjson
 *   cd studio && npm run import-seed
 *
 * Images are not included (none are supplied yet); upload them in the Studio.
 * Re-running the import with --replace overwrites these documents only.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { featuredInitiative, films, impactStats, organisations, pressAssets, projectFamilies, timeline } from "../src/content/data";
import { linkRegister, site } from "../src/config/site";

let key = 0;
const k = () => `k${(++key).toString(36)}`;
const link = (l: { label: string; url: string | null; external?: boolean }) =>
  l.url ? { _key: k(), _type: "link", label: l.label, url: l.url, external: Boolean(l.external) } : null;
const clean = <T,>(xs: (T | null)[]) => xs.filter(Boolean) as T[];

const docs: Record<string, unknown>[] = [];

docs.push({
  _id: "siteSettings",
  _type: "siteSettings",
  email: site.contact.email ?? undefined,
  phone: site.contact.phone ?? undefined,
  ...Object.fromEntries(Object.entries(linkRegister).filter(([, v]) => v)),
});

docs.push({
  _id: "homepage",
  _type: "homepage",
  featured: {
    eyebrow: featuredInitiative.eyebrow,
    title: featuredInitiative.title,
    dateLabel: featuredInitiative.dateLabel,
    startDate: featuredInitiative.startDate,
    endDate: featuredInitiative.endDate,
    description: featuredInitiative.description,
    actions: clean(featuredInitiative.actions.map(link)),
  },
  featuredFilm: { title: films[0]?.title, description: films[0]?.description },
});

for (const f of projectFamilies) {
  docs.push({
    _id: `projectFamily-${f.slug}`,
    _type: "projectFamily",
    name: f.name,
    slug: f.slug,
    shortName: f.shortName,
    year: f.year,
    line: f.line,
    intro: f.intro,
    items: f.items.map((i) => ({ _key: k(), name: i.name, date: i.date, summary: i.summary, group: i.group, href: i.href, youtubeUrl: i.youtubeUrl ?? undefined })),
    externalLinks: clean(f.externalLinks.map(link)),
    results: f.results.map((r) => ({ _key: k(), ...r })),
    cta: { title: f.cta.title, text: f.cta.text, actions: clean(f.cta.actions.map(link)) },
    related: f.related,
  });
}

organisations.forEach((o, i) =>
  docs.push({
    _id: `organisation-${o.slug}`,
    _type: "organisation",
    name: o.name,
    slug: o.slug,
    registeredName: o.registeredName ?? undefined,
    registrationNumber: o.registrationNumber ?? undefined,
    line: o.line,
    description: o.description ?? undefined,
    relationship: o.relationship,
    website: o.website ?? undefined,
    offeringsTitle: o.offerings.title,
    offerings: o.offerings.items,
    relatedFamilies: o.relatedFamilies,
    enquiryTitle: o.enquiry.title,
    enquiryText: o.enquiry.text,
    enquiryActions: clean(o.enquiry.actions.map(link)),
    order: (i + 1) * 10,
  }),
);

impactStats.forEach((s, i) =>
  docs.push({ _id: `impactStat-${s.id}`, _type: "impactStat", key: s.id, value: s.value ?? undefined, display: s.display, label: s.label, detail: s.detail, href: s.href, source: s.source, asOf: s.asOf, order: (i + 1) * 10 }),
);

timeline.forEach((t, i) =>
  docs.push({ _id: `timeline-${i + 1}`, _type: "timelineEntry", date: t.date, year: t.year, title: t.title, text: t.text, href: t.href, order: (i + 1) * 10 }),
);

pressAssets.forEach((p, i) =>
  docs.push({ _id: `press-${i + 1}`, _type: "pressAsset", label: p.label, description: p.description, format: p.format, order: (i + 1) * 10 }),
);

const json = docs.map((d) => JSON.stringify(d, (_k, v) => (v === undefined ? undefined : v))).join("\n") + "\n";
mkdirSync("studio/seed", { recursive: true });
writeFileSync("studio/seed/content.ndjson", json);
console.log(`Wrote ${docs.length} documents to studio/seed/content.ndjson`);
