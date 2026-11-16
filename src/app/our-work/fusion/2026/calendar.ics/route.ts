import { getFusionEvent } from "@/lib/content";
import { siteUrl } from "@/lib/seo/meta";

/** "Add to calendar" file (iCalendar), generated from the event data. */
export async function GET() {
  const e = await getFusionEvent();
  const day = (iso: string) => iso.slice(0, 10).replace(/-/g, "");
  // All-day event: DTEND is the day after the last day.
  const end = new Date(Date.parse(e.endsAt.slice(0, 10)) + 86_400_000).toISOString().slice(0, 10).replace(/-/g, "");
  const esc = (s: string) => s.replace(/[\;,]/g, (m) => `\\${m}`).replace(/\n/g, "\\n");
  const url = `${siteUrl()}/our-work/fusion/${e.slug}`;
  const location = [e.venue, e.city].filter(Boolean).join(", ");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Chris Charis Concept//Website//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:fusion-${e.edition}@chrischarisconcept`,
    `DTSTAMP:${day(e.startsAt)}T000000Z`,
    `DTSTART;VALUE=DATE:${day(e.startsAt)}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(`${e.title} ${e.edition}`)}`,
    `DESCRIPTION:${esc(`${e.summary}\n\nDetails: ${url}`)}`,
    `URL:${url}`,
    ...(location ? [`LOCATION:${esc(location)}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "content-type": "text/calendar; charset=utf-8",
      "content-disposition": `attachment; filename="fusion-art-meets-tech-${e.edition}.ics"`,
    },
  });
}
