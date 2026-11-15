import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { PlannedSection } from "@/components/ui/PlannedSection";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using this website.",
};

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        subtitle="The terms for using this website."
        crumbs={[{"label": "Terms of Use"}]}
      />
      <PlannedSection phase="Phase 10, as a draft for legal review" />
    </>
  );
}
