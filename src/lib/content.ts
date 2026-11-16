/**
 * Content access layer.
 *
 * Pages read content only through these functions. Today they return the
 * local, verified content in src/content. In Phase 11 each function is
 * re-implemented against the Sanity CMS with the same return types, so no
 * page needs to change.
 */
import {
  featuredInitiative,
  films,
  filmLibrary,
  galleryItems,
  posts,
  pressAssets,
  heroMedia,
  impactStats,
  impactStories,
  reports,
  legalEntities,
  organisations,
  partners,
  pathway,
  projectFamilies,
  statements,
  team,
  timeline,
} from "@/content/data";
import type { ProjectFamilySlug } from "@/content/types";

export async function getProjectFamilies() {
  return [...projectFamilies].sort((a, b) => a.year - b.year);
}

export async function getProjectFamily(slug: ProjectFamilySlug) {
  return projectFamilies.find((p) => p.slug === slug) ?? null;
}

export async function getImpactStats() {
  return impactStats;
}

export async function getPathway() {
  return pathway;
}

export async function getTimeline() {
  return timeline;
}

export async function getOrganisations() {
  return organisations;
}

export async function getOrganisation(slug: string) {
  return organisations.find((o) => o.slug === slug) ?? null;
}

export async function getFeaturedInitiative() {
  return featuredInitiative;
}

export async function getPartners() {
  return partners;
}

export async function getLatestFilm() {
  return films[0] ?? null;
}

export async function getHeroMedia() {
  return heroMedia;
}

export async function getStatements() {
  return statements;
}

export async function getTeam() {
  return team;
}

export async function getLegalEntities() {
  return legalEntities;
}

/** Published stories only: consent must be recorded as granted. */
export async function getImpactStories() {
  return impactStories
    .filter((s) => s.consent === "granted")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getReports() {
  return [...reports].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

export async function getFilmLibrary() {
  return filmLibrary;
}

export async function getGalleryItems() {
  return galleryItems;
}

export async function getPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPressAssets() {
  return pressAssets;
}
