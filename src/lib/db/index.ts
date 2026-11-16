import "server-only";
import { createHash } from "node:crypto";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Postgres connection (Neon in production; any Postgres works).
 * DATABASE_URL is server-only. When it is not set, storage is skipped and
 * forms rely on email delivery alone.
 */
export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

const globalForDb = globalThis as unknown as { __ccDb?: ReturnType<typeof drizzle<typeof schema>> };

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  if (!globalForDb.__ccDb) {
    // max: 1 suits serverless functions; prepare: false suits Neon's pooled endpoint.
    const client = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
    globalForDb.__ccDb = drizzle(client, { schema });
  }
  return globalForDb.__ccDb;
}

/** One-way hash so repeated abuse can be spotted without storing IP addresses. */
export function hashIp(ip: string) {
  const salt = process.env.IP_HASH_SALT ?? "chris-charis";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export { schema };
