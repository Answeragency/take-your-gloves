import { Metadata } from "next";
import Photo from "@/components/photo";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import Button from "@/components/button";
import CtaBanner from "@/components/cta-banner";
import StatsStrip from "@/components/stats-strip";
import { getSiteSettings, getHomePage, getEntreprisesPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Événements Entreprises, concessions & marques automobiles",
  description:
    "Take Your Gloves organise, à votre nom ou en partenariat, des expériences automobiles pour vos clients : rallyes, journées circuit, stages glace et accès VIP en courses. Pour concessions, garages, carrossiers et selliers.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/entreprises" },
  openGraph: {
    title: "Événements Entreprises | Take Your Gloves",
    description:
      "Des expériences automobiles à votre nom pour vos clients : concessions, garages, carrossiers, selliers. Rallyes, circuits, stages glace, coulisses de courses.",
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

const offers = [
  {
    title: "Pilotage & sensations circuit",
    text: "Journées pilotage en GT de sport et baptêmes en véhicules de compétition, pour vivre l'adrénaline en toute sécurité.",
  },
  {
    title: "Road trip & balade routière",
    text: "Itinéraires sur-mesure à travers les plus belles routes d'Alsace et d'Europe, en convoi ou en autonomie encadrée.",
  },
  {
    title: "Journée à l'atelier Pegasus",
    text: "Accueil, visite de l'atelier, animation pit-stop et séance photo. Simulateurs, slot racing et repas traiteur en option.",
  },
  {
    title: "Coulisses des courses",
    text: "Accès paddock, loges privées, repas et services VIP lors des championnats de France et d'Europe. Visites guidées et rencontres pilotes.",
  },
  {
    title: "Stage glace",
    text: "Pilotage encadré sur circuit glace, hors saison, pour repousser les limites d'adhérence en toute sécurité.",
  },
];

const clients = [
  "Concessions automobiles",
  "Garages & carrossiers",
  "Détailing & sellerie",
  "Constructeurs & importateurs",
  "Comités d'entreprise",
  "Clubs automobiles",
];

export default async function EntreprisesPage() {
  const [settings, home, page] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
    getEntreprisesPage(),
  ]);

  const resolvedOffers = page?.offers ?? offers;
  const resolvedClients = page?.clients ?? clients;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Photo
            src={page?.heroImageUrl ?? "/images/ardennes-chateau-parade.jpg"}
            alt="Convoi automobile lors d'un événement corporate Take Your Gloves"
            label="Take Your Gloves, événements entreprises"
            variant="dark"
            className="h-full w-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              {page?.heroEyebrow ?? "Pour les professionnels de l'automobile"}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1.0] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="text-balance block">{page?.heroHeading ?? "Des expériences automobiles"}</span>
              <span className="text-balance text-gold block">{page?.heroHeadingAccent ?? "à votre nom, à votre image"}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
              {page?.heroDescription ?? "Concessions, garages, carrossiers, selliers : vos clients partagent la même passion que les nôtres. Take Your Gloves conçoit et organise pour vous des rallyes, journées circuit et stages glace, en marque blanche ou en partenariat visible."}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">Demander un devis</Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <StatsStrip stats={settings?.stats} />

      {/* ── Partenariat (angle principal) ───────────────────────────────── */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
                {page?.partnershipEyebrow ?? "Notre priorité"}
              </p>
              <h2 className="text-balance mt-5 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl">
                {page?.partnershipHeading ?? "Vos clients sont déjà les nôtres"}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {page?.partnershipText ?? "Vous vendez, entretenez ou personnalisez des voitures de sport. Vos clients cherchent l'occasion de les vivre pleinement. Nous organisons cette expérience à votre place, sous votre nom ou en partenariat affiché : vous renforcez la relation client, nous nous occupons de la logistique, de la sécurité et de l'animation."}
              </p>
              <div className="mt-9">
                <Button href="/contact">En discuter avec nous</Button>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="grid grid-cols-2 gap-3 sm:h-[460px] sm:grid-cols-12 sm:grid-rows-2">
              <div className="col-span-2 h-48 overflow-hidden rounded-2xl sm:col-span-8 sm:row-span-2 sm:h-full">
                <Photo
                  src="/images/ardennes-chateau-parade.jpg"
                  alt="Convoi VIP lors d'un événement corporate"
                  label="Expérience client de marque"
                  variant="dark"
                  className="h-full w-full"
                />
              </div>
              <div className="h-32 overflow-hidden rounded-2xl sm:col-span-4 sm:row-span-1 sm:h-full">
                <Photo
                  src="/images/forest-porsche.jpg"
                  alt="Porsche lors d'un événement client"
                  label="Sur route"
                  variant="gold"
                  className="h-full w-full"
                />
              </div>
              <div className="h-32 overflow-hidden rounded-2xl sm:col-span-4 sm:row-span-1 sm:h-full">
                <Photo
                  src="/images/interior-amg.jpg"
                  alt="Intérieur Mercedes-AMG, expérience client VIP"
                  label="VIP"
                  variant="red"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5 formats d'expérience ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow={page?.offersEyebrow ?? "Ce que nous organisons pour vous"}
          title={page?.offersHeading ?? "5 formats d'expérience"}
          align="center"
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {resolvedOffers.map((o, i) => {
            const isLastOdd = resolvedOffers.length % 2 === 1 && i === resolvedOffers.length - 1;
            return (
              <Reveal key={o.title} delay={i * 0.08} className={isLastOdd ? "lg:col-span-2" : undefined}>
                <div className={`flex gap-5 rounded-2xl border border-line bg-surface p-7 ${isLastOdd ? "lg:mx-auto lg:max-w-[calc(50%-0.75rem)]" : ""}`}>
                  <span className="font-display text-2xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg tracking-tight text-foreground">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{o.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Team building (secondaire) ──────────────────────────────────── */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center lg:px-10">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              {page?.secondaryEyebrow ?? "Aussi pour vos équipes"}
            </p>
            <h3 className="text-balance mt-4 font-display text-2xl tracking-tight text-foreground sm:text-3xl">
              {page?.secondaryHeading ?? "Team building, séminaires et relations d'affaires"}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {page?.secondaryText ?? "Au-delà de vos clients, ces mêmes formats se prêtent tout autant à la cohésion de vos équipes ou à la fidélisation de vos partenaires d'affaires."}
            </p>
          </Reveal>
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
                {page?.ctaBoxDescription ?? "Chaque partenariat est unique. Partagez-nous vos objectifs, votre clientèle et vos dates, nous vous proposons une formule sur-mesure sous 48h."}
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
