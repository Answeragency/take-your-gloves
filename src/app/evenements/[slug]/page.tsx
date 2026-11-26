import JsonLd from "@/components/json-ld";
import { eventJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Reveal from "@/components/reveal";
import CalendarCard from "@/components/calendar-card";
import PhotoCarousel from "@/components/photo-carousel";
import EventHero from "@/components/event-hero";
import EventActionBar from "@/components/event-action-bar";
import EventFacts, { type EventFact } from "@/components/event-facts";
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
  const url = `https://take-your-gloves.com/evenements/${slug}`;
  const shareImage = event.image ?? "/images/ardennes-chateau-parade.jpg";
  return {
    title: `${event.title} : ${event.category.toLowerCase()}${event.location.startsWith("Lieu") ? "" : ` (${event.location})`}`,
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
  const hasProgram = Boolean(event.program && event.program.length > 0);
  const facts: EventFact[] = [
    { key: "date", label: "Dates", value: event.dateLabel },
    { key: "place", label: "Lieu", value: event.location },
    { key: "format", label: "Format", value: event.category },
    ...(duration ? [{ key: "duration" as const, label: "Durée", value: duration }] : []),
    ...(capacity ? [{ key: "places" as const, label: "Places", value: capacity }] : []),
    ...(inclusions ? [{ key: "inclus" as const, label: "Inclus", value: inclusions }] : []),
  ];

  return (
    <>
      <JsonLd
        data={[
          eventJsonLd(event, duration),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Calendrier 2027", path: "/evenements" },
            { name: event.title, path: `/evenements/${slug}` },
          ]),
        ]}
      />
      <EventHero
        title={event.title}
        category={event.category}
        badge={badge?.replace(/\.$/, "")}
        badgeClass={statusStyles[event.statusType]}
        dateLabel={event.dateLabel}
        location={event.location}
        image={event.image}
        variant={variant}
      />
      <EventActionBar title={event.title} dateLabel={event.dateLabel} />
      <EventFacts facts={facts} />

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-24 lg:pt-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">L&apos;événement</p>
          <p className="text-balance mt-5 font-display text-xl leading-snug tracking-tight text-foreground sm:text-2xl lg:text-3xl">
            {event.description}
          </p>
          {event.body && Array.isArray(event.body) && event.body.length > 0 && (
            <div className="prose prose-invert mx-auto mt-8 max-w-none text-left text-foreground/85">
              <PortableText value={event.body as Parameters<typeof PortableText>[0]["value"]} />
            </div>
          )}
        </Reveal>
        {photos.length > 0 && (
          <Reveal delay={0.1} className="mt-14">
            <PhotoCarousel photos={photos} label={event.title} />
          </Reveal>
        )}
      </section>

      <section className="border-y border-line bg-surface">
        {hasProgram ? (
          <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:px-10 lg:py-24">
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Au programme</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Le programme
              </h2>
              <ol className="mt-8 space-y-4">
                {event.program?.map((d) => (
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
            </Reveal>
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <span id="infos" className="block scroll-mt-32" />
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Être recontacté</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Recevoir les infos
              </h2>
              <p className="mb-8 mt-3 text-sm leading-relaxed text-muted">
                Laissez votre email ou votre téléphone, nous vous recontactons.
              </p>
              <EventInfoForm eventTitle={event.title} dateLabel={event.dateLabel} category={event.category} />
            </Reveal>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl px-6 py-16 text-center lg:py-24">
            <Reveal>
              <span id="infos" className="block scroll-mt-32" />
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Au programme</p>
              <h2 className="text-balance mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                Informations et programme complet à venir
              </h2>
              <p className="text-balance mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
                Laissez-nous votre email ou votre téléphone : vous recevrez le programme en avant-première.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 text-left">
              <EventInfoForm eventTitle={event.title} dateLabel={event.dateLabel} category={event.category} />
            </Reveal>
          </div>
        )}
      </section>

      {testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
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
              <CalendarCard key={e.slug} event={e} index={i} showImage={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
