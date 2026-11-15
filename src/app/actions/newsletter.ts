"use server";

import { newsletterSchema } from "@/lib/validation/newsletter";
import { isBrevoConfigured, subscribeToBrevo } from "@/lib/integrations/brevo";

export type FormState = { status: "idle" | "success" | "error"; message?: string };

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    consent: formData.get("consent"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  // Bots fill the hidden field; respond as if successful and do nothing.
  if (parsed.data.company) return { status: "success", message: "Thank you for subscribing." };

  if (!isBrevoConfigured()) {
    return {
      status: "error",
      message: "Newsletter sign-up is not connected yet. Please check back soon.",
    };
  }

  try {
    await subscribeToBrevo(parsed.data.email);
    return { status: "success", message: "Thank you. You’re on the list." };
  } catch (err) {
    console.error("[newsletter]", err);
    return { status: "error", message: "We couldn’t sign you up just now. Please try again." };
  }
}
