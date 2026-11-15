import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Our Organisations",
  description: "Building capacity. Expanding impact.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title="Our Organisations"
        subtitle="Building capacity. Expanding impact."
        crumbs={[{"label": "Our Organisations"}]}
      />
      <PlannedSection phase="Phase 7 (Organisations)" />
    </>
  );
}
