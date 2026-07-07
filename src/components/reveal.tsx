"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

type Mode = "fade" | "clip" | "slide-left" | "slide-right";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  mode?: Mode;
};

function makeVariants(mode: Mode, y: number) {
  switch (mode) {
    case "clip":
      return {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        visible: { clipPath: "inset(0 0 0% 0)" },
      };
    case "slide-left":
      return {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
      };
    case "slide-right":
      return {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
      };
    default:
      return {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      };
  }
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  mode = "fade",
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={makeVariants(mode, y)}
      transition={{
        duration: mode === "clip" ? 0.9 : 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
