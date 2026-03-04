"use client";

import { Instagram, Linkedin, Twitter, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/animation/FadeIn";
import { ContactForm } from "@/components/shared/ContactForm";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { socialLinks } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  Instagram,
  LinkedIn: Linkedin,
  Twitter,
};

export function Contact() {
  return (
    <section id="contact" className="section-padding pb-16">
      <div className="section-shell">
        <SectionTitle number="03" label="CONTACT" title="Let's Build Together" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <FadeIn className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-textTertiary">Address</p>
              <p className="mt-2 text-lg text-textPrimary">Peshawar, Pakistan</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-textTertiary">Email</p>
              <p className="mt-2 text-lg text-textPrimary">hello@aidot.tech</p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-textSecondary">
              Tell us your domain, current workflow pain, and target KPI. We will map
              an AI-native rollout plan with delivery milestones.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="mt-14 border-t border-borderSubtle pt-8">
          <div className="flex items-center justify-center gap-8">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.label];
              if (!Icon) return null;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="rounded-md p-2 text-textSecondary transition-colors hover:bg-accentSoft hover:text-accent"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
