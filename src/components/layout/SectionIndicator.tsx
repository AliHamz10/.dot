"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionIndicatorProps {
  number: string;
}

export function SectionIndicator({ number }: SectionIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-sm tracking-[0.28em] text-textSecondary"
    >
      {number}
    </motion.span>
  );
}
