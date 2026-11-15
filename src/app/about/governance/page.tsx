import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Legal & Governance",
  description: "Registered names, numbers and policies.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Legal & Governance"
        subtitle="Registered names, numbers and policies."
        crumbs={[{"label": "About", "href": "/about"}, {"label": "Legal & Governance"}]}
      />
      <PlannedSection phase="Phase 5 (About)" />
    </>
  );
}
