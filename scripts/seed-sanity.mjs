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
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  email: "contact@takeyourgloves.fr",
  phone: "+33 (0)6 00 00 00 00",
  location: "Strasbourg, France",
  facebookUrl: "https://www.facebook.com/TakeYourGlovesEvent/",
  instagramUrl: "",
  footerTagline: "Conduisez avec passion, roulez en sécurité.",
  footerDescription: "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport. Basé à Strasbourg.",
};

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroEyebrow: "Strasbourg · Alsace · Émotions automobiles",
  heroLine1: "Enfilez vos gants.",
  heroLine2: "Vivez la route.",
  heroSubtitle: "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport. Rallyes touristiques, trackdays, sorties conviviales et expériences atypiques.",
  spiritHeading: "Plus qu'un organisateur d'événements, une communauté de passionnés",
  spiritDescription: "Depuis nos premiers rallyes entre amis à Strasbourg, Take Your Gloves est devenu un rendez-vous incontournable pour les passionnés de voitures de sport en Alsace. Sécurité, convivialité et exigence : chaque événement est pensé pour vous faire vivre le plaisir de conduire dans les meilleures conditions.",
  spiritBullets: [
    "Encadrement par des pilotes expérimentés",
    "Itinéraires et circuits sélectionnés avec soin",
    "Une communauté de plus de 800 passionnés",
    "Expériences sur-mesure, du débutant au confirmé",
  ],
  ctaEyebrow: "Prêt à enfiler vos gants ?",
  ctaHeading: "Parlons de votre prochaine expérience automobile",
  ctaDescription: "Racontez-nous votre projet — rallye, trackday, sortie entre amis ou expérience sur-mesure — et recevez une proposition personnalisée sous 48h.",
};

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  heroHeading: "Né d'une passion partagée à Strasbourg",
  heroDescription: "Take Your Gloves est parti d'un constat simple : conduire sa voiture de sport au quotidien ne suffit pas à en révéler tout le potentiel — ni tout le plaisir. Nous avons créé les rendez-vous qui nous manquaient.",
  missionHeading: "Faire (re)découvrir le plaisir de conduire",
  missionParagraphs: [
    "Trop de voitures de sport et de GT dorment dans les garages, réservées aux beaux jours et aux trajets sans relief. Take Your Gloves est né pour leur redonner leur usage premier : le plaisir de conduire.",
    "Depuis nos premiers rassemblements informels entre amis à Strasbourg, nous avons structuré une véritable offre d'événements — rallyes touristiques, trackdays, sorties conviviales et expériences atypiques — pour répondre à toutes les envies, du conducteur occasionnel au pilote confirmé.",
    "Aujourd'hui, c'est une communauté de plus de 800 passionnés qui se retrouve régulièrement autour de nos événements, en Alsace et au-delà.",
  ],
  values: [
    { title: "Sécurité avant tout", text: "Chaque événement est encadré par des pilotes expérimentés, avec des briefings sécurité systématiques et des groupes adaptés au niveau de chacun." },
    { title: "Exigence dans l'organisation", text: "Roadbooks soignés, itinéraires repérés en amont, partenariats circuits sélectionnés : rien n'est laissé au hasard pour que vous profitiez pleinement." },
    { title: "Convivialité avant la performance", text: "Take Your Gloves n'est pas une compétition. C'est une communauté de passionnés qui se retrouvent pour partager une passion commune." },
  ],
};

const eventsPage = {
  _id: "eventsPage",
  _type: "eventsPage",
  introLetter: [
    { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Merci pour cette incroyable saison 2025 que nous avons vécue ensemble ! Des virages de Corse aux sommets des Alpes, sans oublier les routes sinueuses de notre massif des Vosges : les souvenirs indélébiles marqués par votre bonne humeur et votre passion ne manquent pas !" }] },
    { _type: "block", _key: "p2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Je vous remercie chaleureusement de faire partie de cette aventure et vous souhaite une merveilleuse année 2026, qui sera, je l'espère, pleine d'émotions automobiles !" }] },
    { _type: "block", _key: "p3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s3", text: "Pour la prochaine saison, j'ai voulu placer la barre encore plus haut et vous ai préparé un programme varié et conçu pour pleinement profiter de ces expériences au volant de vos autos." }] },
    { _type: "block", _key: "p4", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s4", text: "Attachez votre ceinture et découvrez plus bas l'ensemble des événements qui vous attendent tout au long de l'année !" }] },
  ],
  introNote: "N'hésitez pas à me faire part des dates qui peuvent vous intéresser, sans engagement définitif, afin de vous pré-réserver des places.",
  signature: "Cédric Wetta",
};

// Photos existantes dans public/images (hors affiches d'événements et logo),
// reprises depuis la liste statique de la galerie.
const galleryPhotos = [
  { id: "ardennes-chateau-parade", file: "ardennes-chateau-parade.jpg", label: "Convoi devant le château — Les Ardennes", variant: "dark" },
  { id: "glace-supra-jaune", file: "glace-supra-jaune.jpg", label: "Supra sur glace", variant: "red" },
  { id: "ardennes-groupe", file: "ardennes-groupe.jpg", label: "La troupe — Les Ardennes", variant: "dark" },
  { id: "interior-amg", file: "interior-amg.jpg", label: "À bord — AMG GT", variant: "gold" },
  { id: "groupe-drapeaux", file: "groupe-drapeaux.jpg", label: "La communauté Take Your Gloves", variant: "dark" },
  { id: "glace-convoi", file: "glace-convoi.jpg", label: "Convoi sur glace", variant: "dark" },
  { id: "ardennes-chateau-voitures", file: "ardennes-chateau-voitures.jpg", label: "Les Ardennes", variant: "dark" },
  { id: "amg-gtr-foret", file: "amg-gtr-foret.jpg", label: "AMG GT-R en forêt", variant: "dark" },
  { id: "glace-groupe", file: "glace-groupe.jpg", label: "Le groupe — Roulage Glace", variant: "dark" },
  { id: "forest-porsche", file: "forest-porsche.jpg", label: "Porsche sur route forestière", variant: "dark" },
  { id: "glace-toyota-noire", file: "glace-toyota-noire.jpg", label: "Toyota sur glace", variant: "dark" },
  { id: "nurburgring-trackday", file: "nurburgring-trackday.jpg", label: "Trackday au Nürburgring", variant: "red" },
  { id: "glace-portrait", file: "glace-portrait.jpg", label: "Portrait — Roulage Glace", variant: "gold" },
];

const contactPage = {
  _id: "contactPage",
  _type: "contactPage",
  heading: "Construisons votre prochaine sortie",
  description: "Que ce soit pour un rallye touristique, une journée trackday, une sortie entre amis ou une expérience sur-mesure, parlez-nous de votre projet. Nous vous répondons avec une proposition personnalisée sous 48h.",
};

// ─── Migration ─────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🚀 Migration vers Sanity...\n");

  // Singletons
  console.log("⚙️  Paramètres & pages...");
  await client.createOrReplace(siteSettings);
  await client.createOrReplace(homePage);
  await client.createOrReplace(aboutPage);
  await client.createOrReplace(eventsPage);
  await client.createOrReplace(contactPage);
  console.log("   ✓ siteSettings, homePage, aboutPage, eventsPage, contactPage\n");

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

  // Photos galerie
  console.log("\n📸 Photos galerie...");
  for (const [i, p] of galleryPhotos.entries()) {
    const filePath = path.join(__dirname, "..", "public", "images", p.file);
    const asset = await client.assets.upload("image", readFileSync(filePath), {
      filename: p.file,
    });
    await client.createOrReplace({
      _id: `galleryPhoto-${p.id}`,
      _type: "galleryPhoto",
      image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
      label: p.label,
      variant: p.variant,
      order: i,
    });
    console.log(`   ✓ ${p.label}`);
  }

  console.log("\n✅ Migration terminée !");
  console.log("👉 Les affiches des événements sont à ajouter manuellement dans le Studio (/studio) — cliquer sur chaque événement → champ Image.");
}

seed().catch((err) => {
  console.error("❌ Erreur :", err.message);
  process.exit(1);
});
