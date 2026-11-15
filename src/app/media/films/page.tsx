import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Films",
  description: "Our film library.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Films"
        subtitle="Our film library."
        crumbs={[{"label": "Media", "href": "/media"}, {"label": "Films"}]}
      />
      <PlannedSection phase="Phase 9 (Media)" />
    </>
  );
}
