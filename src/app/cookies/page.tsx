import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Cookie Notice",
  description: "How this website uses cookies.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie Notice"
        subtitle="How this website uses cookies."
        crumbs={[{"label": "Cookie Notice"}]}
      />
      <PlannedSection phase="Phase 10, as a draft for legal review" />
    </>
  );
}
