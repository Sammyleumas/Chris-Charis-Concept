import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How we collect, use and protect your information.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use and protect your information."
        crumbs={[{"label": "Privacy Policy"}]}
      />
      <PlannedSection phase="Phase 10, as a draft for legal review" />
    </>
  );
}
