"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { ImageAsset } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Cinematic homepage hero. The poster renders first (fast LCP, no layout
 * shift); the video only loads after the page is interactive, never on
 * reduced-motion or data-saver connections, and falls back to the poster
 * if it fails to load.
 */
export function HeroVideo({ videoSrc, poster }: { videoSrc: string | null; poster: ImageAsset }) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!videoSrc || reduce) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;
    const id = window.setTimeout(() => setEnabled(true), 300);
    return () => window.clearTimeout(id);
  }, [videoSrc, reduce]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const showVideo = enabled && !failed && videoSrc;

  return (
    <section
      aria-labelledby="hero-title"
      className="edge-slant relative isolate flex min-h-[92svh] items-end overflow-hidden bg-night [--slant:5vw] lg:min-h-[100svh]"
    >
      <div className="absolute inset-0 -z-10">
        <Photo image={poster} tone="dark" priority notePosition="bottom-right" />
        {showVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
        )}
        {/* Overlay keeps the headline readable over any footage */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/10" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-night/80 to-transparent" />
      </div>

      <div className="container-site pt-36 pb-[calc(5vw+5rem)] lg:pb-[calc(5vw+6.5rem)]">
        <p className="eyebrow text-mist">Chris Charis Concept · Benin City, Nigeria</p>
        <h1 id="hero-title" className="mt-5 max-w-5xl text-display text-white!">
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

        <div className="mt-14 flex items-center gap-6 text-xs text-white/65">
          <span className="hidden items-center gap-3 sm:flex">
            <span aria-hidden="true" className="relative h-8 w-5 rounded-full border border-white/40">
              <span className="absolute top-1.5 left-1/2 h-1.5 w-0.5 -translate-x-1/2 animate-bounce rounded-full bg-white/70" />
            </span>
            Scroll to explore
          </span>
          {showVideo && (
            <button
              type="button"
              onClick={toggle}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-white/30 px-4 font-medium text-white/85 hover:border-white hover:text-white"
            >
              {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
              {playing ? "Pause background video" : "Play background video"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
