"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { HeroSlide } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const INTERVAL = 6500; // ms each slide stays on screen

/**
 * Homepage hero with a cinematic crossfading slideshow (approved mock-up).
 *
 * - Slides crossfade over 1.4 s with a slow "Ken Burns" zoom.
 * - Autoplay pauses on hover, keyboard focus, a hidden tab, or the pause
 *   button (WCAG 2.2.2), and never starts for reduced-motion users.
 * - The headline stays still; only the photography changes.
 * - If a hero video is configured, it plays as the first slide.
 */
export function HeroSlideshow({ slides, videoSrc }: { slides: HeroSlide[]; videoSrc: string | null }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // user choice via the button
  const [held, setHeld] = useState(false); // hover / focus inside
  const [hidden, setHidden] = useState(false); // tab not visible
  const [videoOn, setVideoOn] = useState(false);
  const regionRef = useRef<HTMLElement>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const playing = !paused && !held && !hidden && !reduce && count > 1;

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [playing, index, go]);

  useEffect(() => {
    const onVis = () => setHidden(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Load the optional video only after the page is interactive, never on data saver.
  useEffect(() => {
    if (!videoSrc || reduce) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const id = window.setTimeout(() => setVideoOn(true), 300);
    return () => window.clearTimeout(id);
  }, [videoSrc, reduce]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const current = slides[index];

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Highlights from our work"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!regionRef.current?.contains(e.relatedTarget as Node)) setHeld(false);
      }}
      className="edge-slant relative isolate flex min-h-[92svh] items-end overflow-hidden bg-night [--slant:5vw] lg:min-h-[100svh]"
    >
      {/* Slides */}
      <div className="absolute inset-0 -z-10">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={`${s.label}-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${s.label}`}
              aria-hidden={!active}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(.4,0,.2,1)]",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 will-change-transform",
                  // Ken Burns: the active slide drifts from 1.08 to 1 while visible.
                  !reduce && "transition-transform duration-[8000ms] ease-out",
                  active || reduce ? "scale-100" : "scale-[1.08]",
                )}
              >
                <Photo image={s.image} tone="dark" variant={i} priority={i === 0} notePosition="top-right" />
                {i === 0 && videoOn && videoSrc && (
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    onError={() => setVideoOn(false)}
                  />
                )}
              </div>
            </div>
          );
        })}
        {/* Overlay keeps the headline readable over any photograph */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/80 to-transparent" />
      </div>

      <div className="container-site pt-36 pb-[calc(5vw+5rem)] lg:pb-[calc(5vw+6.5rem)]">
        <p className="eyebrow text-mist">Chris Charis Concept · Benin City, Nigeria</p>
        <h1 className="mt-5 max-w-5xl text-display text-white!">
          <span className="block font-bold">Transforming Communities</span>
          <span className="block font-medium text-white/85">Through Creative Expressions</span>
        </h1>
        <p className="mt-6 max-w-xl text-lead text-white/80">
          Creativity, technology and community development working together to create lasting impact.
        </p>
        <span className="rule-accent mt-8" />
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/our-work" size="lg">Explore Our Work</ButtonLink>
          <ButtonLink href="/get-involved/partner" size="lg" variant="outline-light">Partner With Us</ButtonLink>
        </div>

        {/* Slideshow controls */}
        {count > 1 && (
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-white/85 hover:border-white hover:text-white"
              >
                {paused || reduce ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
                <span className="sr-only">{paused || reduce ? "Play slideshow" : "Pause slideshow"}</span>
              </button>
              <ol className="flex items-center gap-1.5" aria-label="Choose a slide">
                {slides.map((s, i) => (
                  <li key={`dot-${i}`}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-current={i === index ? "true" : undefined}
                      className="group relative block h-10 w-8 sm:w-10"
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/25 group-hover:bg-white/45">
                        <span
                          key={i === index ? `${index}-${playing}` : undefined}
                          className={cn(
                            "absolute inset-y-0 left-0 rounded-full bg-white",
                            i < index && "w-full",
                            i > index && "w-0",
                            i === index && (playing ? "hero-progress" : "w-full"),
                          )}
                          style={i === index && playing ? { animationDuration: `${INTERVAL}ms` } : undefined}
                        />
                      </span>
                      <span className="sr-only">Show slide {i + 1}: {s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-center gap-4">
              {current.href ? (
                <Link
                  href={current.href}
                  className="group hidden max-w-xs items-center gap-2 truncate text-sm font-medium text-white/80 hover:text-white md:inline-flex"
                >
                  <span className="truncate">{current.label}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <span className="hidden text-sm text-white/80 md:inline">{current.label}</span>
              )}
              <p className="text-sm font-semibold text-white tabular-nums" aria-live={playing ? "off" : "polite"}>
                {pad(index + 1)} <span className="text-white/50">/ {pad(count)}</span>
                <span className="sr-only">: {current.label}</span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink"
                >
                  <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">Previous slide</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-white hover:border-white hover:bg-white hover:text-ink"
                >
                  <ChevronRight aria-hidden="true" className="h-5 w-5" />
                  <span className="sr-only">Next slide</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
