"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-3xl px-6 pt-32 text-center lg:px-10">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Petit incident</p>
        <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          Quelque chose a <span className="gold-text">calé</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          La page n&apos;a pas pu se charger. Réessayez dans un instant, ou revenez à l&apos;accueil.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-accent-fill px-8 py-4 font-display text-sm uppercase tracking-[0.05em] text-foreground transition-colors hover:bg-accent-fill-hover"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="rounded-full border border-foreground/25 px-8 py-4 font-display text-sm uppercase tracking-[0.05em] text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
