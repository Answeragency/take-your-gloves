import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import Button from "@/components/button";
import CalendarCard from "@/components/calendar-card";
import { calendar, statusStyles, categoryVariant } from "@/lib/calendar";

export function generateStaticParams() {
  return calendar.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = calendar.find((e) => e.slug === slug);
  if (!event) return {};
  return {
    title: `${event.title} | Take Your Gloves`,
    description: event.description,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = calendar.find((e) => e.slug === slug);
  if (!event) notFound();

  const others = calendar.filter((e) => e.slug !== slug).slice(0, 3);
  const variant = categoryVariant[event.category] ?? "dark";

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <Link
                href="/evenements"
                className="font-display text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground"
              >
                ← Tout le calendrier 2026
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="font-display text-xs uppercase tracking-[0.3em] text-accent">
                  {event.category}
                </span>
                {event.status && (
                  <span
                    className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.1em] ${statusStyles[event.statusType]}`}
                  >
                    {event.status.replace(/\.$/, "")}
                  </span>
                )}
              </div>
              <h1 className="text-balance mt-4 font-display text-5xl leading-[1.0] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {event.title}
              </h1>
              <p className="mt-4 font-display text-sm uppercase tracking-[0.15em] text-muted">
                {event.dateLabel} · {event.location}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/40">
                <Photo
                  src={event.image}
                  alt={event.title}
                  label={event.title}
                  variant={variant}
                  fit="contain"
                  className="h-full w-full"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-base leading-relaxed text-foreground/85">
              {event.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="sticky top-28 rounded-2xl border border-line bg-surface p-7">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-foreground">
                Informations clés
              </h3>
              <dl className="mt-6 space-y-5">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted">Dates</dt>
                  <dd className="text-right text-sm text-foreground">{event.dateLabel}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted">Lieu</dt>
                  <dd className="text-right text-sm text-foreground">{event.location}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <dt className="text-xs uppercase tracking-[0.1em] text-muted">Format</dt>
                  <dd className="text-right text-sm text-foreground">{event.category}</dd>
                </div>
              </dl>
              <Button href="/contact" className="mt-7 w-full justify-center">
                Me pré-réserver une place
              </Button>
              <p className="mt-4 text-center text-xs text-muted">
                Sans engagement définitif — réponse personnalisée sous 48h.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <h3 className="font-display text-xs uppercase tracking-[0.3em] text-accent">
            À découvrir aussi
          </h3>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground">
            Les autres dates du calendrier
          </h2>
          <div className="mt-10 grid gap-6">
            {others.map((e, i) => (
              <CalendarCard key={e.slug} event={e} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
