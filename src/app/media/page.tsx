import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Media",
  description: "Stories, moments and memories.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Media"
        subtitle="Stories, moments and memories."
        crumbs={[{"label": "Media"}]}
      />
      <PlannedSection phase="Phase 9 (Media)" />
    </>
  );
}
