"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

export default function CountUp({ value }: { value: string }) {
  const match = value.match(/^([+]?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const suffix = match ? match[3] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(decimals ? "0.0" : "0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
