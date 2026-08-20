import { Metadata } from "next";
import SectionHeading from "@/components/section-heading";
import TestimonialCard from "@/components/testimonial-card";
import CtaBanner from "@/components/cta-banner";
import { getAllTestimonials, getHomePage, getSiteSettings, getTemoignagesPage } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Témoignages, avis de nos pilotes",
  description:
    "Plus de 800 passionnés automobiles témoignent de leurs expériences lors des rallyes touristiques, trackdays et sorties Take Your Gloves en Alsace. Lisez leurs avis.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/temoignages" },
  openGraph: {
    title: "Avis & Témoignages | Take Your Gloves",
    description: "Ce que nos pilotes disent de leurs rallyes, trackdays et sorties en voiture de sport avec Take Your Gloves en Alsace.",
    url: "https://take-your-gloves.vercel.app/temoignages",
  },
  twitter: {
    card: "summary",
    title: "Avis & Témoignages | Take Your Gloves",
    description: "Ce que nos pilotes disent de leurs rallyes, trackdays et sorties en voiture de sport avec Take Your Gloves en Alsace.",
  },
};

export default async function TemoignagesPage() {
  const [testimonials, home, settings, page] = await Promise.all([
    getAllTestimonials(),
    getHomePage(),
    getSiteSettings(),
    getTemoignagesPage(),
  ]);

  return (
    <>
      <section className="pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            as="h1"
            eyebrow={page?.eyebrow ?? "Témoignages"}
            title={page?.heading ?? "La parole à ceux qui ont enfilé leurs gants"}
            highlight="leurs gants"
            description={page?.description ?? "Plus de 800 passionnés nous ont déjà fait confiance pour vivre une expérience automobile unique. Voici ce qu'ils en disent."}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t._id} {...t} index={i} />
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
