import { TriangleAlert } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import type { LegalDoc } from "@/content/legal/types";

/** Shared layout for legal pages: review banner, contents list, numbered sections. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} subtitle={doc.summary} crumbs={[{ label: doc.title }]} />
      <div className="container-site py-16 lg:py-24">
        {!doc.approved && (
          <div role="note" className="mb-12 flex max-w-3xl gap-4 rounded-xl legal-note border border-[#b54708]/30 bg-[#fffaeb] p-5 text-sm text-[#7a2e0e]">
            <TriangleAlert aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              <strong>Draft for review.</strong> This text describes how this website works and is written with the Nigeria Data Protection Act 2023 in mind. It has not yet been reviewed or approved by a lawyer and must be approved before launch.
            </p>
          </div>
        )}
        <div className="grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-slate-ink">On this page</p>
              <ol className="mt-3 space-y-0.5 text-sm">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="inline-block py-1.5 text-charcoal hover:text-brand-ink">{i + 1}. {s.heading}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <article className="max-w-2xl lg:col-span-8 lg:col-start-5">
            <p className="text-sm text-slate-ink">Last updated: {doc.updated}</p>
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-line pt-8 mt-8 first-of-type:mt-6">
                <h2 className="text-h3 font-semibold">{i + 1}. {s.heading}</h2>
                <div className="mt-4 space-y-4 leading-relaxed text-charcoal">
                  {s.body.map((b, j) =>
                    Array.isArray(b) ? (
                      <ul key={j} className="list-disc space-y-2 pl-5">
                        {b.map((li) => <li key={li}>{li}</li>)}
                      </ul>
                    ) : (
                      <p key={j}>{b}</p>
                    ),
                  )}
                  {s.review && (
                    <p className="rounded-lg legal-note border border-dashed border-[#b54708]/40 bg-[#fffaeb] px-4 py-3 text-sm text-[#7a2e0e]">
                      <strong>To confirm:</strong> {s.review}
                    </p>
                  )}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
