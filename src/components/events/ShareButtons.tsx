"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Share the event: WhatsApp (the most used channel in Nigeria), the
 * device share sheet where available, or copy the link.
 */
export function ShareButtons({ path, text }: { path: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => `${window.location.origin}${path}`;

  const share = async () => {
    track("share", { method: "native", content_type: "event" });
    if (navigator.share) {
      try {
        await navigator.share({ title: text, text, url: url() });
      } catch {
        /* dismissed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url());
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(text)}%20`}
        onClick={(e) => {
          e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(`${text} ${url()}`)}`;
          track("share", { method: "whatsapp", content_type: "event" });
        }}
        target="_blank"
        rel="noopener noreferrer"
        className="tap inline-flex h-11 items-center gap-2 rounded-full bg-[#167540] px-5 text-sm font-semibold text-white hover:bg-[#11602f]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.1 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
        </svg>
        Share on WhatsApp
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <button
        type="button"
        onClick={share}
        className="tap inline-flex h-11 items-center gap-2 rounded-full border border-white/40 px-5 text-sm font-semibold text-white hover:bg-white hover:text-ink"
      >
        {copied ? <Check aria-hidden="true" className="h-4 w-4" /> : <Share2 aria-hidden="true" className="h-4 w-4" />}
        <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
      </button>
    </div>
  );
}
