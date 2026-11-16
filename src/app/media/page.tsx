import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import Link from "next/link";
import { ArrowRight, Clapperboard, Images, Newspaper, Package } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { MediaNav } from "@/components/media/MediaNav";
import { images } from "@/content/images";
import { getFilmLibrary, getGalleryItems, getPosts } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Media",
  description: "Films, photographs, news and press materials from Chris Charis Concept.",
  path: "/media",
});

export default async function MediaPage() {
  const [films, gallery, posts] = await Promise.all([getFilmLibrary(), getGalleryItems(), getPosts()]);
  const sections = [
    { href: "/media/films", icon: Clapperboard, title: "Films", text: "Advocacy films and productions from Film for Social Change.", count: `${films.length} titles`, image: images.ffsc },
    { href: "/media/gallery", icon: Images, title: "Gallery", text: "Moments from our projects, explored in 3D.", count: `${gallery.filter((g) => g.image.src).length} photos`, image: images.fusion },
    { href: "/news", icon: Newspaper, title: "News & Blog", text: "Updates, stories and announcements from across our work.", count: posts.length ? `${posts.length} articles` : "Coming soon", image: images.hhcp },
    { href: "/media/press", icon: Package, title: "Press Kit", text: "Fact sheet, logos and approved materials for journalists.", count: "Fact sheet available", image: images.brand },
  ];

  return (
    <>
      <PageHero
        eyebrow="Media"
        title="Media"
        subtitle="Stories, moments and memories."
        image={images.mediaHero}
        crumbs={[{ label: "Media" }]}
      />
      <MediaNav current="/media" />
      <section aria-label="Media sections" className="py-20 lg:py-28">
        <div className="container-site">
          <ul className="grid gap-6 md:grid-cols-2">
            {sections.map((s, i) => (
              <Reveal as="li" key={s.href} delay={(i % 2) * 0.08}>
                <Link href={s.href} className="group relative block aspect-[16/11] overflow-hidden rounded-2xl bg-ink">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]">
                    <Photo image={s.image} tone="dark" notePosition="top-left" sizes="(min-width: 768px) 50vw, 100vw" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                    <s.icon aria-hidden="true" className="h-6 w-6 text-mist" />
                    <h2 className="mt-4 text-h2 font-semibold text-white!">{s.title}</h2>
                    <p className="mt-2 max-w-sm text-white/75">{s.text}</p>
                    <p className="mt-5 flex items-center gap-3 text-sm font-semibold">
                      <span className="text-mist">{s.count}</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
