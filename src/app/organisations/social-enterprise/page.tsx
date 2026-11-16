import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrgPage } from "@/components/organisations/OrgPage";
import { getOrganisation } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const org = await getOrganisation("social-enterprise");
  return { title: org?.name, description: "Chris Charis Social Enterprise for Art and Tech LTD/GTE (RC 9786077): the registered not-for-profit behind Chris Charis Concept." };
}

export default async function Page() {
  const org = await getOrganisation("social-enterprise");
  if (!org) notFound();
  return <OrgPage org={org} />;
}
