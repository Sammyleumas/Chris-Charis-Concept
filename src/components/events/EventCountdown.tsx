"use client";

import { useEffect, useState } from "react";

type Phase = "before" | "live" | "after";

function phaseAt(now: number, start: number, end: number): Phase {
  if (now < start) return "before";
  if (now <= end) return "live";
  return "after";
}

/**
 * Countdown to the event, updated once a minute (a ticking seconds counter
 * would be continuous decorative motion). Switches to "Happening now" and
 * then "Thank you" automatically. Renders nothing until mounted, so the
 * static page never shows a stale number.
 */
export function EventCountdown({ startsAt, endsAt }: { startsAt: string; endsAt: string }) {
  const start = Date.parse(startsAt);
  const end = Date.parse(endsAt);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  if (now === null) return <div className="h-[5.5rem]" aria-hidden="true" data-countdown-start={startsAt} data-countdown-end={endsAt} />;

  const phase = phaseAt(now, start, end);
  if (phase === "live") {
    return (
      <p className="anim-rise inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 font-semibold text-white">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6b5e] opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff6b5e]" />
        </span>
        Happening now
      </p>
    );
  }
  if (phase === "after") {
    return (
      <p className="anim-rise max-w-md text-lead text-white/85">
        Thank you to everyone who took part. Highlights and winners will be shared here.
      </p>
    );
  }

  const mins = Math.max(0, Math.floor((start - now) / 60_000));
  const parts = [
    { value: Math.floor(mins / 1440), label: "days" },
    { value: Math.floor((mins % 1440) / 60), label: "hours" },
    { value: mins % 60, label: "minutes" },
  ];
  return (
    <div className="anim-rise">
      <p className="sr-only">
        Starts in {parts[0].value} days, {parts[1].value} hours and {parts[2].value} minutes.
      </p>
      <ol aria-hidden="true" className="flex gap-3">
        {parts.map((p) => (
          <li key={p.label} className="min-w-[5.25rem] rounded-xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/10 backdrop-blur-sm">
            <span className="block font-display text-3xl leading-none font-bold text-white tabular-nums">
              {String(p.value).padStart(2, "0")}
            </span>
            <span className="mt-1.5 block text-[0.7rem] font-semibold tracking-[0.14em] text-white/60 uppercase">{p.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
