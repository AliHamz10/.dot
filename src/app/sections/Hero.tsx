"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/animation/TextReveal";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, prefersReducedMotion ? 1 : 0.2]);
  const y = useTransform(scrollYProgress, [0, 0.25], [0, prefersReducedMotion ? 0 : 72]);

  return (
    <motion.section
      id="hero"
      style={{ opacity, y }}
      className="relative flex min-h-[calc(100vh-4rem)] items-center px-6 py-20 md:min-h-[calc(100vh-5rem)] md:px-12 md:py-24 lg:px-16"
    >
      <div className="section-shell grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="kicker mb-6">
            VERTICAL AI SOLUTIONS
          </p>
          <TextReveal
            text=".dot"
            as="h1"
            className="text-[clamp(4rem,12vw,10rem)] font-semibold leading-none"
          />
          <p className="body-lg mt-8 max-w-2xl">
            We build AI-native SaaS products for specific industries. No generic tools.
            Pure vertical expertise.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#products" className="btn-primary">
              Explore Platforms
            </a>
            <a href="#contact" className="btn-secondary">
              Start a Project
            </a>
          </div>
        </div>
        <div className="lg:col-span-5 lg:justify-self-end">
          <div className="surface-card max-w-sm p-6 lg:p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-textTertiary">
              Why .dot
            </p>
            <p className="mt-4 text-left text-xl font-medium leading-snug text-textPrimary md:text-2xl">
              We ship measurable outcomes, not demos.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-textSecondary">
              Product strategy, AI engineering, and UX shipped as one operating system.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
