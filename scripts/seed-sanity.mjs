/**
 * Script de migration : importe les données statiques dans Sanity.
 *
 * Usage :
 *   node scripts/seed-sanity.mjs
 *
 * Prérequis :
 *   - .env.local configuré avec NEXT_PUBLIC_SANITY_PROJECT_ID,
 *     NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 *   - npm install @sanity/client dotenv (déjà présent via next-sanity)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

// Charge .env.local manuellement
const env = Object.fromEntries(
  readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=").map((p) => p.trim()))
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

// ─── Données à migrer ─────────────────────────────────────────────────────────

const events = [
  { slug: "soiree-simulateurs", category: "Sortie conviviale", title: "Soirée Simulateurs", dateLabel: "Vendredi 16 Janvier, en soirée", dateSort: "2026-01-16", location: "Legend Track, Colmar", description: "En pleine période hivernale, une soirée sport automobile au volant de simulateurs de pointe dans une ambiance détendue. Privatisation de la salle du Legend Track à Colmar.", status: "Dernières places restantes !", statusType: "limited" },
  { slug: "roulage-glace-pegasus", category: "Expérience atypique", title: "Roulage Glace avec Pegasus Racing", dateLabel: "Dimanche 1er Février", dateSort: "2026-02-01", location: "Autriche", description: "Jusqu'à 120 km de glisse sur un circuit long de 3 km, encadré par des moniteurs pour vous faire progresser, au volant d'une flotte de voitures modernes.", status: "Complet !", statusType: "soldout" },
  { slug: "musees-stuttgart-motorworld", category: "Expérience atypique", title: "Musées de Stuttgart & Motorworld", dateLabel: "Samedi et Dimanche 7 & 8 Mars", dateSort: "2026-03-07", location: "Stuttgart, Allemagne", description: "Découvrez les impressionnants musées Porsche et Mercedes, le site unique du Motorworld avec ses modèles d'exception.", statusType: "available" },
  { slug: "les-ardennes", category: "Rallye touristique", title: "Les Ardennes", dateLabel: "Du Vendredi 17 au Dimanche 19 Avril", dateSort: "2026-04-17", location: "Luxembourg & Ardennes belges", description: "Pour notre premier rallye touristique de l'année, découvrez les routes sinueuses et méconnues du Luxembourg et plongez au cœur du massif des Ardennes.", status: "Limité à 20 équipages.", statusType: "limited" },
  { slug: "rallye-gourmand", category: "Sortie conviviale", title: "Rallye Gourmand — 6ème édition", dateLabel: "Vendredi 1er Mai (férié)", dateSort: "2026-05-01", location: "Alsace", description: "L'inratable journée phare : profitez de routes sélectionnées avec soin, découvrez des artisans locaux, dégustez leurs produits.", status: "Attention, événement très prisé !", statusType: "limited" },
  { slug: "ecosse", category: "Rallye touristique", title: "L'Écosse", dateLabel: "Du Lundi 18 au Dimanche 24 Mai", dateSort: "2026-05-18", location: "Highlands, Écosse", description: "Une véritable aventure automobile. Découvrez la région des Highlands et ses routes mondialement plébiscitées : le passage du Bealach na Bà ou l'incontournable route NC 500.", status: "Limité à 20 équipages. Dernières places restantes.", statusType: "limited" },
  { slug: "road-trip-banquet", category: "Journée conviviale", title: "Road Trip & Banquet — 5ème édition", dateLabel: "Samedi 27 Juin", dateSort: "2026-06-27", location: "Site privatisé, Alsace", description: "Du roulage pour le plaisir de conduite et un véritable banquet à partager sur un site entièrement privatisé pour un pur moment de convivialité !", status: "Attention, événement très prisé !", statusType: "limited" },
  { slug: "le-mans-classic-pegasus", category: "Expérience atypique", title: "Le Mans Classic avec Pegasus Racing", dateLabel: "Du Vendredi 3 au Dimanche 5 Juillet", dateSort: "2026-07-03", location: "Le Mans, France", description: "Venez vivre un événement hors du temps et unique : la version « classic » des 24h du Mans, des plateaux d'avant-guerre jusqu'aux années 2000.", status: "Programme à découvrir très bientôt.", statusType: "soon" },
  { slug: "foret-noire", category: "Rallye touristique", title: "La Forêt Noire", dateLabel: "Samedi & Dimanche 5 et 6 Septembre", dateSort: "2026-09-05", location: "Schwarzwald, Allemagne", description: "Une escapade au cœur de la Schwarzwald. Découvrez ce massif boisé et ses superbes routes, accompagnés d'arrêts à la découverte des trésors cachés de la région.", status: "Limité à 20 équipages. Programme à découvrir très bientôt.", statusType: "soon" },
  { slug: "500-nocturnes", category: "Expérience immersive", title: "500 Nocturnes", dateLabel: "Samedi 27 Septembre", dateSort: "2026-09-27", location: "Anneau du Rhin, Colmar", description: "En partenariat avec le Team Pegasus Racing, vivez en immersion depuis les stands de l'écurie la course des 500 Nocturnes : l'événement sport automobile de l'année en Alsace.", status: "Programme à découvrir très bientôt.", statusType: "soon" },
  { slug: "pyrenees", category: "Rallye touristique", title: "Les Pyrénées", dateLabel: "Du Dimanche 4 au Samedi 10 Octobre", dateSort: "2026-10-04", location: "Pyrénées, France", description: "Vivez une aventure automobile intense à travers les cols mythiques des Pyrénées, entre panoramas vertigineux et villages de montagne authentiques.", status: "Limité à 20 équipages. Programme à découvrir très bientôt.", statusType: "soon" },
];

const testimonials = [
  { name: "Julien R.", role: "Propriétaire Porsche 992", quote: "Une organisation millimétrée et une ambiance incroyable. Le rallye touristique restera un de mes plus beaux souvenirs au volant.", featured: true, order: 1 },
  { name: "Camille V.", role: "Trackday débutante", quote: "J'avais peur de ne pas être à niveau. L'équipe m'a mise en confiance dès le briefing. J'ai progressé énormément en une seule journée.", featured: true, order: 2 },
  { name: "Marc D.", role: "Membre depuis 2022", quote: "Ce n'est pas juste des événements, c'est une vraie communauté. Les sorties conviviales sont devenues des rendez-vous incontournables.", featured: true, order: 3 },
  { name: "Sophie L.", role: "Cadeau d'anniversaire pour son conjoint", quote: "L'expérience atypique copilotage rallye a fait des étincelles dans ses yeux. Le plus beau cadeau qu'on pouvait lui offrir.", featured: true, order: 4 },
];

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  stats: [
    { value: "58", label: "Événements organisés" },
    { value: "180+", label: "Pilotes accompagnés" },
    { value: "36", label: "Circuits & itinéraires partenaires" },
  ],
  marqueeItems: [
    "Rallye Touristique",
    "Roulage sur Glace",
    "Expérience Atypique",
    "Sortie Conviviale",
    "Journée Circuit",
    "Road Trip",
    "Expérience Immersive",
  ],
};

// ─── Migration ─────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🚀 Migration vers Sanity...\n");

  // Paramètres du site
  console.log("⚙️  Paramètres du site...");
  await client.createOrReplace(siteSettings);
  console.log("   ✓ siteSettings créé\n");

  // Événements
  console.log("📅 Événements...");
  for (const event of events) {
    await client.createOrReplace({
      _id: `event-${event.slug}`,
      _type: "event",
      ...event,
      slug: { _type: "slug", current: event.slug },
    });
    console.log(`   ✓ ${event.title}`);
  }

  // Témoignages
  console.log("\n💬 Témoignages...");
  for (const t of testimonials) {
    await client.createOrReplace({
      _id: `testimonial-${t.name.toLowerCase().replace(/[^a-z]/g, "-")}`,
      _type: "testimonial",
      ...t,
    });
    console.log(`   ✓ ${t.name}`);
  }

  console.log("\n✅ Migration terminée !");
  console.log("👉 Les photos de la galerie doivent être uploadées manuellement dans le Studio (/studio).");
  console.log("👉 Les affiches des événements aussi — cliquer sur chaque événement dans le Studio → champ Image.");
}

seed().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
