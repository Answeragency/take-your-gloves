import { Metadata } from "next";
import SectionHeading from "@/components/section-heading";
import TestimonialCard from "@/components/testimonial-card";
import Reveal from "@/components/reveal";
import CtaBanner from "@/components/cta-banner";
import { press } from "@/lib/testimonials-extra";
import { getAllTestimonials, getHomePage, getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Témoignages — Avis de nos Pilotes",
  description:
    "Plus de 800 passionnés automobiles témoignent de leurs expériences lors des rallyes touristiques, trackdays et sorties Take Your Gloves en Alsace. Lisez leurs avis.",
  alternates: { canonical: "https://take-your-gloves.vercel.app/temoignages" },
  openGraph: {
    title: "Avis & Témoignages | Take Your Gloves",
    description: "Ce que nos pilotes disent de leurs rallyes, trackdays et sorties en voiture de sport avec Take Your Gloves en Alsace.",
    url: "https://take-your-gloves.vercel.app/temoignages",
  },
};

export default async function TemoignagesPage() {
  const [testimonials, home, settings] = await Promise.all([
    getAllTestimonials(),
    getHomePage(),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="pt-40 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading
            eyebrow="Témoignages"
            title="La parole à ceux qui ont enfilé leurs gants"
            description="Plus de 800 passionnés nous ont déjà fait confiance pour vivre une expérience automobile unique. Voici ce qu'ils en disent."
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

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading eyebrow="Presse" title="Ils parlent de nous" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {press.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className="rounded-2xl border border-line bg-background p-7 text-center">
                  <p className="text-sm italic leading-relaxed text-foreground/85">
                    {p.note}
                  </p>
                  <p className="mt-5 font-display text-xs uppercase tracking-[0.15em] text-gold">
                    {p.name}
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
