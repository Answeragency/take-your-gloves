import Reveal from "./reveal";
import CountUp from "./count-up";

const DEFAULT_STATS = [
  { value: "+45", label: "Événements organisés" },
  { value: "+180", label: "Pilotes rencontrés" },
  { value: "+5 ans", label: "D'existence" },
];

export default function StatsStrip({ stats }: { stats?: { value: string; label: string }[] }) {
  const items = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-16 sm:grid-cols-3 lg:px-10">
        {items.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.09}>
            <div className="group text-center lg:text-left">
              <div className="mx-auto mb-4 h-px w-10 bg-gradient-to-r from-gold to-transparent lg:mx-0" />
              <p className="font-display text-5xl text-foreground sm:text-6xl">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2.5 text-xs uppercase tracking-[0.18em] text-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
