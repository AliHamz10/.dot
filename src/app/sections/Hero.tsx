"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/animation/TextReveal";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.1]);
  const y = useTransform(scrollYProgress, [0, 0.25], [0, 80]);

  return (
    <motion.section
      id="hero"
      style={{ opacity, y }}
      className="section-padding relative flex min-h-screen items-center"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="mb-6 text-xs tracking-[0.35em] text-textSecondary md:text-sm">
          VERTICAL AI SOLUTIONS
        </p>
        <TextReveal
          text=".dot"
          as="h1"
          className="text-[clamp(4rem,12vw,10rem)] font-semibold leading-none"
        />
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-textSecondary md:text-lg">
          We build AI-native SaaS products for specific industries. No generic tools.
          Pure vertical expertise.
        </p>
      </div>
    </motion.section>
  );
}

