"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/** Barre d'action flottante : apparaît après le héros, disparaît près du formulaire et du pied de page. */
export default function EventActionBar({ title, dateLabel }: { title: string; dateLabel: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const form = document.getElementById("infos");
      const formTop = form ? form.getBoundingClientRect().top : Infinity;
      const nearEnd = document.documentElement.scrollHeight - y - window.innerHeight < 700;
      setShow(y > 640 && formTop > window.innerHeight * 0.55 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-1/2 z-40 flex w-[min(94vw,720px)] -translate-x-1/2 items-center justify-between gap-4 rounded-2xl border border-line bg-background/90 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-md sm:px-5"
        >
          <div className="min-w-0">
            <p className="truncate font-display text-sm tracking-tight text-foreground">{title}</p>
            <p className="truncate text-xs text-muted">{dateLabel}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full border border-foreground/25 px-4 py-2.5 font-display text-xs uppercase tracking-[0.05em] text-white transition-colors hover:border-accent/70 hover:text-accent sm:inline-block"
            >
              Nous contacter
            </Link>
            <button
              type="button"
              onClick={() =>
                document.getElementById("infos")?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="rounded-full bg-accent-fill px-5 py-2.5 font-display text-xs uppercase tracking-[0.05em] text-white transition-colors hover:bg-accent-fill-hover"
            >
              Recevoir les infos
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
