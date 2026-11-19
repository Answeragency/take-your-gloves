"use client";

import { MotionConfig } from "motion/react";

// Respecte le réglage « réduire les animations » du système pour tout le site.
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
