"use client";

import { forwardRef, useState, type FormEvent } from "react";
import { CircleCheck, CircleAlert } from "lucide-react";
import type { FormState } from "@/lib/forms/types";

/**
 * Error summary (GOV.UK pattern): one short nudge to draw the eye, then a
 * list of every problem linking straight to its field.
 */
export const FormAlert = forwardRef<
  HTMLDivElement,
  { state: FormState; labels: Record<string, string>; visibleErrors: Record<string, string>; className?: string }
>(function FormAlert({ state, labels, visibleErrors, className }, ref) {
  // Same order as the form: fields first, consent last.
  const order = [...Object.keys(labels), "consent"];
  const entries = order.filter((k) => visibleErrors[k]).map((k) => [k, visibleErrors[k]] as const);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="alert"
      className={`anim-nudge rounded-xl border border-[#b42318]/30 bg-[#fef3f2] px-5 py-4 text-sm text-[#7a271a] outline-none ${className ?? ""}`}
    >
      <p className="flex items-center gap-2 font-semibold text-[#b42318]">
        <CircleAlert aria-hidden="true" className="h-4 w-4 shrink-0" />
        {state.message}
      </p>
      {entries.length > 0 && (
        <ul className="mt-2 space-y-1 pl-6">
          {entries.map(([name, msg]) => (
            <li key={name}>
              <a href={`#f-${name}`} className="underline underline-offset-2 hover:text-[#b42318]">
                {msg}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

/** Success panel: rises in, with the tick popping in after it (exaggerated feedback). */
export const FormSuccess = forwardRef<HTMLDivElement, { title: string; message?: string }>(function FormSuccess(
  { title, message },
  ref,
) {
  return (
    <div ref={ref} tabIndex={-1} role="status" className="anim-rise rounded-2xl bg-mist p-8 outline-none">
      <span className="anim-pop grid h-12 w-12 place-items-center rounded-full bg-brand-ink text-white [animation-delay:120ms]">
        <CircleCheck aria-hidden="true" className="h-6 w-6" />
      </span>
      <p className="mt-5 font-display text-xl font-semibold text-ink">{title}</p>
      {message && <p className="mt-2 text-slate-ink">{message}</p>}
    </div>
  );
});

/**
 * Hides a field's error as soon as the visitor starts correcting it
 * (forgiving forms), and resets when a new server response arrives.
 */
export function useLiveErrors(state: FormState) {
  const [edited, setEdited] = useState<Set<string>>(() => new Set());
  const [seen, setSeen] = useState(state);
  if (seen !== state) {
    setSeen(state);
    setEdited(new Set());
  }
  const all = state.fieldErrors ?? {};
  const visible: Record<string, string> = {};
  for (const [k, v] of Object.entries(all)) if (!edited.has(k)) visible[k] = v;
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name;
    if (name && all[name] && !edited.has(name)) setEdited((prev) => new Set(prev).add(name));
  };
  return { errors: visible, onInput };
}
