import "server-only";

import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { ContactFormValues } from "@/lib/contact-form";

export interface StoredContactSubmission extends ContactFormValues {
  id: string;
  createdAt: string;
}

const DEFAULT_CONTACT_SUBMISSIONS_FILE = "/tmp/dot-website-contact-submissions.ndjson";

export function getContactSubmissionsFilePath(): string {
  return process.env.CONTACT_SUBMISSIONS_FILE ?? DEFAULT_CONTACT_SUBMISSIONS_FILE;
}

export async function saveContactSubmission(
  values: ContactFormValues,
): Promise<StoredContactSubmission> {
  const submission: StoredContactSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: values.name.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  };

  const filePath = getContactSubmissionsFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(submission)}\n`, "utf8");

  return submission;
}
