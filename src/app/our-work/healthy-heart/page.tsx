import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/projects/ProjectPage";
import { HeartEditions } from "@/components/projects/Editions";
import { getProjectFamily } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const family = await getProjectFamily("healthy-heart");
  return pageMeta({ title: family?.name ?? "", description: "The Healthy Heart Community Project: Chris Charis Concept's flagship community health and well-being programme.", path: "/our-work/healthy-heart" });
}

export default async function Page() {
  const family = await getProjectFamily("healthy-heart");
  if (!family) notFound();
  return <ProjectPage family={family} editions={<HeartEditions family={family} />} />;
}
