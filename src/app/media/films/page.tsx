import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ContentNote } from "@/components/ui/ContentNote";
import { MediaNav } from "@/components/media/MediaNav";
import { FilmCard } from "@/components/media/FilmCard";
import { LatestFilm } from "@/components/home/LatestFilm";
import { getFilmLibrary, getLatestFilm, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Films",
  description: "The Chris Charis Concept film library: advocacy films from Film for Social Change.",
};

export default async function FilmsPage() {
  const [films, featured, { links }] = await Promise.all([getFilmLibrary(), getLatestFilm(), getSiteSettings()]);
  const playable = films.filter((f) => f.youtubeUrl).length;
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Films"
        subtitle="Stories that start conversations about the issues shaping our communities."
        crumbs={[{ label: "Media", href: "/media" }, { label: "Films" }]}
      >
        {links.youtubeChannel && (
          <ButtonLink href={links.youtubeChannel} external size="lg">Our YouTube channel</ButtonLink>
        )}
      </PageHero>
      <MediaNav current="/media/films" />
      {featured && <LatestFilm film={featured} channelUrl={links.youtubeChannel} />}
      <section aria-labelledby="library-title" className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="library-title" className="text-h2 font-semibold">Film library</h2>
            <p className="text-sm text-slate-ink">{films.length} titles · {playable} playable</p>
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {films.map((f) => (
              <li key={f.title}><FilmCard film={f} familyName="Film for Social Change" /></li>
            ))}
          </ul>
          <ContentNote className="mt-10 max-w-2xl">
            YouTube links, year and a one-line description for each title, and captions on every film (WCAG requirement).
          </ContentNote>
        </div>
      </section>
    </>
  );
}
