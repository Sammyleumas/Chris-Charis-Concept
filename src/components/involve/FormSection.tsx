import type { ReactNode } from "react";

/** Two-column layout: intro on the left, form on the right. */
export function FormSection({
  id,
  eyebrow,
  title,
  intro,
  aside,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 py-20 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-brand-ink">{eyebrow}</p>
          <h2 id={`${id}-title`} className="mt-3 text-h2 font-semibold">{title}</h2>
          <div className="mt-5 leading-relaxed text-slate-ink">{intro}</div>
          {aside && <div className="mt-8">{aside}</div>}
        </div>
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </div>
    </section>
  );
}
