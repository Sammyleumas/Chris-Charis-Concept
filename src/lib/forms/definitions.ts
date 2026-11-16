import { z } from "zod";

/**
 * Enquiry forms (brief §5.6, §9). One definition per form drives both the
 * rendered fields and the server-side schema, so they cannot drift apart.
 * Select options are editable here (or in the CMS from Phase 11).
 */

export type FieldDef =
  | { name: string; label: string; type: "text" | "email" | "tel" | "url"; required?: boolean; autoComplete?: string; hint?: string; wide?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; hint?: string; rows?: number }
  | { name: string; label: string; type: "select"; required?: boolean; options: string[]; hint?: string; wide?: boolean };

const name = { name: "name", label: "Full name", type: "text", required: true, autoComplete: "name" } as const;
const email = { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" } as const;
const phone = { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" } as const;

export const projectOptions = [
  "Film for Social Change",
  "Healthy Heart Community Project",
  "Learn To Lead → SOUL",
  "Fusion Creative Project",
  "Fusion: Art Meets Tech 2026",
  "The Chris Charis Brand",
  "Any / not sure yet",
];

export const forms = {
  contact: {
    title: "Contact",
    subject: (v: Record<string, string>) => `Website enquiry: ${v.subject}`,
    success: "Thank you. Your message has been sent and we’ll reply by email.",
    consentText: "I agree that Chris Charis Concept may use these details to respond to my message.",
    fields: [
      name,
      email,
      { name: "subject", label: "Subject", type: "text", required: true, wide: true },
      { name: "message", label: "Message", type: "textarea", required: true, rows: 6 },
    ] satisfies FieldDef[],
  },
  volunteer: {
    title: "Volunteer application",
    subject: (v: Record<string, string>) => `Volunteer application: ${v.name}`,
    success: "Thank you for applying to volunteer. We’ll be in touch about upcoming opportunities.",
    consentText: "I agree that Chris Charis Concept may use these details to process my volunteer application.",
    fields: [
      name,
      email,
      phone,
      { name: "location", label: "City or town", type: "text", autoComplete: "address-level2" },
      {
        name: "area",
        label: "Where would you like to help?",
        type: "select",
        required: true,
        options: ["Film production", "Community outreach", "Events", "Communications and media", "Training and mentoring", "Anywhere I’m needed"],
      },
      { name: "availability", label: "Availability", type: "select", options: ["Weekdays", "Weekends", "Evenings", "Flexible"] },
      { name: "experience", label: "Skills and experience", type: "textarea", required: true, hint: "Tell us what you’d bring, in a few sentences." },
    ] satisfies FieldDef[],
  },
  partner: {
    title: "Partnership enquiry",
    subject: (v: Record<string, string>) => `Partnership enquiry: ${v.organisation || v.name} (${v.interest})`,
    success: "Thank you. Our partnerships team will reply to discuss next steps.",
    consentText: "I agree that Chris Charis Concept may use these details to respond to my enquiry.",
    fields: [
      name,
      email,
      phone,
      { name: "organisation", label: "Organisation", type: "text", required: true, autoComplete: "organization" },
      {
        name: "interest",
        label: "Type of partnership",
        type: "select",
        required: true,
        options: ["Sponsorship", "Programme partnership", "Film collaboration", "In-kind support", "Other"],
      },
      { name: "project", label: "Project of interest", type: "select", options: projectOptions },
      { name: "message", label: "How would you like to work together?", type: "textarea", required: true, rows: 5 },
    ] satisfies FieldDef[],
  },
  careers: {
    title: "Careers and facilitators",
    subject: (v: Record<string, string>) => `${v.role}: ${v.name}`,
    success: "Thank you. We’ve received your application and will contact you if there’s a match.",
    consentText: "I agree that Chris Charis Concept may keep these details to consider me for current and future roles.",
    fields: [
      name,
      email,
      phone,
      {
        name: "role",
        label: "I’m applying as",
        type: "select",
        required: true,
        options: ["Facilitator", "Staff or career enquiry", "Internship enquiry"],
      },
      { name: "expertise", label: "Area of expertise", type: "text", required: true, wide: true, hint: "For example: film editing, leadership coaching, web development." },
      { name: "portfolio", label: "CV or portfolio link", type: "url", wide: true, hint: "A link to your CV, LinkedIn or portfolio. Please don’t send documents by email." },
      { name: "message", label: "Why would you like to work with us?", type: "textarea", required: true },
    ] satisfies FieldDef[],
  },
} as const;

export type FormKind = keyof typeof forms;

/** Builds the Zod schema for a form from its field definitions. */
export function schemaFor(kind: FormKind) {
  const shape: Record<string, z.ZodType> = {
    consent: z.literal("on", { error: "Please tick the box to agree." }),
    company: z.string().max(0).optional(),
  };
  for (const f of forms[kind].fields as readonly FieldDef[]) {
    let s: z.ZodType;
    if (f.type === "email") s = z.email("Enter a valid email address.").max(254);
    else if (f.type === "url") s = z.union([z.literal(""), z.url("Enter a full link starting with https://").max(500)]);
    else if (f.type === "select") s = z.enum(f.options as [string, ...string[]], { error: `Choose an option for “${f.label}”.` });
    else if (f.type === "textarea") s = z.string().max(5000);
    else s = z.string().max(200);

    if (f.required) {
      if (f.type === "textarea") s = z.string().min(10, `Please write at least 10 characters for “${f.label}”.`).max(5000);
      else if (f.type === "text" || f.type === "tel") s = z.string().min(2, `Enter your ${f.label.toLowerCase()}.`).max(200);
    } else if (f.type === "select") {
      s = z.union([z.literal(""), s]);
    }
    shape[f.name] = f.required ? s : s.optional();
  }
  return z.object(shape);
}
