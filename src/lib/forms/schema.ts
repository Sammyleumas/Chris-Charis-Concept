import "server-only";
import { z } from "zod";
import { forms, type FieldDef, type FormKind } from "./definitions";

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
