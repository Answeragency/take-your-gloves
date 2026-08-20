import { Metadata } from "next";
import Photo from "@/components/photo";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import CtaBanner from "@/components/cta-banner";
import StatsStrip from "@/components/stats-strip";
import { getAboutPage, getSiteSettings, getHomePage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "À propos, notre histoire & nos valeurs",
  description:
    "Née à Strasbourg d'une passion partagée, Take Your Gloves organise des rallyes touristiques et trackdays en Alsace depuis plusieurs années. Découvrez notre histoire, notre équipe et nos valeurs.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/a-propos" },
  openGraph: {
    title: "À propos de Take Your Gloves, histoire & valeurs",
    description: "Découvrez l'histoire de Take Your Gloves, né à Strasbourg d'une passion pour la conduite sportive. Plus de 800 passionnés nous font confiance.",
    url: "https://take-your-gloves.vercel.app/a-propos",
    images: [{ url: "/images/ardennes-groupe.jpg", width: 1200, height: 630, alt: "L'équipe Take Your Gloves" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de Take Your Gloves, histoire & valeurs",
    description: "Découvrez l'histoire de Take Your Gloves, né à Strasbourg d'une passion pour la conduite sportive. Plus de 800 passionnés nous font confiance.",
    images: ["/images/ardennes-groupe.jpg"],
  },
};

export default async function AProposPage() {
  const [about, settings, home] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
    getHomePage(),
  ]);

  const values = about?.values ?? [
    {
      title: "Sécurité avant tout",
      text: "Chaque événement est encadré par des pilotes expérimentés, avec des briefings sécurité systématiques et des groupes adaptés au niveau de chacun.",
    },
    {
      title: "Exigence dans l'organisation",
      text: "Roadbooks soignés, itinéraires repérés en amont, partenariats circuits sélectionnés : rien n'est laissé au hasard pour que vous profitiez pleinement.",
    },
    {
      title: "Convivialité avant la performance",
      text: "Take Your Gloves n'est pas une compétition. C'est une communauté de passionnés qui se retrouvent pour partager une passion commune.",
    },
  ];

  const missionParagraphs = about?.missionParagraphs ?? [
    "Trop de voitures de sport et de GT dorment dans les garages, réservées aux beaux jours et aux trajets sans relief. Take Your Gloves est né pour leur redonner leur usage premier : le plaisir de conduire.",
    "Depuis nos premiers rassemblements informels entre amis à Strasbourg, nous avons structuré une véritable offre d'événements, rallyes touristiques, trackdays, sorties conviviales et expériences atypiques, pour répondre à toutes les envies, du conducteur occasionnel au pilote confirmé.",
    "Aujourd'hui, c'est une communauté de plus de 800 passionnés qui se retrouve régulièrement autour de nos événements, en Alsace et au-delà.",
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="absolute inset-0">
          <Photo
            src={about?.heroImageUrl ?? "/images/ardennes-groupe.jpg"}
            alt="Groupe de passionnés Take Your Gloves devant un château"
            label="Take Your Gloves, notre histoire"
            variant="gold"
            className="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-10">
          <SectionHeading
            as="h1"
            eyebrow="Notre histoire"
            title={about?.heroHeading ?? "Né d'une passion partagée à Strasbourg"}
            highlight="Strasbourg"
            description={about?.heroDescription ?? "Take Your Gloves est parti d'un constat simple : conduire sa voiture de sport au quotidien ne suffit pas à en révéler tout le potentiel, ni tout le plaisir. Nous avons créé les rendez-vous qui nous manquaient."}
          />
        </div>
      </section>

      <StatsStrip stats={settings?.stats} />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              Notre mission
            </p>
            <h2 className="text-balance mt-5 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl">
              {about?.missionHeading ?? "Faire (re)découvrir le plaisir de conduire"}
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              {missionParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 h-64 overflow-hidden rounded-2xl">
              <Photo
                src={about?.missionImageUrl ?? "/images/groupe-drapeaux.jpg"}
                alt="L'équipe et la communauté Take Your Gloves"
                label="L'équipe Take Your Gloves"
                variant="dark"
                className="h-full w-full"
              />
            </div>
            <div className="h-44 overflow-hidden rounded-2xl">
              <Photo
                src={about?.valuesImage1Url ?? "/images/glace-portrait.jpg"}
                alt="Briefing avant le roulage sur glace"
                label="Briefing"
                variant="red"
                className="h-full w-full"
              />
            </div>
            <div className="h-44 overflow-hidden rounded-2xl">
              <Photo
                src={about?.valuesImage2Url ?? "/images/forest-porsche.jpg"}
                alt="Porsche sur une route forestière"
                label="Sur la route"
                variant="gold"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui guide chaque événement"
            highlight="événement"
            align="center"
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="rounded-2xl border border-line bg-background p-8">
                  <span className="font-display text-3xl text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-lg tracking-tight text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
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
