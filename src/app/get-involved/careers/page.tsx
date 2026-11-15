import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Careers & Facilitators",
  description: "Join our team.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Careers & Facilitators"
        subtitle="Join our team."
        crumbs={[{"label": "Get Involved", "href": "/get-involved"}, {"label": "Careers & Facilitators"}]}
      />
      <PlannedSection phase="Phase 10 (Get Involved & Contact)" />
    </>
  );
}
