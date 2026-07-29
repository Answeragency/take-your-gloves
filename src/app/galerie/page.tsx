import { Metadata } from "next";
import Photo from "@/components/photo";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import CtaBanner from "@/components/cta-banner";
import { getAllGalleryPhotos, getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Galerie Photos — Rallyes & Sorties Automobiles",
  description:
    "Photos de nos rallyes touristiques, trackdays et sorties en voiture de sport en Alsace et en Europe. Galerie Take Your Gloves.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/galerie" },
  openGraph: {
    title: "Galerie Photos | Take Your Gloves",
    description: "Revivez nos meilleurs moments : rallyes, trackdays, road trips en voiture de sport en Alsace et toute l'Europe.",
    url: "https://take-your-gloves.vercel.app/galerie",
    images: [{ url: "/images/ardennes-chateau-parade.jpg", width: 1200, height: 630, alt: "Galerie photos Take Your Gloves" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie Photos | Take Your Gloves",
    description: "Revivez nos meilleurs moments : rallyes, trackdays, road trips en voiture de sport en Alsace et toute l'Europe.",
    images: ["/images/ardennes-chateau-parade.jpg"],
  },
};

type GalleryItem = {
  id: string;
  src: string;
  label: string;
  variant: "dark" | "red" | "gold";
};

const STATIC_PHOTOS: GalleryItem[] = [
  { id: "ardennes-chateau-parade", src: "/images/ardennes-chateau-parade.jpg", label: "Convoi devant le château — Les Ardennes", variant: "dark" },
  { id: "glace-supra-jaune", src: "/images/glace-supra-jaune.jpg", label: "Supra sur glace", variant: "red" },
  { id: "ardennes-groupe", src: "/images/ardennes-groupe.jpg", label: "La troupe — Les Ardennes", variant: "dark" },
  { id: "interior-amg", src: "/images/interior-amg.jpg", label: "À bord — AMG GT", variant: "gold" },
  { id: "groupe-drapeaux", src: "/images/groupe-drapeaux.jpg", label: "La communauté Take Your Gloves", variant: "dark" },
  { id: "glace-convoi", src: "/images/glace-convoi.jpg", label: "Convoi sur glace", variant: "dark" },
  { id: "ardennes-chateau-voitures", src: "/images/ardennes-chateau-voitures.jpg", label: "Les Ardennes", variant: "dark" },
  { id: "amg-gtr-foret", src: "/images/amg-gtr-foret.jpg", label: "AMG GT-R en forêt", variant: "dark" },
  { id: "glace-groupe", src: "/images/glace-groupe.jpg", label: "Le groupe — Roulage Glace", variant: "dark" },
  { id: "forest-porsche", src: "/images/forest-porsche.jpg", label: "Porsche sur route forestière", variant: "dark" },
  { id: "glace-toyota-noire", src: "/images/glace-toyota-noire.jpg", label: "Toyota sur glace", variant: "dark" },
  { id: "nurburgring-trackday", src: "/images/nurburgring-trackday.jpg", label: "Trackday au Nürburgring", variant: "red" },
  { id: "glace-portrait", src: "/images/glace-portrait.jpg", label: "Portrait — Roulage Glace", variant: "gold" },
];

export default async function GaleriePage() {
  const [sanityPhotos, settings] = await Promise.all([
    getAllGalleryPhotos(),
    getSiteSettings(),
  ]);

  const items: GalleryItem[] = sanityPhotos.length > 0
    ? sanityPhotos.map((p) => ({
        id: p._id,
        src: urlFor(p.image).width(1200).auto("format").url(),
        label: p.label,
        variant: p.variant,
      }))
    : STATIC_PHOTOS;

  return (
    <>
      <section className="pt-28 pb-10 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            as="h1"
            eyebrow="En images"
            title="Revivez chaque accélération"
            description="Un aperçu de nos rallyes, trackdays et rencontres entre passionnés. Galerie en cours d'enrichissement avec nos derniers événements."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-28">
        <div className="columns-2 gap-4 sm:columns-3">
          {items.map((p, i) => {
            const ratio =
              i % 5 === 0 ? "aspect-[16/9]" :
              i % 3 === 1 ? "aspect-[3/4]" :
              "aspect-[4/3]";
            return (
              <Reveal key={p.id} delay={(i % 6) * 0.06} className="mb-4 break-inside-avoid">
                <div className={`group relative overflow-hidden rounded-xl ${ratio}`}>
                  <Photo
                    src={p.src}
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
            );
          })}
        </div>
      </section>

      <CtaBanner imageUrl={settings?.ctaBannerImageUrl} />
    </>
  );
}
