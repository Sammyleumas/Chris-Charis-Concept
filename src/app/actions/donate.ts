"use server";

import { donationSchema } from "@/lib/validation/donation";
import { formValues, validate } from "@/lib/forms/server";
import type { FormState } from "@/lib/forms/types";

/**
 * Starts a donation. Phase 11 connects this to Paystack: it will create a
 * transaction (or subscription for monthly gifts) on the server, redirect to
 * Paystack's checkout, and confirm payment only after server-side
 * verification. Until the keys are configured, no payment is attempted.
 */
export async function startDonation(_prev: FormState, formData: FormData): Promise<FormState> {
  const values = formValues(formData);
  const result = validate(donationSchema, values);
  if (!result.ok) return result.state;
  if (result.data.company) return { status: "error", message: "Something went wrong." };

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return {
      status: "error",
      message: "Online giving is not connected yet. No payment has been taken. Please check back soon or contact us to give.",
      values,
    };
  }

  // Paystack initialisation is implemented in Phase 11.
  return { status: "error", message: "Online giving is being set up. No payment has been taken.", values };
}
