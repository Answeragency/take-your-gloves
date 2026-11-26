import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import Button from "@/components/button";
import CtaBanner from "@/components/cta-banner";
import FaqSection from "@/components/faq-section";
import JsonLd from "@/components/json-ld";
import { getAllEvents } from "@/sanity/lib/queries";
import { buildFaq } from "@/lib/faq";
import { BASE_URL, ORG_ID, breadcrumbJsonLd } from "@/lib/seo";

const PATH = "/rallye-touristique-alsace";
const TITLE = "Rallye touristique en Alsace : le guide pour rouler en voiture de sport";
const DESCRIPTION =
  "Qu'est-ce qu'un rallye touristique ? Comment ça se passe, quelles différences avec un trackday ou le roulage sur glace, et le calendrier 2027 des rallyes et sorties Take Your Gloves en Alsace et en Europe.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}${PATH}` },
  openGraph: { title: `${TITLE} | Take Your Gloves`, description: DESCRIPTION, url: `${BASE_URL}${PATH}`, type: "article", locale: "fr_FR" },
};

const h2 = "text-balance mt-14 font-display text-3xl leading-[1.05] tracking-tight text-foreground sm:text-4xl";
const p = "mt-5 text-base leading-relaxed text-foreground/80";

const STEPS = [
  ["Recevoir le programme", "Chaque événement a sa page avec un formulaire « Recevoir les infos » : vous laissez un email ou un téléphone, le programme vous parvient en avant-première."],
  ["Préparer la route", "L'itinéraire est repéré en amont et décrit dans un roadbook soigné : vous savez où aller, sans stress, et vous profitez des paysages."],
  ["Briefing sécurité", "Avant le départ, un briefing sécurité systématique rappelle les consignes. Les groupes sont adaptés au niveau de chacun."],
  ["Rouler en groupe, encadré", "Le convoi est encadré par des pilotes expérimentés, sur des routes choisies pour le plaisir de conduire."],
  ["Partager les étapes", "Dégustations chez des artisans locaux, banquet ou repas à table : la convivialité est au cœur de chaque journée."],
  ["Garder les souvenirs", "Des photographes immortalisent les moments forts, que vous retrouvez ensuite dans la galerie."],
] as const;

const FORMATS = [
  ["Rallye touristique", "Balade en convoi sur routes ouvertes, itinéraire en roadbook, sans chronométrage de vitesse.", "La Bourgogne, La Corse, L'Italie & la Slovénie"],
  ["Journée conviviale", "Une journée de route avec étapes gourmandes et repas partagé.", "Rallye Gourmand, Road Trip & Banquet"],
  ["Roulage sur glace", "Pilotage encadré sur un circuit de glace, pour apprendre à maîtriser l'adhérence en sécurité.", "Pilotage sur glace avec Pegasus Racing (Autriche)"],
  ["Expérience immersive", "Vivre une course de l'intérieur : paddocks, stands, ambiance de nuit.", "Course des 500 Nocturnes (Anneau du Rhin, Colmar)"],
] as const;

export default async function RallyeTouristiqueAlsacePage() {
  const events = await getAllEvents();
  const faq = buildFaq(events);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Rallye touristique en Alsace", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: TITLE,
            description: DESCRIPTION,
            inLanguage: "fr-FR",
            mainEntityOfPage: `${BASE_URL}${PATH}`,
            author: { "@type": "Person", name: "Cédric Wetta" },
            publisher: { "@id": ORG_ID },
            dateModified: "2026-11-26",
          },
        ]}
      />

      <section className="pt-28 pb-8 lg:pt-40">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Le guide</p>
            <h1 className="text-balance mt-4 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Rallye touristique en Alsace : rouler en voiture de sport, sans compétition
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground/85">
              Un rallye touristique est une balade automobile organisée, sans chronométrage de vitesse, sur un itinéraire
              préparé et décrit dans un roadbook. On y roule pour la route, les paysages et le plaisir de partager un
              moment convivial. Take Your Gloves, organisateur basé près de Strasbourg, en propose toute l&apos;année en
              Alsace et en Europe.
            </p>
            <p className="mt-4 text-sm text-muted">Mis à jour le 26 novembre 2026 · par Cédric Wetta, fondateur de Take Your Gloves</p>
          </Reveal>

          <h2 className={h2}>Comment se déroule un rallye Take Your Gloves ?</h2>
          <ol className="mt-6 space-y-5">
            {STEPS.map(([name, text], i) => (
              <li key={name} className="flex gap-5">
                <span className="font-display text-2xl text-accent">{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg text-foreground">{name}</h3>
                  <p className="mt-1 text-base leading-relaxed text-foreground/80">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className={h2}>Rallye touristique, journée conviviale, roulage sur glace : quelles différences ?</h2>
          <p className={p}>
            Take Your Gloves propose plusieurs formats, tous pensés pour le plaisir de conduire. Voici comment les
            distinguer.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <caption className="sr-only">Les formats d&apos;événements Take Your Gloves</caption>
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-[0.12em] text-muted">
                  <th scope="col" className="py-3 pr-4 font-normal">Format</th>
                  <th scope="col" className="py-3 pr-4 font-normal">Principe</th>
                  <th scope="col" className="py-3 font-normal">Exemples en 2027</th>
                </tr>
              </thead>
              <tbody>
                {FORMATS.map(([format, principle, example]) => (
                  <tr key={format} className="border-b border-line align-top">
                    <th scope="row" className="py-4 pr-4 font-display text-base font-normal text-foreground">{format}</th>
                    <td className="py-4 pr-4 text-foreground/80">{principle}</td>
                    <td className="py-4 text-foreground/80">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className={h2}>Le calendrier 2027 des rallyes et sorties</h2>
          <p className={p}>
            Neuf rendez-vous sont déjà programmés. Les programmes détaillés sont annoncés au fil de la saison.
          </p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {events.map((event) => (
              <li key={event.slug}>
                <Link
                  href={`/evenements/${event.slug}`}
                  className="flex flex-col gap-1 py-4 transition-colors hover:text-accent sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-display text-lg text-foreground">{event.title}</span>
                  <span className="text-sm text-muted">
                    {event.dateLabel} · {event.location}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/evenements">Voir tout le calendrier</Button>
          </div>
        </div>
      </section>

      <FaqSection items={faq} eyebrow="Questions fréquentes" title="Rallye touristique en Alsace : vos questions" />
      <CtaBanner />
    </>
  );
}
