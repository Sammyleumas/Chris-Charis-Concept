"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { submitEnquiry } from "@/app/actions/enquiry";
import { forms, type FieldDef, type FormKind } from "@/lib/forms/definitions";
import { initialFormState, type FormState } from "@/lib/forms/types";
import { Consent, Honeypot, SelectField, TextArea, TextField } from "./Field";
import { events, track } from "@/lib/analytics";

/**
 * Renders any enquiry form from its definition. `prefill` sets a select
 * from the page URL (e.g. /get-involved/partner?interest=fusion) after load,
 * so the page itself stays statically rendered.
 */
export function EnquiryForm({
  kind,
  submitLabel,
  prefill,
}: {
  kind: FormKind;
  submitLabel: string;
  prefill?: { param: string; field: string; values: Record<string, string> };
}) {
  const action = submitEnquiry.bind(null, kind);
  const [state, dispatch, pending] = useActionState<FormState, FormData>(action, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const def = forms[kind];
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status !== "idle") summaryRef.current?.focus();
    if (state.status === "success") track(events[kind]);
  }, [state, kind]);

  useEffect(() => {
    if (!prefill || !formRef.current) return;
    const option = prefill.values[new URLSearchParams(window.location.search).get(prefill.param) ?? ""];
    const select = formRef.current.querySelector<HTMLSelectElement>(`select[name="${prefill.field}"]`);
    if (option && select) select.value = option;
  }, [prefill]);

  if (state.status === "success") {
    return (
      <div ref={summaryRef} tabIndex={-1} role="status" className="rounded-2xl bg-mist p-8 outline-none">
        <CircleCheck aria-hidden="true" className="h-8 w-8 text-brand-ink" />
        <p className="mt-4 font-display text-xl font-semibold text-ink">Sent</p>
        <p className="mt-2 text-slate-ink">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        startTransition(() => dispatch(data));
      }}
      className="relative grid gap-6 sm:grid-cols-2"
    >
      {state.status === "error" && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-[#b42318]/30 bg-[#fef3f2] px-4 py-3 text-sm font-medium text-[#b42318] outline-none sm:col-span-2">
          {state.message}
        </div>
      )}
      {(def.fields as readonly FieldDef[]).map((f) => {
        const common = { name: f.name, label: f.label, required: f.required, error: e[f.name], defaultValue: v[f.name], hint: f.hint };
        if (f.type === "textarea") return <TextArea key={f.name} {...common} rows={f.rows} className="sm:col-span-2" />;
        if (f.type === "select")
          return (
            <SelectField
              key={f.name}
              {...common}
              options={f.options}
              className={f.wide ? "sm:col-span-2" : undefined}
            />
          );
        return <TextField key={f.name} {...common} type={f.type} autoComplete={"autoComplete" in f ? f.autoComplete : undefined} className={f.wide ? "sm:col-span-2" : undefined} />;
      })}
      <Honeypot />
      <div className="sm:col-span-2">
        <Consent error={e.consent}>
          {def.consentText} See our{" "}
          <Link href="/privacy" className="font-medium text-brand-ink underline underline-offset-2">privacy policy</Link>.
        </Consent>
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-ink px-7 font-semibold text-white transition-colors hover:bg-brand-deep disabled:opacity-70"
        >
          {pending && <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />}
          {pending ? "Sending…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
