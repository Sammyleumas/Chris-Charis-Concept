import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "SOUL",
  description: "The School of Ultimate Leadership.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Our Organisations"
        title="SOUL"
        subtitle="The School of Ultimate Leadership."
        crumbs={[{"label": "Our Organisations", "href": "/organisations"}, {"label": "SOUL"}]}
      />
      <PlannedSection phase="Phase 7 (Organisations)" />
    </>
  );
}
