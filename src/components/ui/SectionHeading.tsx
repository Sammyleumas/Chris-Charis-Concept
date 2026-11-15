import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  id,
  className,
}: Props) {
  const light = tone === "light";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", light ? "text-mist" : "text-brand-ink")}>{eyebrow}</p>
      )}
      <Tag id={id} className={cn("text-h2 font-semibold", light && "text-white!")}>
        {title}
      </Tag>
      {intro && (
        <p className={cn("mt-5 text-lead", light ? "text-white/75" : "text-slate-ink")}>{intro}</p>
      )}
    </div>
  );
}
