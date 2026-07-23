"use client";

import { motion } from "motion/react";

const DEFAULT_ITEMS = [
  "Rallye Touristique",
  "Trackday",
  "Sortie Conviviale",
  "Expérience Atypique",
  "Roulage sur Glace",
  "Road Trip",
  "Expérience Immersive",
  "Musées Automobiles",
];

export default function Marquee({ items }: { items?: string[] }) {
  const list = items && items.length > 0 ? items : DEFAULT_ITEMS;
  const repeated = [...list, ...list, ...list, ...list, ...list, ...list];

  return (
    <div className="overflow-hidden border-y border-line bg-surface/60 py-4 select-none">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-display text-[11px] uppercase tracking-[0.32em] text-foreground/40">
              {item}
            </span>
            <span className="text-accent/50 text-sm">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
