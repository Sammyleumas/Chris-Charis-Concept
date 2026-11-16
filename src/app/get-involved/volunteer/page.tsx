import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { PageHero } from "@/components/ui/PageHero";
import { InvolveNav } from "@/components/involve/InvolveNav";
import { FormSection } from "@/components/involve/FormSection";
import { EnquiryForm } from "@/components/forms/EnquiryForm";

export const metadata: Metadata = pageMeta({
  title: "Volunteer",
  description: "Volunteer with Chris Charis Concept on film sets, community outreaches, events and training.",
  path: "/get-involved/volunteer",
});

const reasons = [
  ["Real projects", "Work on films, outreaches and events that reach real communities."],
  ["Learn by doing", "Pick up creative, media and organising skills alongside our team."],
  ["Join a community", "Meet young creatives, technologists and leaders in Benin City and beyond."],
];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Volunteer"
        subtitle="Share your time and skills."
        crumbs={[{ label: "Get Involved", href: "/get-involved" }, { label: "Volunteer" }]}
      />
      <InvolveNav current="/get-involved/volunteer" />
      <section aria-labelledby="why-title" className="bg-paper py-20">
        <div className="container-site">
          <h2 id="why-title" className="text-h2 font-semibold">Why volunteer with us</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {reasons.map(([t, d]) => (
              <li key={t} className="border-t-2 border-ink pt-6">
                <h3 className="text-h3 font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-slate-ink">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FormSection
        id="apply"
        eyebrow="Apply"
        title="Volunteer application"
        intro={<p>Tell us a little about yourself and where you’d like to help. We’ll contact you when a suitable opportunity comes up. Fields marked * are required.</p>}
      >
        <EnquiryForm kind="volunteer" submitLabel="Send application" />
      </FormSection>
    </>
  );
}
