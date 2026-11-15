import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/projects/ProjectPage";
import { FusionEditions } from "@/components/projects/Editions";
import { getProjectFamily } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const family = await getProjectFamily("fusion");
  return {
    title: family?.name,
    description: "The Fusion Creative Project: Fusion: Art Meets Tech, Fusion Connect Academy, Fusion Solutions Hub and more.",
  };
}

export default async function Page() {
  const family = await getProjectFamily("fusion");
  if (!family) notFound();
  return <ProjectPage family={family} editions={<FusionEditions family={family} />} />;
}
