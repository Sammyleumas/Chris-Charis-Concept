import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Get Involved",
  description: "Be part of our mission.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Get Involved"
        subtitle="Be part of our mission."
        crumbs={[{"label": "Get Involved"}]}
      />
      <PlannedSection phase="Phase 10 (Get Involved & Contact)" />
    </>
  );
}
