import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/projects/ProjectPage";
import { LeadEditions } from "@/components/projects/Editions";
import { getProjectFamily } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const family = await getProjectFamily("learn-to-lead");
  return {
    title: family?.name,
    description: "Learn To Lead and SOUL, the School of Ultimate Leadership: leadership development for young people.",
  };
}

export default async function Page() {
  const family = await getProjectFamily("learn-to-lead");
  if (!family) notFound();
  return <ProjectPage family={family} editions={<LeadEditions family={family} />} />;
}
