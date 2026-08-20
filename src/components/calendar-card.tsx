"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Reveal from "./reveal";
import Photo from "./photo";
import { CalendarEvent, statusStyles, categoryVariant } from "@/lib/calendar";

const tiltSpring = { stiffness: 200, damping: 20, mass: 0.4 };

export default function CalendarCard({
  event,
  index = 0,
}: {
  event: CalendarEvent;
  index?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), tiltSpring);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), tiltSpring);
  const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), tiltSpring);
  const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), tiltSpring);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <Reveal delay={(index % 6) * 0.06} className="h-full perspective-1000">
      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="h-full"
      >
        <Link
          ref={ref}
          href={`/evenements/${event.slug}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-accent/40 sm:flex-row"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([gx, gy]) =>
                  `radial-gradient(500px circle at ${gx}% ${gy}%, color-mix(in srgb, var(--accent-fill) 12%, transparent), transparent 60%)`
              ),
            }}
          />
          <div className="relative mx-auto aspect-[707/1000] w-36 shrink-0 overflow-hidden sm:mx-0 sm:w-48 sm:self-start">
            <Photo
              src={event.image}
              alt={event.title}
              label={event.title}
              variant={categoryVariant[event.category] ?? "dark"}
              fit="cover"
              className="h-full w-full transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="relative z-10 flex flex-1 flex-col p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-accent">
                {event.category}
              </span>
              {event.status && (
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] ${statusStyles[event.statusType]}`}
                >
                  {event.status.replace(/\.$/, "")}
                </span>
              )}
            </div>
            <h3 className="mt-2 font-display text-lg tracking-tight text-foreground">
              {event.title}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted">
              {event.dateLabel} · {event.location}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {event.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.18em] text-foreground transition-colors group-hover:text-accent">
              Consulter le programme
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </Link>
      </motion.div>
    </Reveal>
  );
}
