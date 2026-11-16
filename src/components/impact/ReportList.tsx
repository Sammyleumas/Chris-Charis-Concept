import { FileText, Download } from "lucide-react";
import type { Report } from "@/content/types";

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function ReportList({ reports }: { reports: Report[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {reports.map((r) => (
        <li key={r.fileUrl} className="grid gap-4 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8">
          <span className="grid h-14 w-14 place-items-center rounded-xl bg-mist text-brand-ink">
            <FileText aria-hidden="true" className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-semibold text-brand-ink">{r.period}</p>
            <h3 className="mt-1 text-lg font-semibold">{r.title}</h3>
            <p className="mt-1 text-sm text-slate-ink">{r.description}</p>
            <p className="mt-2 text-xs text-slate-ink">
              Published <time dateTime={r.publishedOn}>{fmt(r.publishedOn)}</time>
              {r.fileSizeLabel && <> · PDF, {r.fileSizeLabel}</>}
            </p>
          </div>
          <a
            href={r.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 justify-self-start rounded-full border border-ink/20 px-5 text-sm font-semibold text-ink hover:border-ink hover:bg-ink hover:text-white"
          >
            <Download aria-hidden="true" className="h-4 w-4" /> Download PDF
            <span className="sr-only">: {r.title} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
