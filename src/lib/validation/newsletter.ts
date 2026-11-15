import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address.").max(254),
  consent: z.literal("on", { error: "Please confirm you agree to receive emails." }),
  /** Honeypot: must stay empty. */
  company: z.string().max(0).optional(),
});
