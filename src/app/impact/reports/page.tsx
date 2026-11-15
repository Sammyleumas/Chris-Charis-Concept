import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Annual Reports",
  description: "Our published reports.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Impact"
        title="Annual Reports"
        subtitle="Our published reports."
        crumbs={[{"label": "Impact", "href": "/impact"}, {"label": "Annual Reports"}]}
      />
      <PlannedSection phase="Phase 8 (Impact)" />
    </>
  );
}
