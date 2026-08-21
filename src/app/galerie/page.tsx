import { Metadata } from "next";
import Photo from "@/components/photo";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import CtaBanner from "@/components/cta-banner";
import { getAllGalleryPhotos, getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Galerie Photos, rallyes & sorties automobiles",
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

// Ne pas y remettre les photos déjà présentes dans Sanity (galleryPhoto) :
// ardennes-chateau-parade, ardennes-groupe, interior-amg, groupe-drapeaux,
// glace-convoi, ardennes-chateau-voitures, amg-gtr-foret, glace-groupe,
// forest-porsche, glace-toyota-noire, nurburgring-trackday, glace-portrait.
// Elles sont éditables/supprimables depuis le Studio ; les garder ici aussi
// les ferait apparaître deux fois dans la galerie.
const STATIC_PHOTOS: GalleryItem[] = [
  { id: "alpes-135", src: "/images/2025-09-18_Roadtrip_Alpes_135_@Veezione.jpg", label: "Road Trip Alpes, septembre 2025", variant: "dark" },
  { id: "alpes-177", src: "/images/2025-09-18_Roadtrip_Alpes_177_@Veezione.jpg", label: "Road Trip Alpes, septembre 2025", variant: "gold" },
  { id: "alpes-484", src: "/images/2025-09-20_Roadtrip_Alpes_484_@Veezione.jpg", label: "Road Trip Alpes, septembre 2025", variant: "dark" },
  { id: "glace-supra-jaune", src: "/images/glace-supra-jaune.jpg", label: "Roulage sur glace, Autriche", variant: "red" },
  { id: "alpes-509", src: "/images/2025-09-20_Roadtrip_Alpes_509_@Veezione.jpg", label: "Road Trip Alpes, septembre 2025", variant: "dark" },
  { id: "alpes-525", src: "/images/2025-09-20_Roadtrip_Alpes_525_@Veezione.jpg", label: "Road Trip Alpes, septembre 2025", variant: "gold" },
  { id: "alpes-640", src: "/images/2025-09-21_Roadtrip_Alpes_640_@Veezione.jpg", label: "Road Trip Alpes, septembre 2025", variant: "dark" },
  { id: "ecosse-107", src: "/images/2026-05-19_roadtrip-ecosse-107.jpg", label: "Road Trip Écosse, mai 2026", variant: "dark" },
  { id: "ecosse-206", src: "/images/2026-05-19_roadtrip-ecosse-206.jpg", label: "Road Trip Écosse, mai 2026", variant: "gold" },
  { id: "ecosse-300", src: "/images/2026-05-20_roadtrip-ecosse-300.jpg", label: "Road Trip Écosse, mai 2026", variant: "dark" },
  { id: "ecosse-350", src: "/images/2026-05-20_roadtrip-ecosse-350.jpg", label: "Road Trip Écosse, mai 2026", variant: "red" },
  { id: "ecosse-370", src: "/images/2026-05-20_roadtrip-ecosse-370.jpg", label: "Road Trip Écosse, mai 2026", variant: "dark" },
  { id: "ecosse-507", src: "/images/2026-05-21_roadtrip-ecosse-507.jpg", label: "Road Trip Écosse, mai 2026", variant: "gold" },
  { id: "ecosse-567", src: "/images/2026-05-22_roadtrip-ecosse-567.jpg", label: "Road Trip Écosse, mai 2026", variant: "dark" },
  { id: "ecosse-781", src: "/images/2026-05-24_roadtrip-ecosse-781.jpg", label: "Road Trip Écosse, mai 2026", variant: "dark" },
];

export default async function GaleriePage() {
  const [sanityPhotos, settings] = await Promise.all([
    getAllGalleryPhotos(),
    getSiteSettings(),
  ]);

  const sanityItems: GalleryItem[] = sanityPhotos.map((p) => ({
    id: p._id,
    src: urlFor(p.image).width(1200).auto("format").url(),
    label: p.label,
    variant: p.variant,
  }));

  // Sanity photos first, then static ones (always show all)
  const items: GalleryItem[] = [...sanityItems, ...STATIC_PHOTOS];

  return (
    <>
      <section className="pt-28 pb-10 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            as="h1"
            eyebrow="En images"
            title="Revivez chaque accélération"
            highlight="accélération"
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
