/**
 * Content access layer.
 *
 * Pages read content only through these functions. When the Sanity CMS is
 * configured (NEXT_PUBLIC_SANITY_PROJECT_ID), each function reads published
 * CMS content and overlays it on the verified local content in
 * src/content, field by field. Anything the CMS has not yet filled in keeps
 * its local value, so pages never go blank during the move to the CMS.
 */
import {
  featuredInitiative,
  films,
  heroMedia,
  impactStats,
  impactStories,
  legalEntities,
  organisations,
  partners,
  pathway,
  posts,
  pressAssets,
  projectFamilies,
  reports,
  statements,
  team,
  timeline,
} from "@/content/data";
import type {
  FeaturedInitiative,
  Film,
  GalleryItem,
  ImageAsset,
  ImpactStat,
  ImpactStory,
  Organisation,
  Partner,
  Post,
  PressAsset,
  ProjectFamily,
  ProjectFamilySlug,
  Report,
  Statements,
  TeamMember,
  TimelineEntry,
} from "@/content/types";
import { linkRegister, site, type SocialLink } from "@/config/site";
import { cmsFetch } from "@/lib/cms/client";
import { listOr, overlay } from "@/lib/cms/merge";
import * as q from "@/lib/cms/queries";

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

type CmsSettings = {
  email?: string;
  phone?: string;
  streetAddress?: string;
  socials?: SocialLink[];
  vision?: string;
  mission?: string;
  tagline?: string;
  motto?: string;
  values?: Statements["values"];
  heroVideoUrl?: string;
  heroPoster?: ImageAsset;
} & Partial<Record<keyof typeof linkRegister, string>>;

const getCmsSettings = () => cmsFetch<CmsSettings>(q.siteSettingsQuery);

/** Contact details, social links and external link register. */
export async function getSiteSettings() {
  const s = await getCmsSettings();
  return {
    contact: overlay(site.contact, { email: s?.email, phone: s?.phone }),
    location: overlay(site.location, { streetAddress: s?.streetAddress }),
    socials: listOr(s?.socials, [...site.socials]),
    links: overlay(linkRegister, s ?? {}),
  };
}

export async function getStatements(): Promise<Statements> {
  const s = await getCmsSettings();
  return overlay(statements, s ? { vision: s.vision, mission: s.mission, tagline: s.tagline, motto: s.motto, values: s.values } : null);
}

export async function getHeroMedia() {
  const s = await getCmsSettings();
  return overlay(heroMedia, s ? { videoSrc: s.heroVideoUrl, poster: s.heroPoster } : null);
}

/* ------------------------------------------------------------------ */
/* Homepage                                                            */
/* ------------------------------------------------------------------ */

type CmsHomepage = { featured?: Partial<FeaturedInitiative>; featuredFilm?: Partial<Film> };
const getCmsHomepage = () => cmsFetch<CmsHomepage>(q.homepageQuery);

export async function getFeaturedInitiative(): Promise<FeaturedInitiative> {
  return overlay(featuredInitiative, (await getCmsHomepage())?.featured);
}

export async function getLatestFilm(): Promise<Film | null> {
  const local = films[0];
  return local ? overlay(local, (await getCmsHomepage())?.featuredFilm) : null;
}

/* ------------------------------------------------------------------ */
/* Projects and organisations                                          */
/* ------------------------------------------------------------------ */

export async function getProjectFamilies(): Promise<ProjectFamily[]> {
  const cms = await cmsFetch<(Partial<ProjectFamily> & { slug: ProjectFamilySlug })[]>(q.projectFamiliesQuery);
  return projectFamilies
    .map((local) => {
      const doc = cms?.find((c) => c.slug === local.slug);
      if (!doc) return local;
      const merged = overlay(local, doc);
      // Keep local cta fields the CMS leaves empty.
      merged.cta = overlay(local.cta, doc.cta);
      merged.gallery = (doc.gallery ?? []).filter((g) => g?.src).length ? doc.gallery!.filter((g) => g?.src) : local.gallery;
      return merged;
    })
    .sort((a, b) => a.year - b.year);
}

export async function getProjectFamily(slug: ProjectFamilySlug) {
  return (await getProjectFamilies()).find((p) => p.slug === slug) ?? null;
}

type CmsOrganisation = Partial<Omit<Organisation, "offerings" | "enquiry">> & {
  slug: string;
  offeringsTitle?: string;
  offerings?: string[];
  enquiryTitle?: string;
  enquiryText?: string;
  enquiryActions?: Organisation["enquiry"]["actions"];
};

export async function getOrganisations(): Promise<Organisation[]> {
  const cms = await cmsFetch<CmsOrganisation[]>(q.organisationsQuery);
  return organisations.map((local) => {
    const doc = cms?.find((c) => c.slug === local.slug);
    if (!doc) return local;
    const { offeringsTitle, offerings, enquiryTitle, enquiryText, enquiryActions, ...rest } = doc;
    const merged = overlay(local, rest);
    merged.offerings = overlay(local.offerings, {
      title: offeringsTitle,
      items: offerings,
      pendingNote: offerings?.length ? "" : undefined,
    });
    merged.enquiry = overlay(local.enquiry, { title: enquiryTitle, text: enquiryText, actions: enquiryActions });
    return merged;
  });
}

export async function getOrganisation(slug: string) {
  return (await getOrganisations()).find((o) => o.slug === slug) ?? null;
}

export async function getLegalEntities() {
  return legalEntities;
}

/* ------------------------------------------------------------------ */
/* Impact                                                              */
/* ------------------------------------------------------------------ */

export async function getImpactStats(): Promise<ImpactStat[]> {
  return listOr(await cmsFetch<ImpactStat[]>(q.impactStatsQuery), impactStats);
}

export async function getPathway() {
  return pathway;
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  return listOr(await cmsFetch<TimelineEntry[]>(q.timelineQuery), timeline);
}

/** Published stories only: consent must be recorded as granted. */
export async function getImpactStories(): Promise<ImpactStory[]> {
  const list = listOr(await cmsFetch<ImpactStory[]>(q.storiesQuery), impactStories);
  return list.filter((s) => s.consent === "granted").sort((a, b) => b.date.localeCompare(a.date));
}

export async function getReports(): Promise<Report[]> {
  const list = listOr(await cmsFetch<Report[]>(q.reportsQuery), reports);
  return [...list].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

export async function getTeam(): Promise<TeamMember[]> {
  return listOr(await cmsFetch<TeamMember[]>(q.teamQuery), team);
}

export async function getPartners(): Promise<Partner[]> {
  return listOr(await cmsFetch<Partner[]>(q.partnersQuery), partners);
}

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */

/** One entry per Film for Social Change output, following CMS edits to the project. */
export async function getFilmLibrary(): Promise<Film[]> {
  const ffsc = await getProjectFamily("film-for-social-change");
  return (ffsc?.items ?? []).map((item) => ({
    title: item.name,
    family: "film-for-social-change",
    description: item.summary,
    youtubeUrl: item.youtubeUrl ?? null,
    poster: { src: null, alt: `Poster for ${item.name}`, brief: `${item.name}: poster or YouTube thumbnail` },
  }));
}

/** Every project's gallery photos, tagged by project. */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  return (await getProjectFamilies()).flatMap((f) =>
    f.gallery.map((image, i) => ({
      id: `${f.slug}-${i}`,
      family: f.slug,
      image,
      caption: image.src ? image.brief || image.alt : image.alt.split(": ").slice(1).join(": ") || image.alt,
    })),
  );
}

export async function getPosts(): Promise<Post[]> {
  const list = listOr(await cmsFetch<Post[]>(q.postsQuery), posts);
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug) ?? null;
}

export async function getPressAssets(): Promise<PressAsset[]> {
  return listOr(await cmsFetch<PressAsset[]>(q.pressAssetsQuery), pressAssets);
}
