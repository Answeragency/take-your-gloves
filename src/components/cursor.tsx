"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const cx = useMotionValue(-300);
  const cy = useMotionValue(-300);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  const rx = useSpring(cx, { stiffness: 160, damping: 24, mass: 0.9 });
  const ry = useSpring(cy, { stiffness: 160, damping: 24, mass: 0.9 });

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const onMove = (e: MouseEvent) => {
      cx.set(e.clientX);
      cy.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = () => setHovering(true);
    const onLeave = () => setHovering(false);

    const attach = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    window.addEventListener("mousemove", onMove);
    attach();

    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [isFinePointer, cx, cy, visible]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
      style={{
        x: rx,
        y: ry,
        translateX: "-50%",
        translateY: "-50%",
        background: hovering
          ? "radial-gradient(circle, rgba(30,98,204,0.32) 0%, rgba(30,98,204,0.10) 40%, transparent 70%)"
          : "radial-gradient(circle, rgba(30,98,204,0.18) 0%, rgba(30,98,204,0.06) 40%, transparent 70%)",
      }}
      animate={{
        width: hovering ? 120 : 80,
        height: hovering ? 120 : 80,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
