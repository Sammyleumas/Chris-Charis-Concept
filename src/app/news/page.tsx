import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { PageHero } from "@/components/ui/PageHero";
import { ContentNote } from "@/components/ui/ContentNote";
import { MediaNav } from "@/components/media/MediaNav";
import { PostCard } from "@/components/media/PostCard";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "News & Blog",
  description: "News, stories and announcements from Chris Charis Concept and its projects.",
  path: "/news",
});

export default async function NewsPage() {
  const posts = await getPosts();
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Media"
        title="News & Blog"
        subtitle="Updates from across our projects."
        crumbs={[{ label: "Media", href: "/media" }, { label: "News & Blog" }]}
      />
      <MediaNav current="/news" />
      <section aria-label="Articles" className="py-20 lg:py-28">
        <div className="container-site">
          {first ? (
            <>
              <PostCard post={first} featured />
              {rest.length > 0 && (
                <ul className="mt-20 grid gap-x-8 gap-y-14 border-t border-line pt-14 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}
                </ul>
              )}
            </>
          ) : (
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-h2 font-semibold">Our first stories are being written.</h2>
              <p className="mt-4 text-lead text-slate-ink">Subscribe to hear when new articles are published.</p>
              <div className="mx-auto mt-8 max-w-md text-left"><NewsletterForm tone="light" /></div>
              <ContentNote className="mt-10 text-left">
                News and blog articles: title, date, category, author, featured image and body. Managed in the CMS from Phase 11.
              </ContentNote>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
