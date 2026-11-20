import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import Photo from "@/components/photo";
import Reveal from "@/components/reveal";
import EventsList from "@/components/events-list";
import CtaBanner from "@/components/cta-banner";
import { getAllEvents, getEventsPage, getHomePage, getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Calendrier 2026, rallyes & trackdays en Alsace",
  description:
    "Calendrier complet 2026 : rallyes touristiques, trackdays, roulages sur glace et road trips en voiture de sport. Alsace, Grand Est et toute l'Europe. Inscriptions ouvertes.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/evenements" },
  openGraph: {
    title: "Calendrier 2026, rallyes & trackdays | Take Your Gloves",
    description: "Tous les événements automobiles Take Your Gloves pour 2026 : rallyes, trackdays, roulage sur glace, road trips. Rejoignez la communauté.",
    url: "https://take-your-gloves.vercel.app/evenements",
    images: [{ url: "/images/nurburgring-trackday.jpg", width: 1200, height: 630, alt: "Calendrier événements automobiles Take Your Gloves 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calendrier 2026, rallyes & trackdays | Take Your Gloves",
    description: "Tous les événements automobiles Take Your Gloves pour 2026 : rallyes, trackdays, roulage sur glace, road trips. Rejoignez la communauté.",
    images: ["/images/nurburgring-trackday.jpg"],
  },
};

export default async function EvenementsPage() {
  const [events, eventsPage, home, settings] = await Promise.all([
    getAllEvents(),
    getEventsPage(),
    getHomePage(),
    getSiteSettings(),
  ]);

  const title = eventsPage?.introTitle || "Découvrez le calendrier 2027";
  const [signName, ...signRole] = (eventsPage?.signatureLine || "Cédric Wetta, Créateur d'émotions automobile, Take Your Gloves").split(/,\s*/);

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0">
          <Photo
            src={eventsPage?.heroImageUrl ?? "/images/nurburgring-trackday.jpg"}
            alt="Convoi de voitures de sport sur circuit"
            label="Convoi de voitures de sport"
            variant="dark"
            className="h-full w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              Saison 2027
            </p>
            <h1 className="text-balance mt-5 font-display text-5xl leading-[1.0] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 text-base leading-relaxed text-foreground/85">
            {eventsPage?.introBody && Array.isArray(eventsPage.introBody) && eventsPage.introBody.length > 0 ? (
              <div className="space-y-5 [&_p]:leading-relaxed">
                <PortableText
                  value={eventsPage.introBody as Parameters<typeof PortableText>[0]["value"]}
                  components={{
                    block: {
                      h2: ({ children }) => (
                        <h2 className="pt-3 font-display text-2xl leading-tight tracking-tight text-foreground">{children}</h2>
                      ),
                    },
                  }}
                />
              </div>
            ) : (
              <div className="space-y-5">
                <p>Après cette formidable saison 2026, marquée par nos échappées sur les routes écossaises aux allures de bout du monde ou encore notre périple à travers les somptueux cols pyrénéens, chaque kilomètre partagé a confirmé notre exigence commune pour le beau pilotage et la convivialité.</p>
                <h2 className="pt-3 font-display text-2xl leading-tight tracking-tight text-foreground">
                  La saison 2027 : nouvelles expériences, nouveaux standards
                </h2>
                <p>2027 sera plus que jamais placée sous le signe de l&apos;évasion et des belles mécaniques. Pour cette nouvelle année, nous avons conçu un programme encore plus affûté, alliant tracés d&apos;exception et prestations au cordeau.</p>
                <p>Je vous souhaite une belle découverte de l&apos;ensemble des rendez-vous de la saison. J&apos;espère que ce calendrier saura éveiller vos sens de passionnés d&apos;automobile.</p>
              </div>
            )}
            <p className="mt-8 font-display text-sm uppercase tracking-[0.15em] text-foreground">
              Passionnément,
              <br />
              <span className="text-gold">{signName}</span>
            </p>
            {signRole.length > 0 && (
              <p className="mt-1 text-sm text-muted">{signRole.join(", ")}</p>
            )}
          </Reveal>
        </div>
      </section>

      <EventsList events={events} />

      <CtaBanner
        eyebrow={home?.ctaEyebrow}
        heading={home?.ctaHeading}
        description={home?.ctaDescription}
        imageUrl={settings?.ctaBannerImageUrl}
      />
    </>
  );
}
