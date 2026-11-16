import type { SocialLink } from "@/config/site";
import { cn } from "@/lib/cn";

const names: Record<SocialLink["platform"], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  x: "X",
  tiktok: "TikTok",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
};

/** Text links to confirmed social accounts; renders nothing until any exist. */
export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  if (links.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-2", className)}>
      {links.map((l) => (
        <li key={l.url}>
          <a href={l.url} target="_blank" rel="noopener noreferrer me" className="underline-offset-4 hover:underline">
            {names[l.platform]}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
