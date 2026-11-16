"use server";

import { headers } from "next/headers";
import { quoteSchema } from "@/lib/validation/quote";
import { deliverSubmission } from "@/lib/forms/deliver";
import { formValues, rateLimited, validate } from "@/lib/forms/server";
import type { FormState } from "@/lib/forms/types";

const labels = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  organisation: "Organisation",
  service: "Service",
  timeline: "Timeline",
  details: "Details",
};

export async function requestQuote(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  const result = validate(quoteSchema, values);
  if (!result.ok) return result.state;
  const data = result.data;

  if (data.company) return { status: "success", message: "Thank you. We’ll be in touch." };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(`quote:${ip}`)) {
    return { status: "error", message: "Too many requests. Please try again in a few minutes.", values };
  }

  const outcome = await deliverSubmission({
    kind: "quote",
    data: data as unknown as Record<string, string>,
    labels,
    subject: `Quote request: ${data.service} (${data.name})`,
    to: process.env.FSH_QUOTES_TO_EMAIL || undefined,
    ip,
  });

  if (outcome === "delivered") {
    return { status: "success", message: "Thank you. Your request has been sent to the Fusion Solutions Hub team." };
  }
  if (outcome === "not-configured") {
    return { status: "error", message: "Online quote requests are not connected yet. Please try again soon.", values };
  }
  return { status: "error", message: "We couldn’t send your request just now. Please try again.", values };
}
