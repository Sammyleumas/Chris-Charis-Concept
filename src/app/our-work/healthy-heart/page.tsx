import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Healthy Heart Community Project",
  description: "Our flagship community development programme.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Work \u00b7 2021"
        title="Healthy Heart Community Project"
        subtitle="Our flagship community development programme."
        crumbs={[{"label": "Our Work", "href": "/our-work"}, {"label": "Healthy Heart Community Project"}]}
      />
      <PlannedSection phase="Phase 6 (Our Work)" />
    </>
  );
}
