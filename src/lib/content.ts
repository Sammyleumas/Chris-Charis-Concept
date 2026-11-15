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
  heroMedia,
  impactStats,
  organisations,
  partners,
  pathway,
  projectFamilies,
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
