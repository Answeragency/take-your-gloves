import { Metadata } from "next";
import Photo from "@/components/photo";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import CtaBanner from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "Galerie | Take Your Gloves",
  description: "Revivez nos rallyes, roulages sur glace et sorties en images.",
};

const photos: Array<{
  label: string;
  image?: string;
  variant: "dark" | "red" | "gold";
}> = [
  { label: "Convoi devant le château — Les Ardennes", image: "/images/ardennes-chateau-parade.jpg", variant: "red" },
  { label: "Roulage glace — Pegasus Racing", image: "/images/glace-toyota-noire.jpg", variant: "dark" },
  { label: "Briefing au sommet", image: "/images/glace-portrait.jpg", variant: "gold" },
  { label: "Convoi en montagne enneigée", image: "/images/glace-convoi.jpg", variant: "dark" },
  { label: "Supra GR sur la neige", image: "/images/glace-supra-jaune.jpg", variant: "red" },
  { label: "L'équipe au complet — glace 2026", image: "/images/glace-groupe.jpg", variant: "gold" },
  { label: "Mercedes-AMG GT R en forêt", image: "/images/amg-gtr-foret.jpg", variant: "dark" },
  { label: "Porsche sur les routes des Vosges", image: "/images/forest-porsche.jpg", variant: "red" },
  { label: "Cockpit AMG GT", image: "/images/interior-amg.jpg", variant: "gold" },
  { label: "La communauté Take Your Gloves", image: "/images/groupe-drapeaux.jpg", variant: "dark" },
  { label: "Sur les courbes du Nürburgring", image: "/images/nurburgring-trackday.jpg", variant: "red" },
  { label: "Château des Ardennes", image: "/images/ardennes-chateau-voitures.jpg", variant: "gold" },
  { label: "Photo de groupe — Les Ardennes", image: "/images/ardennes-groupe.jpg", variant: "dark" },
];

export default function GaleriePage() {
  return (
    <>
      <section className="pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="En images"
            title="Revivez chaque accélération"
            description="Un aperçu de nos rallyes, trackdays et rencontres entre passionnés. Galerie en cours d'enrichissement avec nos derniers événements."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {photos.map((p, i) => (
            <Reveal
              key={p.label}
              delay={(i % 6) * 0.06}
              className={i % 5 === 0 ? "col-span-2 row-span-1" : ""}
            >
              <div
                className={`group relative overflow-hidden rounded-xl ${
                  i % 5 === 0 ? "h-72 sm:h-80" : "h-48 sm:h-56"
                }`}
              >
                <Photo
                  src={p.image}
                  alt={p.label}
                  label={p.label}
                  variant={p.variant}
                  className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-display text-xs uppercase tracking-[0.15em] text-foreground">
                    {p.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
