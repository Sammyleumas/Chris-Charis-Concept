import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Logos, fact sheet and approved photographs.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Press Kit"
        subtitle="Logos, fact sheet and approved photographs."
        crumbs={[{"label": "Media", "href": "/media"}, {"label": "Press Kit"}]}
      />
      <PlannedSection phase="Phase 9 (Media)" />
    </>
  );
}
