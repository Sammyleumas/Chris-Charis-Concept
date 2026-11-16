import Image from "next/image";
import { brand } from "@/config/brand";
import { cn } from "@/lib/cn";

type Props = {
  /** "light" = for dark backgrounds (white lettering). */
  tone?: "light" | "dark";
  /** "horizontal" for the header; "full" (stacked) for the footer. */
  layout?: "horizontal" | "full";
  className?: string;
  priority?: boolean;
};

/**
 * The Chris Charis Concept logo. Decorative inside a link that is already
 * labelled (e.g. "Chris Charis Concept, home"); pass `alt` via the parent.
 */
export function Logo({ tone = "dark", layout = "horizontal", className, priority }: Props) {
  const l = brand.logo[layout];
  return (
    <Image
      src={tone === "light" ? l.light : l.dark}
      alt=""
      width={l.width}
      height={l.height}
      priority={priority}
      // Pre-optimised WebP at 2–4× size; served as-is.
      unoptimized
      className={cn("block w-auto select-none", layout === "horizontal" ? "h-12 lg:h-[3.75rem]" : "h-32", className)}
      draggable={false}
    />
  );
}
