import { projectOptions } from "./definitions";

/** Preset amounts in naira. Editable; any custom amount ≥ the minimum is accepted. */
export const presetAmounts = [5000, 10000, 25000, 50000];
export const minimumAmount = 1000;
export const donationProjects = ["Where it’s needed most", ...projectOptions.filter((p) => !p.startsWith("Any"))];
