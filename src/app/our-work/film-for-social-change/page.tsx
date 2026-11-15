import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/projects/ProjectPage";
import { FilmEditions } from "@/components/projects/Editions";
import { getProjectFamily } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const family = await getProjectFamily("film-for-social-change");
  return {
    title: family?.name,
    description: "Film for Social Change: advocacy films by Chris Charis Concept on electoral violence, human trafficking and more.",
  };
}

export default async function Page() {
  const family = await getProjectFamily("film-for-social-change");
  if (!family) notFound();
  return <ProjectPage family={family} editions={<FilmEditions family={family} />} />;
}
