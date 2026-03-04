import "server-only";

import type { ContactFormValues } from "@/lib/contact-form";
import { getDbPool } from "@/lib/server/db";

export interface StoredContactSubmission extends ContactFormValues {
  id: string;
  createdAt: string;
}

export async function saveContactSubmission(
  values: ContactFormValues,
): Promise<StoredContactSubmission> {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();
  const pool = getDbPool();
  const result = await pool.query<{ id: string; created_at: Date | string }>(
    `
      insert into contact_submissions (name, email, message)
      values ($1, $2, $3)
      returning id, created_at
    `,
    [name, email, message],
  );

  const row = result.rows[0];
  if (!row) {
    throw new Error("Insert failed: no row returned from contact_submissions.");
  }

  return {
    id: row.id,
    createdAt:
      row.created_at instanceof Date
        ? row.created_at.toISOString()
        : new Date(row.created_at).toISOString(),
    name,
    email,
    message,
  };
}
