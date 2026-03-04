import process from "node:process";
import { Client } from "pg";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    const tableResult = await client.query(
      `
        select table_name
        from information_schema.tables
        where table_schema = $1 and table_name = $2
      `,
      ["public", "contact_submissions"],
    );

    if (tableResult.rowCount !== 1) {
      throw new Error("Table public.contact_submissions was not found.");
    }

    const insertResult = await client.query(
      `
        insert into contact_submissions (name, email, message)
        values ($1, $2, $3)
        returning id, created_at
      `,
      ["Setup Check", "setup-check@aidot.tech", "Setup verification row for contact submissions table."],
    );

    const row = insertResult.rows[0];
    if (!row) {
      throw new Error("Verification insert did not return a row.");
    }

    await client.query("delete from contact_submissions where id = $1", [row.id]);

    process.stdout.write(
      `Verified table and insert/delete cycle. Sample id: ${row.id}, created_at: ${String(
        row.created_at,
      )}\n`,
    );
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  process.stderr.write(`Contact DB verification failed: ${String(error)}\n`);
  process.exit(1);
});
