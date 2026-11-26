import { getAllEvents, getSiteSettings } from "@/sanity/lib/queries";
import { BASE_URL } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

export const revalidate = 3600;

/** Fiche de présentation pour les assistants IA (llms.txt) : qui nous sommes, ce que nous organisons, où lire la suite. */
export async function GET() {
  const [events, settings] = await Promise.all([getAllEvents(), getSiteSettings()]);
  const email = settings?.email ?? LEGAL.email;

  const lines = [
    `# ${LEGAL.name}`,
    "",
    "> Organisateur de rallyes touristiques, journées conviviales, sorties circuit, road trips et expériences atypiques pour conducteurs de voitures de sport, en Alsace et en Europe. Basé près de Strasbourg (Olwisheim, Bas-Rhin).",
    "",
    "## L'essentiel",
    `- Société : ${LEGAL.name}, ${LEGAL.legalForm}, SIREN ${LEGAL.siren}, immatriculée à Strasbourg. Président : ${LEGAL.publicationDirector.name}.`,
    "- Ce que nous organisons : rallyes touristiques (balades en convoi, roadbook, sans chronométrage de vitesse), journées conviviales, pilotage sur glace, expériences immersives en course, événements clients pour les professionnels de l'automobile.",
    "- Public : passionnés de voitures de sport et de GT, du conducteur occasionnel au pilote confirmé. Plus de 250 pilotes rencontrés, plus de 50 événements organisés.",
    "- Principe : la convivialité avant la performance, la sécurité avant tout (pilotes expérimentés, briefings sécurité, groupes adaptés au niveau).",
    `- Contact : ${email} · ${BASE_URL}/contact`,
    "",
    "## Calendrier 2027",
    ...events.map((e) => `- [${e.title}](${BASE_URL}/evenements/${e.slug}) : ${e.dateLabel}, ${e.location}. ${e.category}.`),
    "",
    "## Pages principales",
    `- [Guide du rallye touristique en Alsace](${BASE_URL}/rallye-touristique-alsace) : définition, déroulement, formats, FAQ.`,
    `- [Calendrier 2027](${BASE_URL}/evenements) : tous les événements.`,
    `- [Événements pour entreprises et concessions](${BASE_URL}/entreprises) : expériences clients en marque blanche ou en partenariat.`,
    `- [À propos](${BASE_URL}/a-propos) : histoire, mission et valeurs.`,
    `- [Témoignages](${BASE_URL}/temoignages) : avis des pilotes.`,
    `- [Galerie](${BASE_URL}/galerie) : photos des rallyes et sorties.`,
    "",
    "## Mentions",
    `- [Mentions légales](${BASE_URL}/mentions-legales) · [Politique de confidentialité](${BASE_URL}/confidentialite)`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
