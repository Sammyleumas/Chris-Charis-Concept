import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { InvolveNav } from "@/components/involve/InvolveNav";
import { FormSection } from "@/components/involve/FormSection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = {
  title: "Careers & Facilitators",
  description: "Facilitate, teach or work with Chris Charis Concept across film, health, leadership and creative technology programmes.",
};

/** Open roles. Empty until the organisation advertises one. */
const openings: { title: string; type: string; summary: string }[] = [];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Careers & Facilitators"
        subtitle="Teach, mentor or join our team."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Careers & Facilitators" }]}
      />
      <InvolveNav current="/get-involved/careers" />
      <section aria-labelledby="openings-title" className="bg-paper py-20">
        <div className="container-site">
          <h2 id="openings-title" className="text-h2 font-semibold">Current opportunities</h2>
          {openings.length > 0 ? (
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {openings.map((o) => (
                <li key={o.title} className="py-6">
                  <p className="text-sm font-semibold text-brand-ink">{o.type}</p>
                  <h3 className="mt-1 text-lg font-semibold">{o.title}</h3>
                  <p className="mt-1 text-slate-ink">{o.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <>
              <p className="mt-4 max-w-2xl text-lead text-slate-ink">
                There are no advertised roles right now. We regularly work with facilitators across our programmes, so you are welcome to send an application below.
              </p>
              <ContentNote className="mt-6 max-w-2xl">Open roles and facilitator calls, with closing dates.</ContentNote>
            </>
          )}
        </div>
      </section>
      <FormSection
        id="apply"
        eyebrow="Apply"
        title="Facilitator and career application"
        intro={<p>Share your expertise and a link to your CV or portfolio. We keep applications on file and contact you when there’s a match.</p>}
      >
        <EnquiryForm kind="careers" submitLabel="Send application" />
      </FormSection>
    </>
  );
}
