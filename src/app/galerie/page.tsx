import { Metadata } from "next";
import GalleryGrid, { type GalleryItem } from "@/components/gallery-grid";
import SectionHeading from "@/components/section-heading";
import CtaBanner from "@/components/cta-banner";
import { getAllGalleryPhotos, getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { safeImageSrc } from "@/lib/masked-images";

export const metadata: Metadata = {
  title: "Galerie Photos, rallyes & sorties automobiles",
  description:
    "Photos de nos rallyes touristiques, trackdays et sorties en voiture de sport en Alsace et en Europe. Galerie Take Your Gloves.",
  alternates: { canonical: "https://takeyourgloves.com/galerie" },
  openGraph: {
    title: "Galerie Photos | Take Your Gloves",
    description: "Revivez nos meilleurs moments : rallyes, trackdays, road trips en voiture de sport en Alsace et toute l'Europe.",
    url: "https://takeyourgloves.com/galerie",
    images: [{ url: "/images/ardennes-chateau-parade.jpg", width: 1200, height: 630, alt: "Galerie photos Take Your Gloves" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galerie Photos | Take Your Gloves",
    description: "Revivez nos meilleurs moments : rallyes, trackdays, road trips en voiture de sport en Alsace et toute l'Europe.",
    images: ["/images/ardennes-chateau-parade.jpg"],
  },
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
  { id: "ecosse-415", src: "/images/2026-05-20_roadtrip-ecosse-415.jpg", label: "Road Trip Écosse, mai 2026", variant: "red" },
  { id: "ecosse-507", src: "/images/2026-05-21_roadtrip-ecosse-507.jpg", label: "Road Trip Écosse, mai 2026", variant: "gold" },
  { id: "ecosse-567", src: "/images/2026-05-22_roadtrip-ecosse-567.jpg", label: "Road Trip Écosse, mai 2026", variant: "dark" },
  { id: "ecosse-781", src: "/images/2026-05-24_roadtrip-ecosse-781.jpg", label: "Road Trip Écosse, mai 2026", variant: "dark" },
  { id: "banquet-marlenheim-176", src: "/images/banquet-marlenheim-176.jpg", label: "Banquet Marlenheim, juin 2025", variant: "dark" },
  { id: "banquet-marlenheim-210", src: "/images/banquet-marlenheim-210.jpg", label: "Banquet Marlenheim, juin 2025", variant: "red" },
  { id: "banquet-marlenheim-227", src: "/images/banquet-marlenheim-227.jpg", label: "Banquet Marlenheim, juin 2025", variant: "dark" },
  { id: "banquet-marlenheim-452", src: "/images/banquet-marlenheim-452.jpg", label: "Banquet Marlenheim, juin 2025", variant: "gold" },
  { id: "soiree-pegasus-017", src: "/images/soiree-pegasus-017.jpg", label: "Soirée à l'atelier Pegasus, novembre 2025", variant: "dark" },
  { id: "500n-gridgirls-008", src: "/images/pegasus-500n-gridgirls-008.jpg", label: "500 Nocturnes, grille de départ", variant: "gold" },
  { id: "500n-gridgirls-015", src: "/images/pegasus-500n-gridgirls-015.jpg", label: "500 Nocturnes, grille de départ", variant: "red" },
  { id: "500n-gridwalk-068", src: "/images/pegasus-500n-gridwalk-068.jpg", label: "500 Nocturnes, dans les stands", variant: "dark" },
  { id: "500n-podium-036", src: "/images/pegasus-500n-podium-036.jpg", label: "500 Nocturnes, podium et feu d'artifice", variant: "gold" },
  { id: "500n-race-141", src: "/images/pegasus-500n-race-141.jpg", label: "500 Nocturnes, arrêt au stand", variant: "dark" },
  { id: "500n-race-180", src: "/images/pegasus-500n-race-180.jpg", label: "500 Nocturnes, course de nuit", variant: "red" },
];

// Sous-titres de la galerie (dans cet ordre) : on regroupe les photos par type d'événement.
const GROUPS: [string, RegExp][] = [
  ["Rallyes touristiques", /ardennes|alpes|écosse|ecosse|dolomites|vosges|forêt noire|pyrénées|rallye touristique|road ?trip/i],
  ["Roulage sur glace", /glace|autriche/i],
  ["Circuit", /nürburgring|nurburgring|circuit|trackday|roulage/i],
  ["500 Nocturnes", /500 nocturnes/i],
  ["Journées conviviales", /banquet|gourmand|marlenheim|convivial|soirée|atelier/i],
];
const OTHER_GROUP = "Sur la route";
const groupOf = (label: string) => GROUPS.find(([, re]) => re.test(label))?.[0] ?? OTHER_GROUP;
const GROUP_ORDER = [...GROUPS.map(([name]) => name), OTHER_GROUP];

export default async function GaleriePage() {
  const [sanityPhotos, settings] = await Promise.all([
    getAllGalleryPhotos(),
    getSiteSettings(),
  ]);

  const sanityItems: GalleryItem[] = sanityPhotos.map((p) => ({
    id: p._id,
    src: safeImageSrc(p.filename, urlFor(p.image).width(1200).auto("format").url()),
    label: p.label,
    variant: p.variant,
  }));

  // Sanity photos first, then static ones (always show all)
  const items: GalleryItem[] = [...sanityItems, ...STATIC_PHOTOS]
    .map((p) => ({ ...p, group: groupOf(p.label) }))
    .sort((a, b) => GROUP_ORDER.indexOf(a.group ?? OTHER_GROUP) - GROUP_ORDER.indexOf(b.group ?? OTHER_GROUP));

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
        <GalleryGrid items={items} />
      </section>

      <CtaBanner imageUrl={settings?.ctaBannerImageUrl} />
    </>
  );
}
