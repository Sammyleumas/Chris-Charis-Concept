import { HeroVideo } from "@/components/home/HeroVideo";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { ImpactPathway } from "@/components/home/ImpactPathway";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { FeaturedInitiative } from "@/components/home/FeaturedInitiative";
import { LatestFilm } from "@/components/home/LatestFilm";
import { PartnerWall } from "@/components/home/PartnerWall";
import { GetInvolvedSection } from "@/components/home/GetInvolvedSection";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import {
  getFeaturedInitiative,
  getHeroMedia,
  getImpactStats,
  getLatestFilm,
  getPartners,
  getPathway,
  getProjectFamilies,
} from "@/lib/content";

export default async function HomePage() {
  const [hero, stats, stages, families, featured, film, partners] = await Promise.all([
    getHeroMedia(),
    getImpactStats(),
    getPathway(),
    getProjectFamilies(),
    getFeaturedInitiative(),
    getLatestFilm(),
    getPartners(),
  ]);

  return (
    <>
      <OrganizationJsonLd />
      <HeroVideo videoSrc={hero.videoSrc} poster={hero.poster} />
      <ImpactStrip stats={stats} />
      <WhoWeAre />
      <ImpactPathway stages={stages} />
      <ProjectShowcase families={families} />
      <FeaturedInitiative item={featured} />
      {film && <LatestFilm film={film} />}
      <PartnerWall partners={partners} />
      <GetInvolvedSection />
      <NewsletterBand />
    </>
  );
}
