"use server";

import { newsletterSchema } from "@/lib/validation/newsletter";
import { isBrevoConfigured, subscribeToBrevo } from "@/lib/integrations/brevo";
import { db, isDatabaseConfigured, schema } from "@/lib/db";

export type FormState = { status: "idle" | "success" | "error"; message?: string };

/** Records consent in the database (when set) and adds the contact to Brevo (when set). */
export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    consent: formData.get("consent"),
    company: formData.get("company") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }
  if (parsed.data.company) return { status: "success", message: "Thank you for subscribing." };

  const email = parsed.data.email.toLowerCase();
  if (!isDatabaseConfigured() && !isBrevoConfigured()) {
    return { status: "error", message: "Newsletter sign-up is not connected yet. Please check back soon." };
  }

  let ok = false;
  if (isDatabaseConfigured()) {
    try {
      await db().insert(schema.newsletterSignups).values({ email }).onConflictDoNothing();
      ok = true;
    } catch (err) {
      console.error("[newsletter] store failed", err);
    }
  }
  if (isBrevoConfigured()) {
    try {
      await subscribeToBrevo(email);
      ok = true;
      if (isDatabaseConfigured()) {
        const { eq } = await import("drizzle-orm");
        await db().update(schema.newsletterSignups).set({ syncedToBrevo: new Date() }).where(eq(schema.newsletterSignups.email, email));
      }
    } catch (err) {
      console.error("[newsletter] Brevo failed", err);
    }
  }

  return ok
    ? { status: "success", message: "Thank you. You’re on the list." }
    : { status: "error", message: "We couldn’t sign you up just now. Please try again." };
}
