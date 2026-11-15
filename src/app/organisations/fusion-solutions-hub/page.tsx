import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Fusion Solutions Hub",
  description: "Innovative, sustainable solutions.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title="Fusion Solutions Hub"
        subtitle="Innovative, sustainable solutions."
        crumbs={[{"label": "Our Organisations", "href": "/organisations"}, {"label": "Fusion Solutions Hub"}]}
      />
      <PlannedSection phase="Phase 7 (Organisations)" />
    </>
  );
}
