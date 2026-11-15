import type { ReactNode } from "react";
import type { ImageAsset } from "@/content/types";
import { Photo } from "./Photo";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * Inner-page hero from the approved mock-up: dark photographic band,
 * left-aligned headline with a blue rule, and a slanted lower edge.
 */
export function PageHero({
  title,
  subtitle,
  eyebrow,
  image,
  crumbs,
  children,
}: {
  title: string;
  subtitle?: ReactNode;
  eyebrow?: string;
  image?: ImageAsset;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="edge-slant relative isolate overflow-hidden bg-ink [--slant:3.5vw]">
      {image && (
        <div className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%]">
          <Photo image={image} tone="dark" priority notePosition="top-right" sizes="(min-width: 768px) 62vw, 100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
        </div>
      )}
      <div className="container-site pt-32 pb-20 md:pt-40 md:pb-28 lg:pb-32">
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className="eyebrow mt-8 text-mist">{eyebrow}</p>}
        <h1 className={`${eyebrow ? "mt-3" : "mt-8"} max-w-3xl text-h1 font-bold text-white!`}>{title}</h1>
        {subtitle && <div className="mt-5 max-w-xl text-lead text-white/80">{subtitle}</div>}
        <span className="rule-accent mt-8" />
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
