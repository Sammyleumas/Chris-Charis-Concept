"use server";

import { headers } from "next/headers";
import { forms, schemaFor, type FieldDef, type FormKind } from "@/lib/forms/definitions";
import { formValues, rateLimited, validate } from "@/lib/forms/server";
import type { FormState } from "@/lib/forms/types";
import { isEmailConfigured, sendSubmissionEmail } from "@/lib/integrations/email";

/** Shared handler for the contact, volunteer, partner and careers forms. */
export async function submitEnquiry(kind: FormKind, _prev: FormState, formData: FormData): Promise<FormState> {
  if (!(kind in forms)) return { status: "error", message: "Unknown form." };
  const def = forms[kind];
  const values = formValues(formData);

  const result = validate(schemaFor(kind), values);
  if (!result.ok) return result.state;
  const data = result.data as Record<string, string>;

  if (data.company) return { status: "success", message: def.success };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(`${kind}:${ip}`)) {
    return { status: "error", message: "Too many submissions. Please try again in a few minutes.", values };
  }

  if (!isEmailConfigured()) {
    return { status: "error", message: "Online forms are not connected yet. Please try again soon.", values };
  }

  try {
    const fields: Record<string, string | undefined> = {};
    for (const f of def.fields as readonly FieldDef[]) fields[f.label] = data[f.name];
    await sendSubmissionEmail({ subject: def.subject(data), fields, replyTo: data.email });
    return { status: "success", message: def.success };
  } catch (err) {
    console.error(`[${kind}]`, err);
    return { status: "error", message: "We couldn’t send this just now. Please try again.", values };
  }
}
