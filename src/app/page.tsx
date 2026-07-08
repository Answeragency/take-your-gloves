import Hero from "@/components/hero";
import StatsStrip from "@/components/stats-strip";
import Marquee from "@/components/marquee";
import SectionHeading from "@/components/section-heading";
import CalendarCard from "@/components/calendar-card";
import TestimonialCard from "@/components/testimonial-card";
import CtaBanner from "@/components/cta-banner";
import Button from "@/components/button";
import Reveal from "@/components/reveal";
import Photo from "@/components/photo";
import { testimonials } from "@/lib/events";
import { calendar } from "@/lib/calendar";

export default function Home() {
  const upcoming = calendar.slice(0, 3);

  return (
    <>
      <Hero />
      <Marquee />
      <StatsStrip />

      {/* Upcoming events */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Calendrier 2026"
            title="Les prochains rendez-vous"
          />
          <Reveal delay={0.1}>
            <Button href="/evenements" variant="ghost">
              Voir tout le calendrier
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6">
          {upcoming.map((event, i) => (
            <CalendarCard key={event.slug} event={event} index={i} />
          ))}
        </div>
      </section>

      {/* About / Spirit section */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-28">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
              L&apos;esprit Take Your Gloves
            </p>
            <h2 className="text-balance mt-5 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl">
              Plus qu&apos;un organisateur d&apos;événements,{" "}
              <span className="gold-text">une communauté de passionnés</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Depuis nos premiers rallyes entre amis à Strasbourg, Take Your
              Gloves est devenu un rendez-vous incontournable pour les
              passionnés de voitures de sport en Alsace. Sécurité, convivialité
              et exigence : chaque événement est pensé pour vous faire vivre
              le plaisir de conduire dans les meilleures conditions.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Encadrement par des pilotes expérimentés",
                "Itinéraires et circuits sélectionnés avec soin",
                "Une communauté de plus de 800 passionnés",
                "Expériences sur-mesure, du débutant au confirmé",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-foreground/80"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/a-propos" variant="outline">
                Notre histoire
              </Button>
            </div>
          </Reveal>

          {/* Editorial photo grid */}
          <Reveal delay={0.12} className="grid grid-cols-2 gap-3 sm:grid-cols-12 sm:grid-rows-2 sm:h-[420px]">
            <div className="col-span-2 h-48 overflow-hidden rounded-2xl sm:col-span-8 sm:row-span-2 sm:h-full">
              <Photo
                src="/images/groupe-drapeaux.jpg"
                alt="La communauté Take Your Gloves"
                label="Take Your Gloves"
                variant="dark"
                className="h-full w-full"
              />
            </div>
            <div className="h-32 overflow-hidden rounded-2xl sm:col-span-4 sm:row-span-1 sm:h-full">
              <Photo
                src="/images/forest-porsche.jpg"
                alt="Porsche sur une route forestière"
                label="Sur la route"
                variant="dark"
                className="h-full w-full"
              />
            </div>
            <div className="h-32 overflow-hidden rounded-2xl sm:col-span-4 sm:row-span-1 sm:h-full">
              <Photo
                src="/images/interior-amg.jpg"
                alt="Intérieur d'une Mercedes-AMG GT"
                label="À bord"
                variant="gold"
                className="h-full w-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-28">
        <SectionHeading
          eyebrow="Ils en parlent"
          title="La parole à nos pilotes"
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
