import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Safeguarding Statement",
  description: "Our commitment to the safety of everyone we work with.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Safeguarding Statement"
        subtitle="Our commitment to the safety of everyone we work with."
        crumbs={[{"label": "Safeguarding Statement"}]}
      />
      <PlannedSection phase="Phase 10, as a draft for legal review" />
    </>
  );
}
