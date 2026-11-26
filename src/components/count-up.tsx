"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";

export default function CountUp({
  value,
  delay = 0,
  duration = 1.6,
  immediate = false,
}: {
  value: string;
  /** Secondes avant le départ du comptage (ex : attendre la fin d'une entrée). */
  delay?: number;
  duration?: number;
  /** Démarre sans attendre que le chiffre soit visible à l'écran (ex : bas de héros, parfois coupé sur mobile). */
  immediate?: boolean;
}) {
  const match = value.match(/^([+]?)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const suffix = match ? match[3] : "";
  const final = target.toFixed(decimals);

  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-80px" });
  const inView = immediate || seen;
  // Le chiffre final est affiché par défaut (rendu serveur, sans JS, capture d'écran…).
  // Le comptage n'est qu'un bonus : on ne repart de 0 que si le chiffre est hors écran
  // (ou demandé « immediate ») et que le visiteur n'a pas demandé moins d'animations.
  const [display, setDisplay] = useState(final);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = ref.current?.getBoundingClientRect().top ?? 0;
    if (!reduced && (immediate || top > window.innerHeight)) {
      setDisplay((0).toFixed(decimals));
      setArmed(true);
    }
  }, [immediate, decimals]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, target, {
      delay,
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
      onComplete: () => setDisplay(final),
    });
    return () => controls.stop();
  }, [armed, inView, target, decimals, delay, duration, final]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
