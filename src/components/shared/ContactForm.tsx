"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    event.currentTarget.reset();
    setStatus("Message captured. Connect your backend endpoint when ready.");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input name="name" placeholder="Name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Textarea name="message" placeholder="Message" required />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
      {status ? <p className="text-sm text-textSecondary">{status}</p> : null}
    </form>
  );
}
