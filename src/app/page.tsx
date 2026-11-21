import Hero from "@/components/hero";
import SectionHeading from "@/components/section-heading";
import { Carousel } from "@/components/ui/specials-linear-carousel";
import TestimonialCard from "@/components/testimonial-card";
import CtaBanner from "@/components/cta-banner";
import Button from "@/components/button";
import Reveal from "@/components/reveal";
import Photo from "@/components/photo";
import {
  getUpcomingEvents,
  getFeaturedTestimonials,
  getSiteSettings,
  getHomePage,
} from "@/sanity/lib/queries";

export default async function Home() {
  const [upcoming, testimonials, settings, home] = await Promise.all([
    getUpcomingEvents(8),
    getFeaturedTestimonials(4),
    getSiteSettings(),
    getHomePage(),
  ]);

  const spiritBullets = home?.spiritBullets ?? [
    "Encadrement par une équipe expérimentée",
    "Itinéraires et programmes sélectionnés avec soin",
    "Une communauté de plus de 250 passionnés",
    "Une organisation complète pour vous permettre de pleinement vivre nos expériences",
  ];

  // Seule la 1re phrase reste dans le hero ; la liste des formats passe sous le titre du calendrier.
  const [heroText, ...moreText] = (
    home?.heroSubtitle ??
    "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport.\nRallyes touristiques, expériences atypiques, sorties circuit, journées thématiques et bien davantage…"
  ).split(/\r?\n/);

  const spiritImages = home?.spiritImageUrls ?? [];

  return (
    <>
      <Hero
        eyebrow={home?.heroEyebrow}
        line1={home?.heroLine1}
        line2={home?.heroLine2}
        subtitle={heroText}
        videoUrl={home?.heroVideoUrl}
        stats={settings?.stats}
      />

      {/* Upcoming events */}
      <section className="mx-auto max-w-7xl px-6 pb-4 pt-16 lg:px-10 lg:pt-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Calendrier 2027"
            title="Les prochains rendez-vous"
            highlight="rendez-vous"
          />
          <Reveal delay={0.1}>
            <Button href="/evenements">
              Voir tout le calendrier
            </Button>
          </Reveal>
        </div>
        {moreText.length > 0 && (
          <p className="mt-6 text-base leading-relaxed text-muted md:whitespace-nowrap">
            {moreText.join(" ")}
          </p>
        )}
      </section>

      <div className="pb-16 lg:pb-28">
        <Carousel
          autoplay
          cards={upcoming
            .filter((event) => event.image)
            .map((event) => ({
              src: event.image as string,
              title: event.title,
              category: event.category,
              meta: `${event.dateLabel} · ${event.location}`,
              href: `/evenements/${event.slug}`,
            }))}
        />
      </div>

      {/* Spirit section */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              L&apos;esprit Take Your Gloves
            </p>
            <h2 className="text-balance mt-5 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl">
              {home?.spiritHeading ?? (
                <>
                  Plus que des événements,{" "}
                  <span className="gold-text">une communauté de passionnés</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              {home?.spiritDescription ??
                "Depuis nos premiers événements conviviaux en Alsace, Take Your Gloves est devenu une référence incontournable pour les passionnés de voitures de sport. Sécurité, convivialité et exigence : chaque événement est pensé pour vous faire vivre le plaisir de conduire dans les meilleures conditions."}
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {spiritBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/a-propos" variant="outline">
                Notre histoire
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[3/2] overflow-hidden rounded-2xl">
              <Photo
                src={spiritImages[0] ?? "/images/ardennes-groupe.jpg"}
                alt="Photo de groupe de la communauté Take Your Gloves"
                label="Take Your Gloves"
                variant="dark"
                className="h-full w-full"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <Photo
                src={spiritImages[1] ?? "/images/2025-09-20_Roadtrip_Alpes_509_@Veezione.jpg"}
                alt="Porsche sur une route forestière"
                label="Sur la route"
                variant="dark"
                className="h-full w-full"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <Photo
                src={spiritImages[2] ?? "/images/interior-amg.jpg"}
                alt="Intérieur d'une Mercedes-AMG GT"
                label="À bord"
                variant="gold"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Ils en parlent"
          title="La parole à nos pilotes"
          highlight="pilotes"
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow={home?.ctaEyebrow}
        heading={home?.ctaHeading}
        description={home?.ctaDescription}
        imageUrl="/images/2025-09-20_Roadtrip_Alpes_525_@Veezione.jpg"
        imagePosition="center 92%"
      />
    </>
  );
}
