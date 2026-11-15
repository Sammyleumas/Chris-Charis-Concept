import Image from "next/image";
import { Camera } from "lucide-react";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

type Props = {
  image: ImageAsset;
  /** Fills the nearest positioned parent. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Darker placeholder for use on dark sections and heroes. */
  tone?: "light" | "dark";
  /** Where the "photo to be supplied" label sits on the placeholder. */
  notePosition?: "bottom-left" | "bottom-right";
};

/**
 * Renders a registered photograph. When the organisation has not yet
 * supplied it (`src: null`), shows a labelled frame describing the photo
 * needed, so missing assets are visible during review, never faked.
 */
export function Photo({ image, fill = true, sizes = "100vw", priority, className, tone = "light", notePosition = "bottom-left" }: Props) {
  if (image.src) {
    return fill ? (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        style={image.focus ? { objectPosition: image.focus } : undefined}
      />
    ) : (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 1600}
        height={image.height ?? 1067}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={image.alt}
      className={cn(
        fill && "absolute inset-0",
        "flex items-end overflow-hidden",
        notePosition === "bottom-right" && "justify-end",
        dark
          ? "bg-[radial-gradient(120%_90%_at_70%_20%,#2c4a63_0%,#1d2b38_45%,#17181c_100%)]"
          : "bg-[linear-gradient(135deg,#dbe7f1_0%,#eef3f7_55%,#e3e8ec_100%)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-60",
          "bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[48px_48px]",
          dark ? "text-white/[0.04]" : "text-ink/[0.05]",
        )}
      />
      <p
        aria-hidden="true"
        className={cn(
          "relative m-4 inline-flex max-w-[90%] items-start gap-2 rounded-md px-3 py-2 text-[0.7rem] leading-snug font-medium",
          dark ? "bg-white/10 text-white/70 backdrop-blur-sm" : "bg-white/80 text-slate-ink",
        )}
      >
        <Camera className="mt-px h-3.5 w-3.5 shrink-0" />
        <span>Photo to be supplied: {image.brief}</span>
      </p>
    </div>
  );
}
