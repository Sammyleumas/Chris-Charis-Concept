import { defineField, defineType } from "sanity";

/** Photo with required alt text and a crop hotspot. */
export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the photo for people using screen readers.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "credit", title: "Photo credit", type: "string" }),
    defineField({
      name: "consent",
      title: "Consent recorded for everyone identifiable",
      type: "boolean",
      description: "Required under the Nigeria Data Protection Act 2023 before publishing photos of participants.",
      validation: (r) => r.required().custom((v) => (v === true ? true : "Confirm consent before publishing this photo.")),
    }),
  ],
});

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "url",
      type: "string",
      description: "Full https:// link, or a page on this site such as /get-involved/partner",
      validation: (r) => r.required().custom((v) => (!v || v.startsWith("/") || v.startsWith("https://") || v.startsWith("#") ? true : "Use https:// or a path starting with /")),
    }),
    defineField({ name: "external", type: "boolean", initialValue: false }),
  ],
});
