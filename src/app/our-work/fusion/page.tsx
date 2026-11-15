import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Fusion Creative Project",
  description: "Where art meets technology.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work \u00b7 2024"
        title="Fusion Creative Project"
        subtitle="Where art meets technology."
        crumbs={[{"label": "Our Work", "href": "/our-work"}, {"label": "Fusion Creative Project"}]}
      />
      <PlannedSection phase="Phase 6 (Our Work)" />
    </>
  );
}
