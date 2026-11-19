"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Photo from "./photo";
import Reveal from "./reveal";

export type GalleryItem = {
  id: string;
  src: string;
  label: string;
  variant: "dark" | "red" | "gold";
};

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);
  const go = useCallback(
    (dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, close, go]);

  const current = open === null ? null : items[open];

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3">
        {items.map((p, i) => {
          const ratio =
            i % 5 === 0 ? "aspect-[16/9]" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]";
          return (
            <Reveal key={p.id} delay={(i % 6) * 0.06} className="mb-4 break-inside-avoid">
              <button
                type="button"
                aria-label={`Agrandir la photo : ${p.label}`}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(i);
                }}
                className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl text-left ${ratio}`}
              >
                <Photo
                  src={p.src}
                  alt={p.label}
                  label={p.label}
                  variant={p.variant}
                  priority={i < 4}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="font-display text-xs uppercase tracking-[0.15em] text-foreground">
                    {p.label}
                  </span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {current && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.label}
            data-lenis-prevent
            className="fixed inset-0 z-[9999] flex flex-col bg-background/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-4 lg:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-display text-xs uppercase tracking-[0.2em] text-foreground/80">
                {current.label}
                <span className="ml-3 text-muted">
                  {open + 1} / {items.length}
                </span>
              </p>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label="Fermer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  className="absolute inset-x-4 inset-y-2 lg:inset-x-24"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={current.src}
                    alt={current.label}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              {(["prev", "next"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-label={d === "prev" ? "Photo précédente" : "Photo suivante"}
                  onClick={(e) => {
                    e.stopPropagation();
                    go(d === "prev" ? -1 : 1);
                  }}
                  className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/60 text-foreground backdrop-blur transition-colors hover:border-accent hover:text-accent sm:flex ${
                    d === "prev" ? "left-4 lg:left-8" : "right-4 lg:right-8"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path
                      d={d === "prev" ? "M11 3L5 9l6 6" : "M7 3l6 6-6 6"}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>
            <div className="h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
