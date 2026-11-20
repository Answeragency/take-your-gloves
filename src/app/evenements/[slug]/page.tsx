import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import Button from "@/components/button";
import CalendarCard from "@/components/calendar-card";
import PhotoCarousel from "@/components/photo-carousel";
import EventInfoForm from "@/components/event-info-form";
import TestimonialCard from "@/components/testimonial-card";
import { statusStyles, categoryVariant, splitStatus, EVENT_EXTRAS } from "@/lib/calendar";
import {
  getEventBySlug,
  getAllEventSlugs,
  getUpcomingEvents,
  getGalleryByLabel,
  getFeaturedTestimonials,
} from "@/sanity/lib/queries";

const DEFAULT_PERKS = [
  { title: "Roadbook soigné", text: "Itinéraires repérés en amont : rien n'est laissé au hasard." },
  { title: "Encadrement sécurité", text: "Briefings systématiques et pilotes expérimentés." },
  { title: "Groupe à taille humaine", text: "Une communauté de passionnés, sans compétition." },
  { title: "Étapes sélectionnées", text: "Lieux et partenaires choisis pour en profiter pleinement." },
];

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
  const shareImage = event.image ?? "/images/ardennes-chateau-parade.jpg";
  return {
    title: `${event.title}, ${event.category} en ${event.location}`,
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
    twitter: {
      card: "summary_large_image",
      title: `${event.title} | Take Your Gloves`,
      description: event.description,
      images: [shareImage],
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

  const extras = EVENT_EXTRAS[slug] ?? {};
  const [upcoming, testimonials, matched] = await Promise.all([
    getUpcomingEvents(4),
    getFeaturedTestimonials(3),
    extras.galleryMatch ? getGalleryByLabel(extras.galleryMatch) : Promise.resolve([] as string[]),
  ]);
  const others = upcoming.filter((e) => e.slug !== slug).slice(0, 3);
  const variant = categoryVariant[event.category] ?? "dark";
  const { capacity, badge } = splitStatus(event.status);
  const duration = event.duration ?? extras.duration;
  const inclusions = event.inclusions ?? extras.inclusions;
  const photos = event.gallery?.length ? event.gallery : matched.length > 0 ? matched : (extras.gallery ?? []);
  const perks = event.perks?.length ? event.perks.map((title) => ({ title, text: "" })) : DEFAULT_PERKS;
  const infos: [string, string | undefined][] = [
    ["Dates", event.dateLabel],
    ["Lieu", event.location],
    ["Format", event.category],
    ["Durée", duration],
    ["Places", capacity],
    ["Inclus", inclusions],
  ];

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
      <section className="relative overflow-hidden pt-28 pb-8 lg:pt-40 lg:pb-10">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <Link
              href="/evenements"
              className="font-display text-xs uppercase tracking-[0.2em] text-muted hover:text-foreground"
            >
              ← Tout le calendrier 2027
            </Link>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-accent">
                {event.category}
              </span>
              {badge && (
                <span
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.1em] ${statusStyles[event.statusType]}`}
                >
                  {badge.replace(/\.$/, "")}
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-4 lg:px-10 lg:pb-24 lg:pt-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal className="min-w-0">
            <p className="text-balance text-lg leading-relaxed text-foreground/90 sm:text-xl">
              {event.description}
            </p>
            {event.body && Array.isArray(event.body) && event.body.length > 0 && (
              <div className="prose prose-invert mt-8 max-w-none text-foreground/85">
                <PortableText value={event.body as Parameters<typeof PortableText>[0]["value"]} />
              </div>
            )}
            {photos.length > 0 && (
              <div className="mt-10">
                <PhotoCarousel photos={photos} label={event.title} />
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="space-y-6">
            <div className="relative mx-auto aspect-[707/1000] w-full max-w-sm overflow-hidden rounded-2xl border border-line shadow-2xl shadow-black/40 lg:mx-0">
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
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h2 className="font-display text-sm uppercase tracking-[0.2em] text-foreground">
                Informations clés
              </h2>
              <dl className="mt-6 space-y-4">
                {infos
                  .filter((row): row is [string, string] => Boolean(row[1]))
                  .map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-6 border-b border-line pb-3">
                      <dt className="text-xs uppercase tracking-[0.1em] text-muted">{label}</dt>
                      <dd className="text-right text-sm text-foreground">{value}</dd>
                    </div>
                  ))}
              </dl>
              <Button href="/contact" className="mt-7 w-full justify-center">
                Nous contacter
              </Button>
              <p className="mt-4 text-center text-xs text-muted">
                Sans engagement définitif, réponse personnalisée.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Au programme</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Le programme
            </h2>
            {event.program && event.program.length > 0 ? (
              <ol className="mt-8 space-y-4">
                {event.program.map((d) => (
                  <li key={d._key} className="rounded-2xl border border-line bg-background p-6">
                    {d.day && (
                      <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">{d.day}</p>
                    )}
                    {d.title && (
                      <h3 className="mt-2 font-display text-lg tracking-tight text-foreground">{d.title}</h3>
                    )}
                    {d.text && <p className="mt-2 text-sm leading-relaxed text-muted">{d.text}</p>}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
                Informations et programme complet à venir. Laissez-nous vos coordonnées : vous
                les recevrez en avant-première.
              </p>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl tracking-tight text-foreground">Recevoir les infos</h2>
            <p className="mb-6 mt-2 text-sm leading-relaxed text-muted">
              Laissez votre email ou votre téléphone, nous vous recontactons.
            </p>
            <EventInfoForm eventTitle={event.title} dateLabel={event.dateLabel} category={event.category} />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Pourquoi nous suivre</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Les + de nos séjours
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p, i) => (
            <li key={p.title} className="h-full">
              <Reveal delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <span aria-hidden className="mb-4 block h-px w-8 bg-gold" />
                  <p className="font-display text-base tracking-tight text-foreground">{p.title}</p>
                  {p.text && <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-24">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Avis</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Ils ont roulé avec nous
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
            À découvrir aussi
          </p>
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
