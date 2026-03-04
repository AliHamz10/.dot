import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  const scriptPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "sql/create-contact-submissions.sql",
  );

  const sql = await readFile(scriptPath, "utf8");
  const client = new Client({ connectionString: databaseUrl });

  await client.connect();
  try {
    await client.query(sql);
  } finally {
    await client.end();
  }

  process.stdout.write("Contact submissions table is ready.\n");
}

main().catch((error) => {
  process.stderr.write(`Failed to set up contact table: ${String(error)}\n`);
  process.exit(1);
});
