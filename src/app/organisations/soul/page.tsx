import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrgPage } from "@/components/organisations/OrgPage";
import { getOrganisation } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const org = await getOrganisation("soul");
  return { title: org?.name, description: "SOUL, the School of Ultimate Leadership: leadership development for young people, grown from Learn To Lead." };
}

export default async function Page() {
  const org = await getOrganisation("soul");
  if (!org) notFound();
  return <OrgPage org={org} />;
}
