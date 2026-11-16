import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { MediaNav } from "@/components/media/MediaNav";
import { GalleryExperience } from "@/components/media/GalleryExperience";
import { getGalleryItems, getProjectFamilies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from Chris Charis Concept projects, from film sets to community outreaches.",
};

export default async function GalleryPage() {
  const [items, families] = await Promise.all([getGalleryItems(), getProjectFamilies()]);
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Gallery"
        subtitle="Moments from our projects. Drag, swipe or use the arrow keys to explore."
        crumbs={[{ label: "Media", href: "/media" }, { label: "Gallery" }]}
      />
      <MediaNav current="/media/gallery" />
      <section aria-label="Photo gallery" className="bg-paper py-16 lg:py-24">
        <GalleryExperience
          items={items}
          families={families.map((f) => ({ slug: f.slug, name: f.shortName, year: f.year }))}
        />
      </section>
    </>
  );
}
