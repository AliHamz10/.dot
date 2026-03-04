import "server-only";

import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __dotWebsitePgPool: Pool | undefined;
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  return databaseUrl;
}

export function getDbPool(): Pool {
  if (!globalThis.__dotWebsitePgPool) {
    globalThis.__dotWebsitePgPool = new Pool({
      connectionString: getDatabaseUrl(),
    });
  }

  return globalThis.__dotWebsitePgPool;
}
