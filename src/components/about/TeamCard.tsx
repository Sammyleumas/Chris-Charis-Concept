import type { TeamMember } from "@/content/types";
import { Photo } from "@/components/ui/Photo";

export function TeamCard({ member, featured }: { member: TeamMember; featured?: boolean }) {
  return (
    <li>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-mist">
        <Photo image={member.photo} sizes={featured ? "(min-width: 1024px) 33vw, 50vw" : "(min-width: 1024px) 25vw, 50vw"} />
      </div>
      <h3 className={featured ? "mt-5 text-h3 font-semibold" : "mt-4 text-base font-semibold"}>{member.name}</h3>
      <p className="mt-1 text-sm font-medium text-brand-ink">{member.role}</p>
      {member.department && <p className="text-sm text-slate-ink">{member.department}</p>}
      {featured && member.bio && <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-ink">{member.bio}</p>}
      {member.links && member.links.length > 0 && (
        <ul className="mt-3 flex gap-4 text-sm">
          {member.links.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-ink underline-offset-4 hover:underline">
                {l.label}<span className="sr-only"> for {member.name} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
