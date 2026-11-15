import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Fusion Connect Academy",
  description: "Creative and technology education.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title="Fusion Connect Academy"
        subtitle="Creative and technology education."
        crumbs={[{"label": "Our Organisations", "href": "/organisations"}, {"label": "Fusion Connect Academy"}]}
      />
      <PlannedSection phase="Phase 7 (Organisations)" />
    </>
  );
}
