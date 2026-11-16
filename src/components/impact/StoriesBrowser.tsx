"use client";

import { useState } from "react";
import type { ImpactStory } from "@/content/types";
import { StoryCard } from "./StoryCard";
import { cn } from "@/lib/cn";

/** Filterable grid of published stories. */
export function StoriesBrowser({
  stories,
  families,
}: {
  stories: ImpactStory[];
  families: { slug: string; name: string }[];
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const present = families.filter((f) => stories.some((s) => s.family === f.slug));
  const shown = filter ? stories.filter((s) => s.family === filter) : stories;
  const nameOf = (slug: string) => families.find((f) => f.slug === slug)?.name ?? "";

  return (
    <div>
      {present.length > 1 && (
        <div role="group" aria-label="Filter stories by project" className="mb-10 flex flex-wrap gap-2">
          {[{ slug: null as string | null, name: "All projects" }, ...present].map((f) => (
            <button
              key={f.slug ?? "all"}
              type="button"
              aria-pressed={filter === f.slug}
              onClick={() => setFilter(f.slug)}
              className={cn(
                "h-11 rounded-full px-4 text-sm font-semibold sm:h-10 tap",
                filter === f.slug ? "bg-ink text-white" : "bg-white text-charcoal ring-1 ring-line hover:ring-ink/40",
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
      )}
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((s) => (
          <li key={s.slug}>
            <StoryCard story={s} familyName={nameOf(s.family)} />
          </li>
        ))}
      </ul>
    </div>
  );
}
