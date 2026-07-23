import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import Button from "@/components/button";
import CalendarCard from "@/components/calendar-card";
import { statusStyles, categoryVariant } from "@/lib/calendar";
import { getEventBySlug, getAllEventSlugs, getUpcomingEvents } from "@/sanity/lib/queries";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  const url = `https://take-your-gloves.vercel.app/evenements/${slug}`;
  return {
    title: `${event.title} — ${event.category} en ${event.location}`,
    description: event.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${event.title} | Take Your Gloves`,
      description: event.description,
      url,
      type: "article",
      images: event.image
        ? [{ url: event.image, width: 800, height: 1100, alt: event.title }]
        : [{ url: "/images/ardennes-chateau-parade.jpg", width: 1200, height: 630, alt: event.title }],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const others = (await getUpcomingEvents(4)).filter((e) => e.slug !== slug).slice(0, 3);
  const variant = categoryVariant[event.category] ?? "dark";

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    url: `https://take-your-gloves.vercel.app/evenements/${slug}`,
    image: event.image ?? "https://take-your-gloves.vercel.app/images/ardennes-chateau-parade.jpg",
    startDate: event.dateSort ?? undefined,
    location: {
      "@type": "Place",
      name: event.location,
      address: { "@type": "PostalAddress", addressCountry: "FR" },
    },
    organizer: {
      "@type": "Organization",
      name: "Take Your Gloves",
      url: "https://take-your-gloves.vercel.app",
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-40 lg:pb-20">
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
            {event.body && Array.isArray(event.body) && event.body.length > 0 && (
              <div className="prose prose-invert mt-8 max-w-none text-foreground/85">
                <PortableText value={event.body as Parameters<typeof PortableText>[0]["value"]} />
              </div>
            )}
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
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
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
