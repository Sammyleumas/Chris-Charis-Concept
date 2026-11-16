"use client";

import Link from "next/link";
import { useActionState, useEffect, useId } from "react";
import { events, track } from "@/lib/analytics";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { subscribe, type FormState } from "@/app/actions/newsletter";
import { cn } from "@/lib/cn";

export function NewsletterForm({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, { status: "idle" });
  const id = useId();
  const onDark = tone === "dark";

  useEffect(() => {
    if (state.status === "success") track(events.newsletter, { method: "newsletter_form" });
  }, [state]);

  if (state.status === "success") {
    return (
      <p role="status" className={cn("flex items-center gap-2 text-sm font-medium", onDark ? "text-mist" : "text-brand-ink")}>
        <Check aria-hidden="true" className="h-4 w-4" /> {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate className="w-full">
      <div className={cn("flex rounded-full p-1 ring-1", onDark ? "bg-white/5 ring-white/20 focus-within:ring-white/60" : "bg-white ring-ink/15 focus-within:ring-brand")}>
        <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          aria-describedby={state.status === "error" ? `${id}-msg` : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-4 text-sm outline-none",
            onDark ? "text-white placeholder:text-white/60" : "text-ink placeholder:text-slate-ink",
          )}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-brand-ink px-4 text-sm font-semibold text-white tap hover:bg-brand-deep disabled:opacity-70"
        >
          {pending ? <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
          Subscribe
          {!pending && <ArrowRight aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>
      {/* Honeypot for bots: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className={cn("mt-3 flex items-start gap-2.5 text-xs leading-relaxed", onDark ? "text-white/65" : "text-slate-ink")}>
        <input type="checkbox" name="consent" required className="mt-0.5 h-5 w-5 shrink-0 accent-brand" />
        <span>
          I agree to receive email updates and accept the{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-current">privacy policy</Link>. Unsubscribe any time.
        </span>
      </label>
      {state.status === "error" && (
        <p id={`${id}-msg`} role="alert" className={cn("mt-2 text-xs font-medium", onDark ? "text-[#ffb4a8]" : "text-[#b42318]")}>
          {state.message}
        </p>
      )}
    </form>
  );
}
