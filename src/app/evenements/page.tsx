import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import CalendarCard from "@/components/calendar-card";
import CtaBanner from "@/components/cta-banner";
import { categories } from "@/lib/calendar";
import { getAllEvents, getEventsPage, getHomePage, getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Calendrier 2026 — Rallyes & Trackdays en Alsace",
  description:
    "Calendrier complet 2026 : rallyes touristiques, trackdays, roulages sur glace et road trips en voiture de sport. Alsace, Grand Est et toute l'Europe. Inscriptions ouvertes.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/evenements" },
  openGraph: {
    title: "Calendrier 2026 — Rallyes & Trackdays | Take Your Gloves",
    description: "Tous les événements automobiles Take Your Gloves pour 2026 : rallyes, trackdays, roulage sur glace, road trips. Rejoignez la communauté.",
    url: "https://take-your-gloves.vercel.app/evenements",
    images: [{ url: "/images/nurburgring-trackday.jpg", width: 1200, height: 630, alt: "Calendrier événements automobiles Take Your Gloves 2026" }],
  },
};

export default async function EvenementsPage() {
  const [events, eventsPage, home, settings] = await Promise.all([
    getAllEvents(),
    getEventsPage(),
    getHomePage(),
    getSiteSettings(),
  ]);

  const signature = eventsPage?.signature ?? "Cédric Wetta";
  const introNote = eventsPage?.introNote ?? "N'hésitez pas à me faire part des dates qui peuvent vous intéresser, sans engagement définitif, afin de vous pré-réserver des places.";

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0">
          <Photo
            src={eventsPage?.heroImageUrl ?? "/images/nurburgring-trackday.jpg"}
            alt="Convoi de voitures de sport sur circuit"
            label="Les Alpes Françaises — Septembre 2025"
            variant="dark"
            className="h-full w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              Calendrier 2026
            </p>
            <h1 className="text-balance mt-5 font-display text-5xl leading-[1.0] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Découvrez le calendrier 2026 !
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.15em] text-muted">
              Les Alpes Françaises, en Septembre dernier
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 text-base leading-relaxed text-foreground/85">
            {eventsPage?.introLetter && Array.isArray(eventsPage.introLetter) && eventsPage.introLetter.length > 0 ? (
              <div className="space-y-5 [&_p]:leading-relaxed">
                <PortableText value={eventsPage.introLetter as Parameters<typeof PortableText>[0]["value"]} />
              </div>
            ) : (
              <div className="space-y-5">
                <p>Merci pour cette incroyable saison 2025 que nous avons vécue ensemble ! Des virages de Corse aux sommets des Alpes, sans oublier les routes sinueuses de notre massif des Vosges : les souvenirs indélébiles marqués par votre bonne humeur et votre passion ne manquent pas !</p>
                <p>Je vous remercie chaleureusement de faire partie de cette aventure et vous souhaite une merveilleuse année 2026, qui sera, je l&apos;espère, pleine d&apos;émotions automobiles !</p>
                <p>Pour la prochaine saison, j&apos;ai voulu placer la barre encore plus haut et vous ai préparé un programme varié et conçu pour pleinement profiter de ces expériences au volant de vos autos.</p>
                <p>Attachez votre ceinture et découvrez plus bas l&apos;ensemble des événements qui vous attendent tout au long de l&apos;année !</p>
              </div>
            )}
            <p className="mt-5 text-sm text-muted">{introNote}</p>
            <p className="mt-5 font-display text-sm uppercase tracking-[0.15em] text-foreground">
              Passionnément,
              <br />
              <span className="text-gold">{signature}</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-center gap-3 py-4">
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.15em] text-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
        <div className="grid gap-6">
          {events.map((event, i) => (
            <CalendarCard key={event.slug} event={event} index={i} />
          ))}
        </div>
      </section>

      <CtaBanner
        eyebrow={home?.ctaEyebrow}
        heading={home?.ctaHeading}
        description={home?.ctaDescription}
        imageUrl={settings?.ctaBannerImageUrl}
      />
    </>
  );
}
