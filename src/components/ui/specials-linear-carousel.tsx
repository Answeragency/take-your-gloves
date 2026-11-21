"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CardData = {
  src: string;
  title: string;
  href: string;
  category?: string;
  meta?: string;
};

interface CarouselProps {
  /** Données simples (sérialisables) : le serveur ne peut pas passer d'éléments React à cloner. */
  cards: CardData[];
  initialScroll?: number;
  /** Défilement automatique en boucle (s'arrête au survol, au toucher et si l'utilisateur préfère moins d'animations). */
  autoplay?: boolean;
  /** Pixels par image d'animation. */
  autoplaySpeed?: number;
}

const DRAG_THRESHOLD = 6;

export const Carousel = ({
  cards,
  initialScroll = 0,
  autoplay = false,
  autoplaySpeed = 0.5,
}: CarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0); // position décimale : scrollLeft arrondit les petits pas
  const dragRef = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hold, setHold] = useState(false);
  const holdTimer = useRef<number | undefined>(undefined);

  /** Suspend le défilement automatique un moment (clic sur une flèche, fin d'un toucher) : sinon il écraserait le défilement animé. */
  const holdFor = (ms: number) => {
    setHold(true);
    window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => setHold(false), ms);
  };
  useEffect(() => () => window.clearTimeout(holdTimer.current), []);

  // Les éléments sont dupliqués : quand on atteint la moitié, on revient au début sans à-coup.
  const loopedCards = [...cards, ...cards];

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = initialScroll;
    update();
  }, [initialScroll]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !autoplay || paused || hold) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    posRef.current = el.scrollLeft;
    let raf = 0;
    const tick = () => {
      const half = el.scrollWidth / 2;
      posRef.current += autoplaySpeed;
      if (half > 0 && posRef.current >= half) posRef.current -= half;
      el.scrollLeft = posRef.current;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, autoplaySpeed, paused, hold]);

  const step = (dir: 1 | -1) => {
    holdFor(4000);
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  // Glisser à la souris (le tactile utilise le défilement natif)
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.pageX, startLeft: el.scrollLeft, moved: 0 };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    const d = dragRef.current;
    const el = trackRef.current;
    if (!d.active || !el) return;
    const dx = e.pageX - d.startX;
    d.moved = Math.max(d.moved, Math.abs(dx));
    el.scrollLeft = d.startLeft - dx;
  };
  const endDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        endDrag();
        setPaused(false);
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => {
        setPaused(false);
        holdFor(3000);
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-background to-transparent md:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-background to-transparent md:w-24"
      />

      <div
        ref={trackRef}
        data-lenis-prevent
        role="region"
        aria-roledescription="carrousel"
        aria-label="Prochains événements"
        className={cn(
          "flex w-full cursor-grab overflow-x-auto overscroll-x-contain py-6 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        )}
        onScroll={update}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        // Après un glissé, on n'ouvre pas la carte sur laquelle on relâche la souris.
        onClickCapture={(e) => {
          if (dragRef.current.moved > DRAG_THRESHOLD) {
            e.preventDefault();
            e.stopPropagation();
            dragRef.current.moved = 0;
          }
        }}
      >
        <ul className="flex flex-row justify-start gap-4 px-4 md:gap-6 md:px-8">
          {loopedCards.map((card, index) => (
            <motion.li
              key={`card-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * (index % cards.length), ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0 list-none"
              aria-hidden={index >= cards.length ? true : undefined}
            >
              <Card card={card} />
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-2 flex justify-center gap-3">
        {([-1, 1] as const).map((dir) => {
          const Icon = dir === -1 ? ChevronLeft : ChevronRight;
          return (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              disabled={dir === -1 ? !canScrollLeft : !canScrollRight}
              aria-label={dir === -1 ? "Événements précédents" : "Événements suivants"}
              className="relative z-30 flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-line bg-surface text-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
            >
              <Icon className="h-5 w-5" aria-hidden />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const Card = ({ card }: { card: CardData; index?: number }) => {
  return (
    <Link
      href={card.href}
      draggable={false}
      className="group relative block aspect-[707/1000] w-60 overflow-hidden rounded-3xl border border-line bg-surface-2 transition-colors duration-300 hover:border-accent/60 md:w-72"
    >
      <Image
        quality={90}
        src={card.src}
        alt={card.title}
        fill
        draggable={false}
        sizes="(max-width: 768px) 240px, 288px"
        className="select-none object-cover"
      />
      {/* Survol : simple voile + bouton centré. L'affiche porte déjà titre et date. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-fill px-7 py-3.5 font-display text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-lg shadow-black/40">
          Voir le programme <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
};

export default Carousel;
