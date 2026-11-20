"use client";

import { motion } from "motion/react";

const DEFAULT_ITEMS = [
  "Rallyes Touristiques",
  "Trackdays",
  "Sorties Conviviales",
  "Expériences Atypiques",
  "Roulages sur Glace",
  "Road Trips",
  "Expériences Immersives",
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
            <span className="px-6 font-display text-xs uppercase tracking-[0.32em] text-foreground/70">
              {item}
            </span>
            <span aria-hidden="true" className="text-accent/75 text-sm">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
