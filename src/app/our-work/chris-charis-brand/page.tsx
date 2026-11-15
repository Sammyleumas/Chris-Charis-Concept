import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/projects/ProjectPage";
import { BrandEditions } from "@/components/projects/Editions";
import { getProjectFamily } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const family = await getProjectFamily("chris-charis-brand");
  return {
    title: family?.name,
    description: "The Chris Charis Brand: the MayBe Challenge, the Chris Charis Community and the Book Project.",
  };
}

export default async function Page() {
  const family = await getProjectFamily("chris-charis-brand");
  if (!family) notFound();
  return <ProjectPage family={family} editions={<BrandEditions family={family} />} />;
}
