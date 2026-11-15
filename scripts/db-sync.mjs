/**
 * Applies prisma/schema.prisma to the database during the build.
 *
 * - Skips (with a warning) when DATABASE_URL is not a Postgres URL, so a
 *   deploy without a database still builds and the public site stays up.
 * - Uses the direct (unpooled) connection when Neon provides one, because
 *   schema changes should not go through the connection pooler.
 * - Never passes --accept-data-loss: a change that would drop data fails
 *   the build instead of silently deleting anything.
 */
import { execSync } from "node:child_process";

const pooled = process.env.DATABASE_URL ?? "";
const direct =
  process.env.DATABASE_URL_UNPOOLED ?? process.env.POSTGRES_URL_NON_POOLING ?? pooled;

if (!/^postgres(ql)?:\/\//.test(direct)) {
  console.warn("[db-sync] DATABASE_URL is not a Postgres URL; skipping schema sync.");
  process.exit(0);
}

console.log("[db-sync] Applying Prisma schema to the database…");
execSync("npx prisma db push --skip-generate", {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: direct },
});
