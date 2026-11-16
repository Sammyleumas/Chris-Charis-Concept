"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { LoaderCircle } from "lucide-react";
import { FormAlert, FormSuccess, useLiveErrors } from "./FormFeedback";
import { requestQuote } from "@/app/actions/quote";
import { initialFormState, type FormState } from "@/lib/forms/types";
import { Consent, Honeypot, TextArea, TextField } from "./Field";
import { events, track } from "@/lib/analytics";

export function QuoteRequestForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(requestQuote, initialFormState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const { errors: e, onInput } = useLiveErrors(state);
  const labels = { name: "Full name", email: "Email", phone: "Phone", organisation: "Organisation", service: "Service", details: "Project details", timeline: "Timeline" };
  const v = state.values ?? {};

  // Move focus to the result so screen-reader and keyboard users hear it.
  useEffect(() => {
    if (state.status !== "idle") summaryRef.current?.focus();
    if (state.status === "success") track(events.quote);
  }, [state]);

  if (state.status === "success") {
    return (
      <FormSuccess ref={summaryRef} title="Request sent" message={state.message} />
    );
  }

  return (
    <form
      noValidate
      onInput={onInput}
      // Submitted manually so React does not clear the fields after an error.
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => action(data));
      }}
      className="relative grid gap-6 sm:grid-cols-2"
    >
      {state.status === "error" && (
        <FormAlert ref={summaryRef} state={state} labels={labels} visibleErrors={state.fieldErrors ?? {}} className="sm:col-span-2" />
      )}
      <TextField name="name" label="Full name" required autoComplete="name" error={e.name} defaultValue={v.name} />
      <TextField name="email" type="email" label="Email" required autoComplete="email" error={e.email} defaultValue={v.email} />
      <TextField name="phone" type="tel" label="Phone" autoComplete="tel" error={e.phone} defaultValue={v.phone} />
      <TextField name="organisation" label="Organisation" autoComplete="organization" error={e.organisation} defaultValue={v.organisation} />
      <TextField name="service" label="Service you need" required error={e.service} defaultValue={v.service} className="sm:col-span-2" hint="For example: a website, brand content, training, or something else." />
      <TextArea name="details" label="Project details" required error={e.details} defaultValue={v.details} className="sm:col-span-2" hint="What do you need, who is it for, and what does success look like?" />
      <TextField name="timeline" label="Timeline" error={e.timeline} defaultValue={v.timeline} className="sm:col-span-2" hint="When do you need this by?" />
      <Honeypot />
      <div className="sm:col-span-2">
        <Consent error={e.consent}>
          I agree that Fusion Solutions Hub may use these details to respond to my request, as described in the{" "}
          <Link href="/privacy" className="font-medium text-brand-ink underline underline-offset-2">privacy policy</Link>.
        </Consent>
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-ink px-7 font-semibold text-white tap hover:bg-brand-deep disabled:opacity-70"
        >
          {pending && <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {pending ? "Sending…" : "Request a quote"}
        </button>
      </div>
    </form>
  );
}
