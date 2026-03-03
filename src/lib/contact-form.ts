export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

export const MIN_CONTACT_MESSAGE_LENGTH = 30;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initialContactFormValues(): ContactFormValues {
  return {
    name: "",
    email: "",
    message: "",
  };
}

export function getTrimmedMessageLength(message: string): number {
  return message.trim().length;
}

export function validateContactForm(values: ContactFormValues): ContactErrors {
  const nextErrors: ContactErrors = {};
  const trimmedName = values.name.trim();
  const trimmedEmail = values.email.trim();
  const trimmedMessage = values.message.trim();

  if (!trimmedName) {
    nextErrors.name = "Please enter your name.";
  }

  if (!trimmedEmail) {
    nextErrors.email = "Please enter your email.";
  } else if (!emailPattern.test(trimmedEmail)) {
    nextErrors.email = "Please enter a valid email address.";
  }

  if (!trimmedMessage) {
    nextErrors.message = "Please add a short project brief.";
  } else if (trimmedMessage.length < MIN_CONTACT_MESSAGE_LENGTH) {
    nextErrors.message = "Please share at least 30 characters for context.";
  }

  return nextErrors;
}
