import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { fmtDate } from "@/components/media/PostCard";
import { site } from "@/config/site";
import { getPost, getPosts } from "@/lib/content";

// Cache Components requires at least one param at build time. Until the
// first article exists, a placeholder is generated and resolves to 404
// (documented pattern in node_modules/next/dist/docs, generate-static-params).
const PLACEHOLDER = "__no-articles-yet__";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER }];
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const meta = pageMeta({ title: post.title, description: post.excerpt, path: `/news/${post.slug}`, type: "article" });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date } };
}

/** Instant navigation shell while the article streams in. */
function ArticleSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading article">
      <div className="bg-ink pt-32 pb-16 md:pt-40">
        <div className="container-site max-w-4xl space-y-5">
          <div className="h-4 w-48 rounded bg-white/10" />
          <div className="h-12 w-3/4 rounded bg-white/10" />
          <div className="h-5 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: { params: PageProps<"/news/[slug]">["params"] }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    ...(post.author && { author: { "@type": "Person", name: post.author } }),
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-ink pt-32 pb-16 md:pt-40">
        <div className="container-site max-w-4xl">
          <Breadcrumbs items={[{ label: "News & Blog", href: "/news" }, { label: post.title }]} />
          <p className="mt-8 text-sm font-semibold text-mist">
            {post.category} · <time dateTime={post.date}>{fmtDate(post.date)}</time>
            {post.author && <> · By {post.author}</>}
          </p>
          <h1 className="mt-4 text-h1 font-bold text-white!">{post.title}</h1>
          <p className="mt-6 text-lead text-white/75">{post.excerpt}</p>
        </div>
      </header>
      <div className="container-site max-w-5xl">
        <div className="relative -mt-2 aspect-[16/9] overflow-hidden rounded-b-2xl bg-mist">
          <Photo image={post.image} priority sizes="(min-width: 1024px) 1024px, 100vw" />
        </div>
      </div>
      <div className="container-site max-w-2xl py-16">
        <div className="space-y-6 text-[1.075rem] leading-[1.75] text-charcoal">
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>
        <Link href="/news" className="hit-y group mt-14 inline-flex items-center gap-2 font-semibold text-brand-ink">
          <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" /> All news
        </Link>
      </div>
    </article>
  );
}
