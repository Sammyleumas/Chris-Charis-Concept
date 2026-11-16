import type { MetadataRoute } from "next";
import { getOrganisations, getPosts, getProjectFamilies } from "@/lib/content";
import { siteUrl } from "@/lib/seo/meta";

const staticRoutes = [
  "/", "/about", "/about/story", "/about/vision", "/about/team", "/about/partners", "/about/governance",
  "/our-work", "/organisations", "/impact", "/impact/stories", "/impact/reports",
  "/media", "/media/films", "/media/gallery", "/media/press", "/news",
  "/get-involved", "/get-involved/volunteer", "/get-involved/partner", "/get-involved/careers",
  "/donate", "/contact", "/privacy", "/terms", "/safeguarding", "/cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const [families, orgs, posts] = await Promise.all([getProjectFamilies(), getOrganisations(), getPosts()]);
  const entry = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({ url: `${base}${path === "/" ? "" : path}`, priority });
  return [
    ...staticRoutes.map((p) => entry(p, p === "/" ? 1 : 0.6)),
    ...families.map((f) => entry(`/our-work/${f.slug}`, 0.8)),
    entry("/our-work/fusion/2026", 0.9),
    ...orgs.map((o) => entry(`/organisations/${o.slug}`, 0.7)),
    ...posts.map((p) => ({ ...entry(`/news/${p.slug}`, 0.5), lastModified: p.date })),
  ];
}
