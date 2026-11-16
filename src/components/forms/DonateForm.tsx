"use client";

import { ButtonEyes } from "@/components/ui/ButtonEyes";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";
import { startDonation } from "@/app/actions/donate";
import { donationProjects, minimumAmount, presetAmounts } from "@/lib/forms/donation-options";
import { initialFormState, type FormState } from "@/lib/forms/types";
import { Consent, Honeypot, SelectField, TextField } from "./Field";
import { FormAlert, useLiveErrors } from "./FormFeedback";
import { cn } from "@/lib/cn";
import { events, track } from "@/lib/analytics";

const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export function DonateForm() {
  const [state, dispatch, pending] = useActionState<FormState, FormData>(startDonation, initialFormState);
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<string>(String(presetAmounts[1]));
  const alertRef = useRef<HTMLDivElement>(null);
  const { errors: e, onInput } = useLiveErrors(state);
  const labels = { amount: "Amount", project: "Project", name: "Full name", email: "Email" };
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status === "error") alertRef.current?.focus();
  }, [state]);

  const numeric = Number(amount.replace(/[^\d]/g, ""));
  const preset = presetAmounts.includes(numeric);

  return (
    <form
      noValidate
      onInput={onInput}
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        track(events.donationStart, { frequency, value: numeric, currency: "NGN", project: String(data.get("project") ?? "") });
        startTransition(() => dispatch(data));
      }}
      className="relative space-y-8"
    >
      {state.status === "error" && (
        <FormAlert ref={alertRef} state={state} labels={labels} visibleErrors={state.fieldErrors ?? {}} />
      )}

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">How often?</legend>
        <input type="hidden" name="frequency" value={frequency} />
        <div className="grid grid-cols-2 rounded-full bg-white p-1 ring-1 ring-line">
          {(["once", "monthly"] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={frequency === f}
              onClick={() => setFrequency(f)}
              className={cn("h-11 rounded-full text-sm font-semibold tap", frequency === f ? "bg-ink text-white" : "text-charcoal hover:text-ink")}
            >
              {f === "once" ? "One-off" : "Monthly"}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-ink">Amount</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {presetAmounts.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={numeric === a}
              onClick={() => setAmount(String(a))}
              className={cn(
                "h-12 rounded-xl text-sm font-semibold tabular-nums ring-1 tap",
                numeric === a ? "bg-brand-ink text-white ring-brand-ink" : "bg-white text-ink ring-line hover:ring-ink/40",
              )}
            >
              {naira(a)}
            </button>
          ))}
        </div>
        <label htmlFor="f-amount" className="mt-4 block text-sm font-medium text-charcoal">
          {preset ? "Or enter another amount" : "Your amount"} (₦, minimum {naira(minimumAmount)})
        </label>
        <div className={cn("mt-2 flex items-center rounded-lg border bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/25", e.amount ? "border-[#b42318]" : "border-line")}>
          <span className="pl-4 font-semibold text-slate-ink" aria-hidden="true">₦</span>
          <input
            id="f-amount"
            name="amount"
            inputMode="numeric"
            value={numeric ? numeric.toLocaleString("en-NG") : ""}
            onChange={(ev) => setAmount(ev.target.value.replace(/[^\d]/g, ""))}
            aria-invalid={e.amount ? true : undefined}
            aria-describedby={e.amount ? "f-amount-error" : undefined}
            className="w-full bg-transparent px-2 py-3 text-ink tabular-nums outline-none"
          />
          {frequency === "monthly" && <span className="pr-4 text-sm text-slate-ink">/month</span>}
        </div>
        {e.amount && <p id="f-amount-error" className="mt-1.5 text-sm font-medium text-[#b42318]">{e.amount}</p>}
      </fieldset>

      <SelectField name="project" label="Direct my gift to" required options={donationProjects} error={e.project} defaultValue={v.project ?? donationProjects[0]} />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label="Full name" required autoComplete="name" error={e.name} defaultValue={v.name} />
        <TextField name="email" type="email" label="Email for your receipt" required autoComplete="email" error={e.email} defaultValue={v.email} />
      </div>
      <Honeypot />
      <Consent error={e.consent}>
        I agree that Chris Charis Concept may process my details to handle this donation and send a receipt, as described in the{" "}
        <Link href="/privacy" className="font-medium text-brand-ink underline underline-offset-2">privacy policy</Link>.
      </Consent>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="btn-primary relative inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-16 text-base font-semibold text-white tap hover:bg-brand-deep disabled:opacity-80"
      >
        <Lock aria-hidden="true" className="h-4 w-4" />
        {numeric >= minimumAmount ? `Give ${naira(numeric)}${frequency === "monthly" ? " monthly" : ""}` : "Continue"}
        <ButtonEyes size="lg" busy={pending} className="absolute right-3" />
      </button>
      <p className="text-center text-xs text-slate-ink">
        Payments are processed securely by Paystack. We never see or store your card details.
      </p>
    </form>
  );
}
