import "server-only";
import { eq } from "drizzle-orm";
import { db, hashIp, isDatabaseConfigured, schema } from "@/lib/db";
import { isEmailConfigured, sendSubmissionEmail } from "@/lib/integrations/email";

export type Delivery = "delivered" | "not-configured" | "failed";

/**
 * Stores a submission (when DATABASE_URL is set) and emails it (when
 * Resend is set). Succeeds if at least one channel works, so a mail outage
 * never loses an enquiry that reached the database.
 */
export async function deliverSubmission({
  kind,
  data,
  labels,
  subject,
  to,
  ip,
}: {
  kind: string;
  data: Record<string, string>;
  /** field name → human label, for the email body */
  labels: Record<string, string>;
  subject: string;
  to?: string;
  ip?: string;
}): Promise<Delivery> {
  const canStore = isDatabaseConfigured();
  const canEmail = isEmailConfigured();
  if (!canStore && !canEmail) return "not-configured";

  const { company: _hp, consent: _c, ...clean } = data;
  void _hp;
  void _c;

  let storedId: number | null = null;
  if (canStore) {
    try {
      const [row] = await db()
        .insert(schema.submissions)
        .values({ kind, name: clean.name ?? null, email: clean.email, data: clean, ipHash: ip ? hashIp(ip) : null })
        .returning({ id: schema.submissions.id });
      storedId = row.id;
    } catch (err) {
      console.error(`[${kind}] store failed`, err);
    }
  }

  let emailed = false;
  if (canEmail) {
    try {
      const fields: Record<string, string | undefined> = {};
      for (const [k, label] of Object.entries(labels)) fields[label] = clean[k];
      await sendSubmissionEmail({ subject, fields, replyTo: clean.email, to });
      emailed = true;
      if (storedId !== null) {
        await db().update(schema.submissions).set({ emailed: new Date() }).where(eq(schema.submissions.id, storedId));
      }
    } catch (err) {
      console.error(`[${kind}] email failed`, err);
    }
  }

  return storedId !== null || emailed ? "delivered" : "failed";
}
