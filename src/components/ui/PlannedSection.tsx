import { ContentNote } from "./ContentNote";

/** Temporary body for routes scheduled in a later build phase. */
export function PlannedSection({ phase, children }: { phase: string; children?: React.ReactNode }) {
  return (
    <section className="container-site py-20">
      <ContentNote className="max-w-2xl">
        This page’s full layout is built in {phase}.{children ? <> {children}</> : null}
      </ContentNote>
    </section>
  );
}
