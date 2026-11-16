import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { InvolveNav } from "@/components/involve/InvolveNav";
import { FormSection } from "@/components/involve/FormSection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = pageMeta({
  title: "Partner & Sponsor",
  description: "Partner with or sponsor Chris Charis Concept programmes in film, health, leadership and creative technology.",
  path: "/get-involved/partner",
});

/** Set when the approved sponsorship tier PDF is supplied (brief §5.6). */
const sponsorshipTiersPdf: string | null = null;

const options = [
  ["Sponsorship", "Back a programme or event such as Fusion: Art Meets Tech, with visibility for your organisation."],
  ["Programme partnership", "Co-design and deliver a programme with us in health, leadership or creative technology."],
  ["Film collaboration", "Commission or co-produce a film that raises awareness of an issue you care about."],
  ["In-kind support", "Provide equipment, venues, expertise or services that help our projects run."],
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Partner & Sponsor"
        subtitle="Grow impact together."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Partner & Sponsor" }]}
      />
      <InvolveNav current="/get-involved/partner" />
      <section aria-labelledby="ways-title" className="bg-paper py-20">
        <div className="container-site">
          <h2 id="ways-title" className="text-h2 font-semibold">Ways to partner</h2>
          <p className="mt-4 max-w-2xl text-lead text-slate-ink">
            We work with governments, NGOs, educational institutions, private organisations, development partners and donor agencies.
          </p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 lg:grid-cols-4">
            {options.map(([t, d]) => (
              <li key={t} className="bg-white p-7">
                <h3 className="text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-ink">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FormSection
        id="enquire"
        eyebrow="Enquire"
        title="Start a conversation"
        intro={<p>Tell us about your organisation and what you’d like to achieve. Our team will reply to discuss options.</p>}
        aside={
          sponsorshipTiersPdf ? (
            <a href={sponsorshipTiersPdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl border border-line p-4 font-semibold text-ink hover:border-brand">
              <FileText aria-hidden="true" className="h-5 w-5 text-brand-ink" /> Sponsorship tiers (PDF)
            </a>
          ) : (
            <ContentNote>Approved sponsorship tier PDF.</ContentNote>
          )
        }
      >
        <EnquiryForm
          kind="partner"
          submitLabel="Send enquiry"
          prefill={{ param: "interest", field: "project", values: { fusion: "Fusion: Art Meets Tech 2026" } }}
        />
      </FormSection>
    </>
  );
}
