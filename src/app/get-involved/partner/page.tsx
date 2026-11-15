import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Partner & Sponsor",
  description: "Grow impact together.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Partner & Sponsor"
        subtitle="Grow impact together."
        crumbs={[{"label": "Get Involved", "href": "/get-involved"}, {"label": "Partner & Sponsor"}]}
      />
      <PlannedSection phase="Phase 10 (Get Involved & Contact)" />
    </>
  );
}
