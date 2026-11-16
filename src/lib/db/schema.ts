import { index, jsonb, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

/**
 * Website submissions (brief §9: "submissions emailed and stored").
 * One table for all enquiry forms; `kind` says which form, `data` holds the
 * validated fields. IPs are never stored, only a salted hash for abuse checks.
 */
export const submissions = pgTable(
  "submissions",
  {
    id: serial("id").primaryKey(),
    kind: text("kind").notNull(), // contact | volunteer | partner | careers | quote
    name: text("name"),
    email: text("email").notNull(),
    data: jsonb("data").$type<Record<string, string>>().notNull(),
    emailed: timestamp("emailed_at", { withTimezone: true }),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("submissions_kind_created_idx").on(t.kind, t.createdAt)],
);

export const newsletterSignups = pgTable(
  "newsletter_signups",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    consentedAt: timestamp("consented_at", { withTimezone: true }).defaultNow().notNull(),
    syncedToBrevo: timestamp("synced_to_brevo_at", { withTimezone: true }),
  },
  (t) => [uniqueIndex("newsletter_email_idx").on(t.email)],
);
