import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";

/**
 * Sanity webhook target. Configure in sanity.io/manage → API → Webhooks:
 * URL https://<domain>/api/revalidate, method POST, trigger on create,
 * update and delete, header "x-revalidate-secret: <SANITY_REVALIDATE_SECRET>".
 * Marks all CMS content stale so the next visit fetches the published change.
 */
export async function POST(request: Request) {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!expected) return Response.json({ ok: false, error: "Not configured" }, { status: 503 });

  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return Response.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  }

  revalidateTag("cms", "max");
  return Response.json({ ok: true, revalidated: "cms", at: new Date().toISOString() });
}
