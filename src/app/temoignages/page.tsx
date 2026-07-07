import { Metadata } from "next";
import SectionHeading from "@/components/section-heading";
import TestimonialCard from "@/components/testimonial-card";
import Reveal from "@/components/reveal";
import CtaBanner from "@/components/cta-banner";
import { testimonials } from "@/lib/events";
import { extraTestimonials, press } from "@/lib/testimonials-extra";

export const metadata: Metadata = {
  title: "Témoignages | Take Your Gloves",
  description:
    "Ce que nos pilotes disent de leurs rallyes, trackdays et sorties Take Your Gloves.",
};

const all = [...testimonials, ...extraTestimonials];

export default function TemoignagesPage() {
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
          {all.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
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

      <CtaBanner />
    </>
  );
}
