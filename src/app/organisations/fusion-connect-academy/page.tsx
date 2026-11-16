import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrgPage } from "@/components/organisations/OrgPage";
import { getOrganisation } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const org = await getOrganisation("fusion-connect-academy");
  return { title: org?.name, description: "Fusion Connect Academy: creative and technology education from the Chris Charis Concept family." };
}

export default async function Page() {
  const org = await getOrganisation("fusion-connect-academy");
  if (!org) notFound();
  return <OrgPage org={org} />;
}
