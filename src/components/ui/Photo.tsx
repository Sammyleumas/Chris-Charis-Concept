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
  notePosition?: "bottom-left" | "bottom-right" | "top-right" | "top-left";
  /** "contain" shows the whole photo (lightbox); default crops to fill. */
  fit?: "cover" | "contain";
  /** Varies the dark placeholder's light so neighbouring slides differ. */
  variant?: number;
};

const darkGradients = [
  "radial-gradient(120% 90% at 70% 20%,#2c4a63 0%,#1d2b38 45%,#17181c 100%)",
  "radial-gradient(110% 90% at 25% 30%,#33465a 0%,#1f2a35 45%,#17181c 100%)",
  "radial-gradient(120% 100% at 85% 75%,#2a5373 0%,#1c2a36 50%,#17181c 100%)",
  "radial-gradient(100% 80% at 50% 10%,#3a4250 0%,#22262e 50%,#17181c 100%)",
  "radial-gradient(130% 90% at 15% 80%,#264a66 0%,#1b2833 50%,#17181c 100%)",
  "radial-gradient(110% 100% at 60% 55%,#2f3f52 0%,#1e2630 50%,#17181c 100%)",
];

/**
 * Renders a registered photograph. When the organisation has not yet
 * supplied it (`src: null`), shows a labelled frame describing the photo
 * needed, so missing assets are visible during review, never faked.
 */
export function Photo({ image, fill = true, sizes = "100vw", priority, className, tone = "light", notePosition = "bottom-left", fit = "cover", variant = 0 }: Props) {
  if (image.src) {
    return fill ? (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(fit === "contain" ? "object-contain" : "object-cover", className)}
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
        notePosition === "top-right" && "items-start! justify-end pt-20 lg:pt-24",
        notePosition === "top-left" && "items-start!",
        dark
          ? ""
          : "bg-[linear-gradient(135deg,#dbe7f1_0%,#eef3f7_55%,#e3e8ec_100%)]",
        className,
      )}
      style={dark ? { backgroundImage: darkGradients[variant % darkGradients.length] } : undefined}
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
