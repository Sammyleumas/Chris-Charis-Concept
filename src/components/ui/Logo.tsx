import Image from "next/image";
import { brand } from "@/config/brand";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

type Props = { tone?: "light" | "dark"; className?: string };

/**
 * Uses the supplied logo file when set in config/brand.ts. Until then it
 * renders an interim vector crown-and-C mark with the wordmark.
 * `tone="light"` = logo for dark backgrounds.
 */
export function Logo({ tone = "dark", className }: Props) {
  const file = tone === "light" ? brand.logo.dark : brand.logo.light;
  if (file) {
    return (
      <Image
        src={file}
        alt={site.name}
        width={brand.logo.width}
        height={brand.logo.height}
        priority
        className={className}
      />
    );
  }

  const text = tone === "light" ? "text-white" : "text-ink";
  return (
    <span className={cn("inline-flex items-center gap-2.5", text, className)}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="h-9 w-9 shrink-0" fill="none">
        <path
          d="M5 9.5 11.5 18 20 6.5 28.5 18 35 9.5"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M28.6 26.2a10 10 0 1 1 0-4.4"
          stroke="var(--color-brand)"
          strokeWidth="3.4"
          strokeLinecap="round"
          transform="translate(0 4)"
        />
      </svg>
      <span className="flex flex-col font-display leading-none">
        <span className="text-[0.8rem] font-bold tracking-[0.06em]">CHRIS CHARIS</span>
        <span className="mt-1 text-[0.62rem] font-medium tracking-[0.32em] opacity-80">CONCEPT</span>
      </span>
      <span className="sr-only">{site.name}, home</span>
    </span>
  );
}
