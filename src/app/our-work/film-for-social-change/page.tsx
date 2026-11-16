import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/projects/ProjectPage";
import { FilmEditions } from "@/components/projects/Editions";
import { getProjectFamily } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const family = await getProjectFamily("film-for-social-change");
  return pageMeta({ title: family?.name ?? "", description: "Film for Social Change: advocacy films by Chris Charis Concept on electoral violence, human trafficking and more.", path: "/our-work/film-for-social-change" });
}

export default async function Page() {
  const family = await getProjectFamily("film-for-social-change");
  if (!family) notFound();
  return <ProjectPage family={family} editions={<FilmEditions family={family} />} />;
}
