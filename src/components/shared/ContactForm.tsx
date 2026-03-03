"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  getTrimmedMessageLength,
  initialContactFormValues,
  type ContactFormValues,
  validateContactForm,
} from "@/lib/contact-form";

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialContactFormValues());
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const messageLength = useMemo(() => getTrimmedMessageLength(values.message), [values.message]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as keyof ContactFormValues]) return prev;
      const updated = { ...prev };
      delete updated[name as keyof ContactFormValues];
      return updated;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    setValues(initialContactFormValues());
    setStatus("Message captured. Connect your backend endpoint when ready.");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={onSubmit} className="surface-card space-y-5 p-6 md:p-7" noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-textPrimary">
          Name
        </label>
        <Input
          id="name"
          name="name"
          placeholder="Your full name"
          value={values.name}
          onChange={onChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          required
        />
        {errors.name ? (
          <p id="name-error" className="text-sm text-red-700">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-textPrimary">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          value={values.email}
          onChange={onChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          required
        />
        {errors.email ? (
          <p id="email-error" className="text-sm text-red-700">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="message" className="text-sm font-medium text-textPrimary">
            Project Brief
          </label>
          <span className="text-xs text-textTertiary">{messageLength} characters</span>
        </div>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us your industry, workflow pain points, and goal metric."
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        {errors.message ? (
          <p id="message-error" className="text-sm text-red-700">
            {errors.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full justify-center">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {status ? (
        <p className="text-sm text-textSecondary" role="status" aria-live="polite">
          {status}
        </p>
      ) : null}
    </form>
  );
}
