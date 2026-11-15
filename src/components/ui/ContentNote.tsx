import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Internal note marking content that is awaiting the client. Visible on
 * development and staging builds; hidden in production when
 * NEXT_PUBLIC_CONTENT_NOTES=off, so no placeholder text goes live.
 */
export function ContentNote({ children, className }: { children: ReactNode; className?: string }) {
  if (process.env.NEXT_PUBLIC_CONTENT_NOTES === "off") return null;
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-lg border border-dashed border-brand/50 bg-mist/60 px-4 py-3 text-sm text-charcoal",
        className,
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
      <div>
        <span className="font-semibold text-brand-ink">Content needed: </span>
        {children}
      </div>
    </aside>
  );
}
