"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

/**
 * Subtle fade-and-rise on first scroll into view. For reduced-motion users,
 * MotionConfig (reducedMotion="user") drops the movement and keeps only the
 * fade. Always the same element on server and client: swapping to a static
 * element after hydration left the server's hidden inline style in place.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, delay, ease: ease.out }}
    >
      {children}
    </Comp>
  );
}
