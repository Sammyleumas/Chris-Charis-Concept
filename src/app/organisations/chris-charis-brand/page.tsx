import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { notFound } from "next/navigation";
import { OrgPage } from "@/components/organisations/OrgPage";
import { getOrganisation } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const org = await getOrganisation("chris-charis-brand");
  return pageMeta({ title: org?.name ?? "", description: "The Chris Charis Brand: founder-led media and community from the Chris Charis Concept family.", path: "/organisations/chris-charis-brand" });
}

export default async function Page() {
  const org = await getOrganisation("chris-charis-brand");
  if (!org) notFound();
  return <OrgPage org={org} />;
}
