export type StatusType = "limited" | "soldout" | "soon" | "available";

export type CalendarEvent = {
  slug: string;
  category: string;
  title: string;
  dateLabel: string;
  dateSort?: string;
  location: string;
  duration?: string;
  description: string;
  status?: string;
  statusType: StatusType;
  image?: string;
};

/** Ancien nom de catégorie encore présent dans Sanity : affiché sous son nouveau nom. */
export const CATEGORY_RENAMES: Record<string, string> = {
  "Sortie conviviale": "Sport automobile",
};
export const displayCategory = (c: string) => CATEGORY_RENAMES[c] ?? c;

/** "Limité à 20 équipages." est une info clé (colonne de droite), pas un badge d'en-tête. */
export function splitStatus(status?: string): { capacity?: string; badge?: string } {
  if (!status) return {};
  const m = status.match(/Limité à \d+ équipages/i);
  const badge = status.replace(/Limité à \d+ équipages\.?/i, "").trim();
  return { capacity: m?.[0], badge: badge || undefined };
}

export type EventExtras = { duration?: string; inclusions?: string; gallery?: string[]; galleryMatch?: string };
/** Valeurs par défaut (modifiables dans Sanity : les champs Sanity prennent le dessus). */
export const EVENT_EXTRAS: Record<string, EventExtras> = {};

export const categories = [
  "Rallye touristique",
  "Sport automobile",
  "Expérience atypique",
  "Journée conviviale",
  "Expérience immersive",
];

export const calendar: CalendarEvent[] = [
  {
    slug: "pilotage-sur-glace",
    category: "Expérience atypique",
    title: "Pilotage sur Glace avec Pegasus Racing",
    dateLabel: "Samedi 30 & Dimanche 31 Janvier",
    dateSort: "2027-01-30",
    location: "Autriche",
    duration: "2 jours",
    description:
      "Deux jours de glisse sur un circuit de glace en Autriche, avec Pegasus Racing. Encadré par des moniteurs, progressez au volant d'une flotte de voitures modernes, dont la Yaris GR. Accessible à tous les niveaux.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-pilotage-sur-glace-2027.jpg",
  },
  {
    slug: "bourgogne",
    category: "Rallye touristique",
    title: "La Bourgogne",
    dateLabel: "Du Vendredi 16 au Dimanche 18 Avril",
    dateSort: "2027-04-16",
    location: "Bourgogne, France",
    duration: "3 jours",
    description:
      "Trois jours sur les routes de Bourgogne, entre vignobles, villages de caractère et belles courbes, au volant de votre voiture de sport. Un rallye touristique pensé pour le plaisir de conduire et la découverte.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-bourgogne-2027.jpg",
  },
  {
    slug: "rallye-gourmand",
    category: "Journée conviviale",
    title: "Rallye Gourmand",
    dateLabel: "Samedi 24 Avril",
    dateSort: "2027-04-24",
    location: "Alsace",
    description:
      "L'inratable journée phare, avec l'Automobile Club du Rhin : du roulage sur des routes sélectionnées avec soin, des artisans locaux à découvrir et des dégustations à chaque étape !",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-rallye-gourmand-2027.jpg",
  },
  {
    slug: "corse",
    category: "Rallye touristique",
    title: "La Corse",
    dateLabel: "Du Dimanche 16 au Samedi 22 Mai",
    dateSort: "2027-05-16",
    location: "Corse, France",
    duration: "7 jours",
    description:
      "Une semaine entre mer et montagne sur les routes de l'Île de Beauté : corniches sur la Méditerranée, cols sinueux et tables en bord de mer, pour une véritable aventure automobile.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-corse-2027.jpg",
  },
  {
    slug: "alsace-vosges",
    category: "Sport automobile",
    title: "L'Alsace Vosges",
    dateLabel: "Du Vendredi 18 au Dimanche 20 Juin",
    dateSort: "2027-06-18",
    location: "Alsace & Vosges, France",
    duration: "3 jours",
    description:
      "Trois jours de roulage sur routes fermées à travers l'Alsace et le massif des Vosges, pour profiter pleinement de votre voiture de sport dans un cadre sécurisé.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-alsace-vosges-2027.jpg",
  },
  {
    slug: "road-trip-banquet",
    category: "Journée conviviale",
    title: "Road Trip & Banquet",
    dateLabel: "Samedi 10 Juillet",
    dateSort: "2027-07-10",
    location: "Massif des Vosges",
    description:
      "Avec l'Automobile Club du Rhin, du roulage pour le plaisir de conduite dans le massif des Vosges et un véritable banquet à partager (viande à la broche) pour un pur moment de convivialité !",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-road-trip-banquet-2027.jpg",
  },
  {
    slug: "legende-rallye-festival",
    category: "Expérience atypique",
    title: "Légende Rallye Festival",
    dateLabel: "Du Jeudi 2 au Samedi 4 Septembre",
    dateSort: "2027-09-02",
    location: "Lieu à confirmer",
    duration: "3 jours",
    description:
      "40 ans de rallye sous vos yeux, 3 jours de fête automobile ! Plongez dans l'histoire du rallye au cœur d'un festival dédié aux voitures de légende.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-legende-rallye-festival-2027.jpg",
  },
  {
    slug: "italie-slovenie",
    category: "Rallye touristique",
    title: "L'Italie & la Slovénie",
    dateLabel: "Du Lundi 6 au Samedi 11 Septembre",
    dateSort: "2027-09-06",
    location: "Italie & Slovénie",
    duration: "6 jours",
    description:
      "Six jours de route entre l'Italie et la Slovénie, des routes de montagne aux rives des lacs, pour un rallye touristique d'exception au volant de votre voiture de sport.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-italie-slovenie-2027.jpg",
  },
  {
    slug: "500-nocturnes",
    category: "Expérience immersive",
    title: "Course des 500 Nocturnes",
    dateLabel: "Samedi 25 Septembre",
    dateSort: "2027-09-25",
    location: "Anneau du Rhin, Colmar",
    description:
      "En partenariat avec Pegasus Racing, vivez en immersion au cœur des paddocks la course des 500 Nocturnes : la nuit la plus sport, chic et glamour de l'année. Également disponible en offre professionnelle pour vos clients et relations d'affaires.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-500-nocturnes-2027.jpg",
  },
];

// Fallback local posters keyed by slug (used when Sanity image not yet uploaded)
export const POSTER_MAP: Record<string, string> = Object.fromEntries(
  calendar.filter((e) => e.image).map((e) => [e.slug, e.image as string])
);

export const statusStyles: Record<StatusType, string> = {
  limited: "border-gold/40 text-gold bg-gold/10",
  soldout: "border-accent/40 text-accent bg-accent/10",
  soon: "border-foreground/20 text-muted bg-foreground/5",
  available: "border-foreground/20 text-muted bg-foreground/5",
};

export const categoryVariant: Record<string, "dark" | "red" | "gold"> = {
  "Rallye touristique": "red",
  "Sport automobile": "gold",
  "Expérience atypique": "dark",
  "Journée conviviale": "gold",
  "Expérience immersive": "red",
};
