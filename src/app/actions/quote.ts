"use server";

import { headers } from "next/headers";
import { quoteSchema } from "@/lib/validation/quote";
import { formValues, rateLimited, validate } from "@/lib/forms/server";
import type { FormState } from "@/lib/forms/types";
import { isEmailConfigured, sendSubmissionEmail } from "@/lib/integrations/email";

export async function requestQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  const result = validate(quoteSchema, values);
  if (!result.ok) return result.state;
  const data = result.data;

  // Honeypot filled: pretend success, store nothing.
  if (data.company) return { status: "success", message: "Thank you. We’ll be in touch." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(`quote:${ip}`)) {
    return { status: "error", message: "Too many requests. Please try again in a few minutes.", values };
  }

  if (!isEmailConfigured()) {
    return {
      status: "error",
      message: "Online quote requests are not connected yet. Please try again soon.",
      values,
    };
  }

  try {
    await sendSubmissionEmail({
      subject: `Quote request: ${data.service} (${data.name})`,
      replyTo: data.email,
      to: process.env.FSH_QUOTES_TO_EMAIL || undefined,
      fields: {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Organisation: data.organisation,
        Service: data.service,
        Timeline: data.timeline,
        Details: data.details,
      },
    });
    return { status: "success", message: "Thank you. Your request has been sent to the Fusion Solutions Hub team." };
  } catch (err) {
    console.error("[quote]", err);
    return { status: "error", message: "We couldn’t send your request just now. Please try again.", values };
  }
}
