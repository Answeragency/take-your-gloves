import { Metadata } from "next";
import Photo from "@/components/photo";
import SectionHeading from "@/components/section-heading";
import Reveal from "@/components/reveal";
import CtaBanner from "@/components/cta-banner";
import { getAllGalleryPhotos } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = {
  title: "Galerie | Take Your Gloves",
  description: "Revivez nos rallyes, roulages sur glace et sorties en images.",
};

export default async function GaleriePage() {
  const photos = await getAllGalleryPhotos();
  return (
    <>
      <section className="pt-28 pb-10 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="En images"
            title="Revivez chaque accélération"
            description="Un aperçu de nos rallyes, trackdays et rencontres entre passionnés. Galerie en cours d'enrichissement avec nos derniers événements."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10 lg:pb-28">
        <div className="columns-2 gap-4 sm:columns-3">
          {photos.map((p, i) => {
            const ratio =
              i % 5 === 0 ? "aspect-[16/9]" :
              i % 3 === 1 ? "aspect-[3/4]" :
              "aspect-[4/3]";
            const src = urlFor(p.image).width(1200).auto("format").url();
            return (
              <Reveal key={p.label} delay={(i % 6) * 0.06} className="mb-4 break-inside-avoid">
                <div className={`group relative overflow-hidden rounded-xl ${ratio}`}>
                  <Photo
                    src={src}
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

      <CtaBanner />
    </>
  );
}
