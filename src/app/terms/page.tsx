import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo/meta";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfUse as doc } from "@/content/legal/documents";

export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.summary, path: "/terms" });

export default function Page() {
  return <LegalPage doc={doc} />;
}
