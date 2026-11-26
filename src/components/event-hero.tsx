"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Photo from "./photo";

const EASE = [0.22, 1, 0.36, 1] as const;
const tilt = { stiffness: 160, damping: 20, mass: 0.5 };

export default function EventHero({
  title,
  category,
  badge,
  badgeClass,
  dateLabel,
  location,
  image,
  variant,
}: {
  title: string;
  category: string;
  badge?: string;
  badgeClass: string;
  dateLabel: string;
  location: string;
  image?: string;
  variant: "dark" | "red" | "gold";
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), tilt);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), tilt);

  const goToForm = () =>
    document.getElementById("infos")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section className="relative overflow-hidden rounded-b-[2.5rem] border-b border-line pb-24 pt-28 lg:pb-32 lg:pt-36">
      {image && (
        <div aria-hidden className="absolute inset-0">
          <Image src={image} alt="" fill sizes="400px" quality={40} className="scale-125 object-cover opacity-30 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
      )}

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10">
        <div>
          <motion.nav
            aria-label="Fil d'Ariane"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-wrap items-center gap-2 font-display text-xs uppercase tracking-[0.15em] text-muted"
          >
            <Link href="/" className="inline-block py-2.5 hover:text-foreground">Accueil</Link>
            <span aria-hidden>›</span>
            <Link href="/evenements" className="inline-block py-2.5 hover:text-foreground">Calendrier 2027</Link>
            <span aria-hidden>›</span>
            <span className="text-foreground/80" aria-current="page">{title}</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-display text-xs uppercase tracking-[0.2em] text-accent">
              {category}
            </span>
            {badge && (
              <span className={`rounded-full border px-2.5 py-0.5 text-[0.6875rem] uppercase tracking-[0.06em] ${badgeClass}`}>
                {badge}
              </span>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
            className="text-balance mt-5 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-5 font-display text-sm uppercase tracking-[0.15em] text-muted sm:text-base"
          >
            {dateLabel} <span className="text-gold">·</span> {location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={goToForm}
              className="inline-flex items-center gap-2 rounded-full bg-accent-fill px-8 py-4 font-display text-sm uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:bg-accent-fill-hover"
            >
              Recevoir les infos <span aria-hidden>↓</span>
            </button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-8 py-4 font-display text-sm uppercase tracking-[0.05em] text-white transition-colors duration-300 hover:border-accent/70 hover:text-accent"
            >
              Nous contacter <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        <div className="perspective-1000 mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set((e.clientX - r.left) / r.width - 0.5);
              my.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => {
              mx.set(0);
              my.set(0);
            }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative aspect-[707/1000] overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/50"
          >
            <Photo
              src={image}
              alt={title}
              label={title}
              variant={variant}
              fit="contain"
              className="h-full w-full"
              priority
              sizes="(max-width: 1024px) 80vw, 400px"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
