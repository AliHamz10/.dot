import { NextResponse } from "next/server";
import { type ContactFormValues, validateContactForm } from "@/lib/contact-form";
import { saveContactSubmission } from "@/lib/server/contact-storage";

function toFormValues(payload: unknown): ContactFormValues {
  const body = (payload ?? {}) as Partial<Record<keyof ContactFormValues, unknown>>;

  return {
    name: typeof body.name === "string" ? body.name : "",
    email: typeof body.email === "string" ? body.email : "",
    message: typeof body.message === "string" ? body.message : "",
  };
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const values = toFormValues(payload);
    const errors = validateContactForm(values);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please fix the highlighted fields.",
          errors,
        },
        { status: 400 },
      );
    }

    const submission = await saveContactSubmission(values);

    return NextResponse.json(
      {
        ok: true,
        id: submission.id,
        createdAt: submission.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to store contact submission", error);
    return NextResponse.json(
      {
        ok: false,
        message: "We could not store your message. Please try again.",
      },
      { status: 500 },
    );
  }
}
