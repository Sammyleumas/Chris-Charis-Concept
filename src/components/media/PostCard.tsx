import Link from "next/link";
import type { Post } from "@/content/types";
import { Photo } from "@/components/ui/Photo";

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function PostCard({ post, featured }: { post: Post; featured?: boolean }) {
  return (
    <article className="group">
      <Link href={`/news/${post.slug}`} className={featured ? "grid gap-8 lg:grid-cols-2 lg:items-center" : "block"}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-mist">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
            <Photo image={post.image} sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"} />
          </div>
        </div>
        <div className={featured ? "" : "mt-5"}>
          <p className="text-xs font-semibold text-brand-ink">
            {post.category} · <time dateTime={post.date}>{fmtDate(post.date)}</time>
          </p>
          <h2 className={`mt-2 font-semibold group-hover:text-brand-ink ${featured ? "text-h2" : "text-h3"}`}>{post.title}</h2>
          <p className="mt-3 leading-relaxed text-slate-ink">{post.excerpt}</p>
          {post.author && <p className="mt-3 text-sm text-slate-ink">By {post.author}</p>}
        </div>
      </Link>
    </article>
  );
}
