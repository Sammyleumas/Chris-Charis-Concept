import { z } from "zod";

export const quoteSchema = z.object({
  name: z.string().min(2, "Enter your full name.").max(120),
  email: z.email("Enter a valid email address.").max(254),
  phone: z.string().max(40).optional(),
  organisation: z.string().max(160).optional(),
  service: z.string().min(2, "Tell us which service you need.").max(160),
  details: z.string().min(20, "Describe your project in at least 20 characters.").max(4000),
  timeline: z.string().max(120).optional(),
  consent: z.literal("on", { error: "Please agree so we can contact you about your request." }),
  company: z.string().max(0).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
