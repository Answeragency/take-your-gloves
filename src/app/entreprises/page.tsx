import { Metadata } from "next";
import Photo from "@/components/photo";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import Button from "@/components/button";
import CtaBanner from "@/components/cta-banner";
import StatsStrip from "@/components/stats-strip";
import { getSiteSettings, getHomePage, getEntreprisesPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Événements Entreprises — Concessions & Marques Automobiles",
  description:
    "Take Your Gloves organise vos événements automobiles corporate : journées concession, lancements de produit, séminaires team building et expériences clients VIP en Alsace et toute la France.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/entreprises" },
  openGraph: {
    title: "Événements Entreprises | Take Your Gloves",
    description:
      "Événements automobiles sur-mesure pour concessions, marques et entreprises. Expériences clients VIP, lancements de modèles, séminaires team building.",
    url: "https://take-your-gloves.vercel.app/entreprises",
    images: [
      {
        url: "/images/ardennes-chateau-parade.jpg",
        width: 1200,
        height: 630,
        alt: "Événements automobiles entreprises Take Your Gloves",
      },
    ],
  },
};

const advantages = [
  {
    icon: "🏁",
    title: "Expertise terrain",
    text: "Plus de 5 ans d'organisation d'événements automobiles. Nos pilotes et coordinateurs connaissent chaque route, chaque circuit.",
  },
  {
    icon: "🛡️",
    title: "Sécurité certifiée",
    text: "Protocoles sécurité professionnels, briefings obligatoires, encadrement par des pilotes expérimentés. Zéro incident depuis la création.",
  },
  {
    icon: "📍",
    title: "Logistique complète",
    text: "Roadbooks, assistance mobile, partenaires hôteliers et restaurateurs sélectionnés. Vous vous concentrez sur vos invités, on gère le reste.",
  },
  {
    icon: "✦",
    title: "Sur-mesure total",
    text: "Chaque événement est conçu selon vos objectifs, votre budget et votre image de marque. Aucune formule standard, chaque detail compte.",
  },
];

const clients = [
  "Concessions automobiles",
  "Constructeurs & importateurs",
  "Agences événementielles",
  "Comités d'entreprise",
  "Clubs automobiles & associations",
  "Marques de prestige",
];

export default async function EntreprisesPage() {
  const [settings, home, page] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getEntreprisesPage(),
  ]);

  const resolvedAdvantages = page?.advantages ?? advantages;
  const resolvedClients = page?.clients ?? clients;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Photo
            src={page?.heroImageUrl ?? "/images/ardennes-chateau-parade.jpg"}
            alt="Convoi automobile lors d'un événement corporate Take Your Gloves"
            label="Take Your Gloves — Événements Entreprises"
            variant="dark"
            className="h-full w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              {page?.heroEyebrow ?? "Pour les professionnels"}
            </p>
            <h1 className="text-balance mt-5 font-display text-5xl leading-[1.0] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {page?.heroHeading ?? "L'émotion automobile"}{" "}
              <span className="text-gold">{page?.heroHeadingAccent ?? "au service de votre marque"}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
              {page?.heroDescription ?? "Concessions, constructeurs, agences : Take Your Gloves conçoit des expériences automobiles sur-mesure qui marquent vos clients, fédèrent vos équipes et renforcent votre image."}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">Demander un devis</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <StatsStrip stats={settings?.stats} />

      {/* ── Pourquoi TYG ─────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
                {page?.advantagesEyebrow ?? "Pourquoi nous choisir"}
              </p>
              <h2 className="text-balance mt-5 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl">
                {page?.advantagesHeading ?? "L'excellence opérationnelle, l'émotion en prime"}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {page?.advantagesDescription ?? "Nous ne sommes pas une agence généraliste. Take Your Gloves est né de la passion automobile — chaque événement que nous organisons, nous le vivons nous-mêmes. Cette authenticité se ressent à chaque virage."}
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {resolvedAdvantages.map((a) => (
                  <div key={a.title} className="flex gap-4">
                    <span className="text-xl" role="img" aria-label={a.title}>{a.icon}</span>
                    <div>
                      <h4 className="font-display text-sm tracking-tight text-foreground">
                        {a.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12} className="grid grid-cols-2 gap-3 sm:h-[460px] sm:grid-cols-12 sm:grid-rows-2">
              <div className="col-span-2 h-48 overflow-hidden rounded-2xl sm:col-span-8 sm:row-span-2 sm:h-full">
                <Photo
                  src="/images/ardennes-chateau-parade.jpg"
                  alt="Convoi VIP lors d'un événement corporate"
                  label="Expérience Corporate"
                  variant="dark"
                  className="h-full w-full"
                />
              </div>
              <div className="h-32 overflow-hidden rounded-2xl sm:col-span-4 sm:row-span-1 sm:h-full">
                <Photo
                  src="/images/forest-porsche.jpg"
                  alt="Porsche lors d'un team building automobile"
                  label="Team Building"
                  variant="gold"
                  className="h-full w-full"
                />
              </div>
              <div className="h-32 overflow-hidden rounded-2xl sm:col-span-4 sm:row-span-1 sm:h-full">
                <Photo
                  src="/images/interior-amg.jpg"
                  alt="Intérieur Mercedes-AMG — expérience client VIP"
                  label="VIP"
                  variant="red"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Clients types ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <SectionHeading
            eyebrow={page?.clientsEyebrow ?? "Ils nous font confiance"}
            title={page?.clientsHeading ?? "Conçu pour les professionnels de l'automobile et au-delà"}
            align="center"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {resolvedClients.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line bg-surface px-5 py-2.5 font-display text-xs uppercase tracking-[0.15em] text-foreground/70"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 rounded-2xl border border-accent/20 bg-surface p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.25em] text-accent">
                {page?.ctaBoxEyebrow ?? "Devis gratuit & sans engagement"}
              </p>
              <h3 className="mt-4 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
                {page?.ctaBoxHeading ?? "Parlons de votre projet"}
              </h3>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                {page?.ctaBoxDescription ?? "Chaque événement est unique. Partagez-nous vos objectifs, votre budget et vos dates — nous vous proposons une formule sur-mesure sous 48h."}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="/contact" className="whitespace-nowrap">
                Demander un devis
              </Button>
              <Button href="mailto:contact@takeyourgloves.fr" variant="outline" className="whitespace-nowrap">
                contact@takeyourgloves.fr
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBanner
        eyebrow={home?.ctaEyebrow}
        heading={home?.ctaHeading}
        description={home?.ctaDescription}
      />
    </>
  );
}
