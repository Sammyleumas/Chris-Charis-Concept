import { z } from "zod";
import { projectOptions } from "@/lib/forms/definitions";

/** Preset amounts in naira. Editable; any custom amount ≥ the minimum is accepted. */
export const presetAmounts = [5000, 10000, 25000, 50000];
export const minimumAmount = 1000;
export const donationProjects = ["Where it’s needed most", ...projectOptions.filter((p) => !p.startsWith("Any"))];

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
