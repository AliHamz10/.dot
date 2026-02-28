"use client";

import { FadeIn } from "@/components/animation/FadeIn";
import { SectionTitle } from "@/components/shared/SectionTitle";

export function About() {
  return (
    <section id="about" className="section-padding">
      <SectionTitle number="01" label="ABOUT" title="Built for Vertical Depth" />
      <FadeIn className="mt-8 max-w-4xl">
        <p className="text-2xl leading-tight text-textPrimary md:text-4xl">
          .dot builds focused AI SaaS for industries where precision matters. We do not
          ship generic copilots. We design domain-first products with measurable
          outcomes.
        </p>
        <p className="mt-6 text-base leading-relaxed text-textSecondary md:text-lg">
          From workflow automation to operational intelligence, we combine product
          design, machine learning, and tight execution to deliver systems teams adopt.
        </p>
      </FadeIn>
    </section>
  );
}


