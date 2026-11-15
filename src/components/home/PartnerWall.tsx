import Image from "next/image";
import type { Partner } from "@/content/types";
import { ContentNote } from "@/components/ui/ContentNote";

/** Approved partner logos only. Hidden in production until logos exist. */
export function PartnerWall({ partners }: { partners: Partner[] }) {
  if (partners.length === 0 && process.env.NEXT_PUBLIC_CONTENT_NOTES === "off") return null;
  return (
    <section aria-labelledby="partners-title" className="bg-paper py-20">
      <div className="container-site">
        <h2 id="partners-title" className="eyebrow text-center text-slate-ink">Working alongside</h2>
        {partners.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((p) => (
              <li key={p.name} className="relative mx-auto h-14 w-36">
                {p.logo.src && (
                  <Image src={p.logo.src} alt={p.name} fill sizes="144px" className="object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ContentNote className="mx-auto mt-8 max-w-xl">
            Partner logos with permission to display. Arts in Medicine Projects (NAHCON 2021) can be listed once the partnership is confirmed.
          </ContentNote>
        )}
      </div>
    </section>
  );
}
