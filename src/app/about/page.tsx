import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "About Chris Charis Concept",
  description: "Our story, our purpose, our people.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About Chris Charis Concept"
        subtitle="Our story, our purpose, our people."
        crumbs={[{"label": "About Chris Charis Concept"}]}
      />
      <PlannedSection phase="Phase 5 (About)" />
    </>
  );
}
