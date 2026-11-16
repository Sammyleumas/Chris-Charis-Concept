import { z } from "zod";
import { donationProjects, minimumAmount } from "@/lib/forms/donation-options";

export const donationSchema = z.object({
  frequency: z.enum(["once", "monthly"], { error: "Choose one-off or monthly." }),
  amount: z.coerce
    .number({ error: "Enter an amount in naira." })
    .int("Enter a whole number of naira.")
    .min(minimumAmount, `The minimum gift is ₦${minimumAmount.toLocaleString("en-NG")}.`)
    .max(50_000_000, "For gifts this large, please contact us directly."),
  project: z.enum(donationProjects as [string, ...string[]], { error: "Choose where your gift should go." }),
  name: z.string().min(2, "Enter your full name.").max(120),
  email: z.email("Enter a valid email address for your receipt.").max(254),
  consent: z.literal("on", { error: "Please tick the box to continue." }),
  company: z.string().max(0).optional(),
});
