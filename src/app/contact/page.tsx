import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Let\u2019s connect.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        subtitle="Let\u2019s connect."
        crumbs={[{"label": "Contact Us"}]}
      />
      <PlannedSection phase="Phase 10 (Get Involved & Contact)" />
    </>
  );
}
