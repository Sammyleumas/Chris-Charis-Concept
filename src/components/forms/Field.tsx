import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-lg border bg-white px-4 py-3 text-[0.95rem] text-ink placeholder:text-slate-ink/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25";

type Base = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
};

function Wrapper({ name, label, error, hint, required, className, children }: Base & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-brand-ink"> *</span> : <span className="font-normal text-slate-ink"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`f-${name}-hint`} className="mt-1.5 text-xs text-slate-ink">{hint}</p>}
      {error && (
        <p id={`f-${name}-error`} className="mt-1.5 text-sm font-medium text-[#b42318]">{error}</p>
      )}
    </div>
  );
}

const describedBy = (name: string, error?: string, hint?: string) =>
  error ? `f-${name}-error` : hint ? `f-${name}-hint` : undefined;

export function TextField({
  type = "text",
  autoComplete,
  ...props
}: Base & { type?: "text" | "email" | "tel" | "url"; autoComplete?: string }) {
  const { name, error, hint, required, defaultValue } = props;
  return (
    <Wrapper {...props}>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={cn(control, error ? "border-[#b42318]" : "border-line")}
      />
    </Wrapper>
  );
}

export function TextArea({ rows = 5, ...props }: Base & { rows?: number }) {
  const { name, error, hint, required, defaultValue } = props;
  return (
    <Wrapper {...props}>
      <textarea
        id={`f-${name}`}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={cn(control, "resize-y", error ? "border-[#b42318]" : "border-line")}
      />
    </Wrapper>
  );
}

export function Consent({ name = "consent", error, children }: { name?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-charcoal">
        <input
          type="checkbox"
          name={name}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `f-${name}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-brand"
        />
        <span>{children}</span>
      </label>
      {error && <p id={`f-${name}-error`} className="mt-1.5 text-sm font-medium text-[#b42318]">{error}</p>}
    </div>
  );
}

/** Hidden field that only bots fill in. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
