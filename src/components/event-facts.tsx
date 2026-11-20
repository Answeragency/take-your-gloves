import Reveal from "./reveal";

export type EventFact = { key: "date" | "place" | "format" | "duration" | "places" | "inclus"; label: string; value: string };

const ICONS: Record<EventFact["key"], React.ReactNode> = {
  date: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="3" />
      <path d="M8 2.5v4M16 2.5v4M3 10h18" />
    </>
  ),
  place: (
    <>
      <path d="M12 21s-7-5.6-7-11a7 7 0 0114 0c0 5.4-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  format: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  duration: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  places: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.2a3 3 0 010 5.6M21 20c0-2.6-1.6-4.8-4-5.6" />
    </>
  ),
  inclus: <path d="M5 12.5l4.5 4.5L19 7" />,
};

// Colonnes adaptées au nombre de faits pour ne jamais laisser de case vide.
const LG_COLS: Record<number, string> = { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-3" };

/** Bande de faits clés qui chevauche le bas du héros. */
export default function EventFacts({ facts }: { facts: EventFact[] }) {
  const sm = facts.length % 2 === 0 ? "sm:grid-cols-2" : "";
  return (
    <section aria-labelledby="facts-title" className="relative z-10 mx-auto -mt-12 max-w-7xl px-6 lg:-mt-16 lg:px-10">
      <h2 id="facts-title" className="sr-only">Informations clés</h2>
      <Reveal>
        <dl className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-2xl shadow-black/40 ${sm} ${LG_COLS[facts.length] ?? "lg:grid-cols-3"}`}>
          {facts.map((f) => (
            <div key={f.key} className="flex items-start gap-4 bg-surface p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[f.key]}
                </svg>
              </span>
              <div className="min-w-0">
                <dt className="text-xs uppercase tracking-[0.15em] text-muted">{f.label}</dt>
                <dd className="mt-1 font-display text-base leading-snug tracking-tight text-foreground">{f.value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
