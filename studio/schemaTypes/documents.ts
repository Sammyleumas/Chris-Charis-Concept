import { defineArrayMember, defineField, defineType } from "sanity";

const FAMILY_SLUGS = ["film-for-social-change", "healthy-heart", "learn-to-lead", "fusion", "chris-charis-brand"];
const order = defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 });

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [{ name: "contact", default: true }, { name: "links" }, { name: "statements" }, { name: "hero" }],
  fields: [
    defineField({ name: "email", title: "Official email", type: "string", group: "contact" }),
    defineField({ name: "phone", title: "Official phone", type: "string", group: "contact" }),
    defineField({ name: "streetAddress", title: "Street address (Benin City)", type: "string", group: "contact" }),
    defineField({
      name: "socials",
      title: "Social media",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "platform", type: "string", options: { list: ["instagram", "facebook", "linkedin", "x", "tiktok", "youtube", "whatsapp", "telegram"] }, validation: (r) => r.required() }),
            defineField({ name: "url", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    ...["youtubeChannel", "hhcpWebsite", "soulWebsite", "fusionBootcamp", "fusionVote", "fusionConnectAcademy", "maybeChallengeTiktok"].map((name) =>
      defineField({ name, type: "url", group: "links" }),
    ),
    defineField({ name: "vision", type: "text", rows: 3, group: "statements", description: "Founder-approved wording only." }),
    defineField({ name: "mission", type: "text", rows: 3, group: "statements" }),
    defineField({ name: "tagline", type: "string", group: "statements" }),
    defineField({ name: "motto", type: "string", group: "statements" }),
    defineField({
      name: "values",
      type: "array",
      group: "statements",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "name", type: "string" }), defineField({ name: "text", type: "text", rows: 2 })] })],
    }),
    defineField({ name: "heroVideoUrl", title: "Hero video URL", type: "url", group: "hero", description: "Optimised MP4/WebM on an approved video host (e.g. Cloudinary). About 20 seconds, no sound needed." }),
    defineField({ name: "heroPoster", title: "Hero poster image", type: "photo", group: "hero" }),
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      group: "hero",
      description: "Homepage slideshow, in order. Four to six strong landscape photos work best.",
      validation: (r) => r.max(8),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", type: "photo", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Caption", type: "string", description: "e.g. Fusion: Art Meets Tech · 2025", validation: (r) => r.required() }),
            defineField({ name: "href", title: "Caption link", type: "string", description: "A page on this site, e.g. /our-work/fusion" }),
            defineField({ name: "eyebrow", title: "Hero label", type: "string", description: "Small line above the headline while this slide shows. Leave empty to keep the first slide's." }),
            defineField({ name: "titleBold", title: "Headline, first line", type: "string" }),
            defineField({ name: "titleLight", title: "Headline, second line", type: "string" }),
            defineField({ name: "text", title: "Hero text", type: "text", rows: 2, validation: (r) => r.max(160) }),
            defineField({ name: "ctaLabel", title: "Button label", type: "string", description: "e.g. Explore Healthy Heart" }),
            defineField({ name: "ctaHref", title: "Button link", type: "string", description: "A page on this site, e.g. /our-work/healthy-heart" }),
          ],
          preview: { select: { title: "label", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "featured",
      title: "Featured initiative",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string", initialValue: "Featured now" }),
        defineField({ name: "title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "dateLabel", title: "Date as shown", type: "string" }),
        defineField({ name: "startDate", type: "date" }),
        defineField({ name: "endDate", type: "date" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "image", type: "photo" }),
        defineField({ name: "actions", type: "array", of: [defineArrayMember({ type: "link" })], validation: (r) => r.max(3) }),
      ],
    }),
    defineField({
      name: "featuredFilm",
      title: "Latest film",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url" }),
        defineField({ name: "poster", type: "photo" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});

export const projectFamily = defineType({
  name: "projectFamily",
  title: "Project family",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "string", options: { list: FAMILY_SLUGS }, validation: (r) => r.required(), readOnly: ({ currentUser }) => !currentUser?.roles.some((x) => x.name === "administrator") }),
    defineField({ name: "shortName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", type: "number", validation: (r) => r.required().integer().min(2020) }),
    defineField({ name: "line", title: "One-line summary", type: "string", validation: (r) => r.required().max(140) }),
    defineField({ name: "intro", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "accent", title: "Accent colour (hex, from the project logo)", type: "string", validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/) }),
    defineField({ name: "image", type: "photo" }),
    defineField({
      name: "items",
      title: "Editions and outputs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "date", type: "string" }),
            defineField({ name: "summary", type: "text", rows: 2 }),
            defineField({ name: "group", type: "string", description: "Fusion only: Programmes, Editions or Enterprises" }),
            defineField({ name: "href", title: "Link", type: "string" }),
            defineField({ name: "youtubeUrl", title: "YouTube URL (films)", type: "url" }),
          ],
          preview: { select: { title: "name", subtitle: "date" } },
        }),
      ],
    }),
    defineField({ name: "externalLinks", type: "array", of: [defineArrayMember({ type: "link" })] }),
    defineField({
      name: "results",
      type: "array",
      description: "Verified figures only, each with its source.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "source", type: "string", validation: (r) => r.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "gallery", type: "array", of: [defineArrayMember({ type: "photo" })] }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 2 }),
        defineField({ name: "actions", type: "array", of: [defineArrayMember({ type: "link" })] }),
      ],
    }),
    defineField({ name: "related", type: "array", of: [defineArrayMember({ type: "string" })], options: { list: FAMILY_SLUGS } }),
  ],
  orderings: [{ title: "Year", name: "year", by: [{ field: "year", direction: "asc" }] }],
});

export const organisation = defineType({
  name: "organisation",
  title: "Organisation",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "string", options: { list: ["social-enterprise", "fusion-connect-academy", "fusion-solutions-hub", "chris-charis-brand", "soul"] }, validation: (r) => r.required() }),
    defineField({ name: "registeredName", type: "string", description: "Only as shown on CAC records." }),
    defineField({ name: "registrationNumber", type: "string" }),
    defineField({ name: "line", type: "string" }),
    defineField({ name: "description", type: "text", rows: 5 }),
    defineField({ name: "relationship", type: "string" }),
    defineField({ name: "image", type: "photo" }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "offeringsTitle", type: "string" }),
    defineField({ name: "offerings", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "relatedFamilies", type: "array", of: [defineArrayMember({ type: "string" })], options: { list: FAMILY_SLUGS } }),
    defineField({ name: "enquiryTitle", type: "string" }),
    defineField({ name: "enquiryText", type: "text", rows: 2 }),
    defineField({ name: "enquiryActions", type: "array", of: [defineArrayMember({ type: "link" })] }),
    order,
  ],
});

export const impactStat = defineType({
  name: "impactStat",
  title: "Impact figure",
  type: "document",
  description: "Review quarterly against the M&E tracker.",
  fields: [
    defineField({ name: "key", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", title: "Number (for count-up)", type: "number" }),
    defineField({ name: "display", title: "Shown as", type: "string", description: "Exactly as displayed, e.g. 26 or 1,200+", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", type: "string" }),
    defineField({ name: "href", title: "Evidence link", type: "string" }),
    defineField({ name: "source", type: "string", validation: (r) => r.required() }),
    defineField({ name: "asOf", title: "As of", type: "string", validation: (r) => r.required() }),
    order,
  ],
  preview: { select: { title: "display", subtitle: "label" } },
});

export const timelineEntry = defineType({
  name: "timelineEntry",
  title: "Timeline entry",
  type: "document",
  fields: [
    defineField({ name: "date", title: "Date as shown", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 2 }),
    defineField({ name: "href", type: "string" }),
    order,
  ],
  orderings: [{ title: "Chronological", name: "chron", by: [{ field: "year", direction: "asc" }, { field: "order", direction: "asc" }] }],
});

export const impactStory = defineType({
  name: "impactStory",
  title: "Impact story",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "family", type: "string", options: { list: FAMILY_SLUGS }, validation: (r) => r.required() }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "photo", type: "photo" }),
    defineField({ name: "outcome", title: "Verified outcome", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "consent",
      type: "string",
      options: { list: ["pending", "granted", "declined"], layout: "radio" },
      initialValue: "pending",
      description: "Only stories marked “granted” appear on the website.",
      validation: (r) => r.required(),
    }),
  ],
});

export const report = defineType({
  name: "report",
  title: "Annual report",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "period", type: "string", description: "e.g. FY2026/27", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "file", type: "file", options: { accept: "application/pdf" }, validation: (r) => r.required() }),
    defineField({ name: "publishedOn", type: "date", validation: (r) => r.required() }),
  ],
});

export const post = defineType({
  name: "post",
  title: "News & blog post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 2, validation: (r) => r.required().max(240) }),
    defineField({ name: "date", type: "date", validation: (r) => r.required() }),
    defineField({ name: "category", type: "string", options: { list: ["News", "Blog", "Event", "Press"] }, validation: (r) => r.required() }),
    defineField({ name: "author", type: "string" }),
    defineField({ name: "image", type: "photo" }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }], lists: [] })] }),
  ],
  orderings: [{ title: "Newest", name: "date", by: [{ field: "date", direction: "desc" }] }],
});

export const pressAsset = defineType({
  name: "pressAsset",
  title: "Press kit file",
  type: "document",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "string" }),
    defineField({ name: "file", type: "file" }),
    defineField({ name: "format", type: "string" }),
    order,
  ],
});

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "group", type: "string", options: { list: ["leadership", "department"], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "department", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 4 }),
    defineField({ name: "photo", type: "photo" }),
    defineField({ name: "links", type: "array", of: [defineArrayMember({ type: "link" })] }),
    order,
  ],
});

export const partner = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", validation: (r) => r.required() }),
    defineField({ name: "collaboration", title: "What we did together", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "permission", title: "Permission to display logo", type: "boolean", validation: (r) => r.required().custom((v) => (v ? true : "Confirm permission before publishing.")) }),
    order,
  ],
});

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  description: "Event pages such as Fusion: Art Meets Tech. Empty fields show “to be announced” on the site.",
  groups: [{ name: "basics", default: true }, { name: "programme" }, { name: "people" }, { name: "faq" }],
  fields: [
    defineField({ name: "title", type: "string", group: "basics", validation: (r) => r.required() }),
    defineField({ name: "edition", type: "string", group: "basics", description: "e.g. 2026", validation: (r) => r.required() }),
    defineField({ name: "startsAt", title: "Starts", type: "datetime", group: "basics", validation: (r) => r.required() }),
    defineField({ name: "endsAt", title: "Ends", type: "datetime", group: "basics", validation: (r) => r.required() }),
    defineField({ name: "dateLabel", title: "Dates as shown", type: "string", group: "basics" }),
    defineField({ name: "venue", type: "string", group: "basics", description: "Leave empty until confirmed." }),
    defineField({ name: "city", type: "string", group: "basics" }),
    defineField({ name: "summary", type: "text", rows: 3, group: "basics" }),
    defineField({ name: "hero", type: "photo", group: "basics" }),
    defineField({ name: "applyUrl", title: "Apply link", type: "url", group: "basics" }),
    defineField({ name: "voteUrl", title: "Vote link", type: "url", group: "basics" }),
    defineField({
      name: "days",
      type: "array",
      group: "programme",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "date", type: "date", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string" }),
            defineField({
              name: "sessions",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "time", type: "string", description: "e.g. 10:00" }),
                    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "detail", type: "string" }),
                    defineField({ name: "speaker", type: "string" }),
                  ],
                  preview: { select: { title: "title", subtitle: "time" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "label", subtitle: "date" } },
        }),
      ],
    }),
    defineField({
      name: "speakers",
      title: "Speakers and facilitators",
      type: "array",
      group: "people",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", type: "string", validation: (r) => r.required() }),
            defineField({ name: "bio", type: "text", rows: 2 }),
            defineField({ name: "photo", type: "photo" }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo" } },
        }),
      ],
    }),
    defineField({
      name: "sponsors",
      type: "array",
      group: "people",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "logo", type: "image", validation: (r) => r.required() }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "name", media: "logo" } },
        }),
      ],
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "faq",
      of: [defineArrayMember({ type: "object", fields: [defineField({ name: "q", title: "Question", type: "string" }), defineField({ name: "a", title: "Answer", type: "text", rows: 2 })] })],
    }),
  ],
  preview: { select: { title: "title", subtitle: "edition" } },
});
