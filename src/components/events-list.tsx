"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PosterCard from "./poster-card";
import type { CalendarEvent } from "@/lib/calendar";

export default function EventsList({ events }: { events: CalendarEvent[] }) {
  const [active, setActive] = useState("Tous");
  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(events.map((e) => e.category)))],
    [events]
  );
  const visible = active === "Tous" ? events : events.filter((e) => e.category === active);

  return (
    <>
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div
            role="group"
            aria-label="Filtrer les événements par catégorie"
            className="flex flex-wrap items-center justify-center gap-3 py-2"
          >
            {categories.map((c) => {
              const on = c === active;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(c)}
                  className={`relative rounded-full border px-4 py-2.5 font-display text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                    on
                      ? "border-transparent text-foreground"
                      : "border-line text-muted hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="events-filter-pill"
                      className="absolute inset-0 rounded-full bg-accent-fill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
        <h2 className="sr-only">Tous les événements 2026</h2>
        <p className="sr-only" aria-live="polite">
          {visible.length} événement{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}
        </p>
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((event, i) => (
              <motion.div
                key={event.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className="h-full"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <PosterCard event={event} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  );
}
