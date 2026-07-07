export type StatusType = "limited" | "soldout" | "soon" | "available";

export type CalendarEvent = {
  slug: string;
  category: string;
  title: string;
  dateLabel: string;
  location: string;
  description: string;
  status?: string;
  statusType: StatusType;
  image?: string;
};

export const categories = [
  "Rallye touristique",
  "Sortie conviviale",
  "Expérience atypique",
  "Journée conviviale",
  "Expérience immersive",
];

export const calendar: CalendarEvent[] = [
  {
    slug: "soiree-simulateurs",
    category: "Sortie conviviale",
    title: "Soirée Simulateurs",
    dateLabel: "Vendredi 16 Janvier, en soirée",
    location: "Legend Track, Colmar",
    description:
      "En pleine période hivernale, une soirée sport automobile au volant de simulateurs de pointe dans une ambiance détendue. Privatisation de la salle du Legend Track à Colmar.",
    status: "Dernières places restantes !",
    statusType: "limited",
    image: "/images/poster-soiree-simulateurs.jpg",
  },
  {
    slug: "roulage-glace-pegasus",
    category: "Expérience atypique",
    title: "Roulage Glace avec Pegasus Racing",
    dateLabel: "Dimanche 1er Février",
    location: "Autriche",
    description:
      "Jusqu'à 120 km de glisse sur un circuit long de 3 km, encadré par des moniteurs pour vous faire progresser, au volant d'une flotte de voitures modernes (Yaris GR en transmission intégrale et Supra GR en propulsion). Accessible à tous les niveaux.",
    status: "Complet !",
    statusType: "soldout",
    image: "/images/poster-roulage-glace.jpg",
  },
  {
    slug: "musees-stuttgart-motorworld",
    category: "Expérience atypique",
    title: "Musées de Stuttgart & Motorworld",
    dateLabel: "Samedi et Dimanche 7 & 8 Mars",
    location: "Stuttgart, Allemagne",
    description:
      "Découvrez les impressionnants musées Porsche et Mercedes, le site unique du Motorworld avec ses modèles d'exception, et dormez dans l'une des chambres thématiques et atypiques du V8 Hôtel. Le choix des chambres se fera suivant les dates d'inscription.",
    statusType: "available",
    image: "/images/poster-stuttgart-motorworld.jpg",
  },
  {
    slug: "les-ardennes",
    category: "Rallye touristique",
    title: "Les Ardennes",
    dateLabel: "Du Vendredi 17 au Dimanche 19 Avril",
    location: "Luxembourg & Ardennes belges",
    description:
      "Pour notre premier rallye touristique de l'année, découvrez les routes sinueuses et méconnues du Luxembourg et plongez au cœur du massif des Ardennes. Laissez-vous surprendre par la richesse de la région et les sensations procurées par ces routes.",
    status: "Limité à 20 équipages.",
    statusType: "limited",
    image: "/images/poster-ardennes.jpg",
  },
  {
    slug: "rallye-gourmand",
    category: "Sortie conviviale",
    title: "Rallye Gourmand — 6ème édition",
    dateLabel: "Vendredi 1er Mai (férié)",
    location: "Alsace",
    description:
      "L'inratable journée phare : profitez de routes sélectionnées avec soin, découvrez des artisans locaux, dégustez leurs produits et laissez-vous surprendre par des sites alsaciens atypiques !",
    status: "Attention, événement très prisé !",
    statusType: "limited",
    image: "/images/poster-rallye-gourmand.jpg",
  },
  {
    slug: "ecosse",
    category: "Rallye touristique",
    title: "L'Écosse",
    dateLabel: "Du Lundi 18 au Dimanche 24 Mai",
    location: "Highlands, Écosse",
    description:
      "Une véritable aventure automobile. Découvrez la région des Highlands et ses routes mondialement plébiscitées : le passage du Bealach na Bà ou l'incontournable route NC 500. Ferry depuis Amsterdam, seulement 6h de route depuis Strasbourg.",
    status: "Limité à 20 équipages. Dernières places restantes.",
    statusType: "limited",
    image: "/images/poster-ecosse.jpg",
  },
  {
    slug: "road-trip-banquet",
    category: "Journée conviviale",
    title: "Road Trip & Banquet — 5ème édition",
    dateLabel: "Samedi 27 Juin",
    location: "Site privatisé, Alsace",
    description:
      "Du roulage pour le plaisir de conduite et un véritable banquet à partager sur un site entièrement privatisé (viande à la broche) pour un pur moment de convivialité ! Tout simplement.",
    status: "Attention, événement très prisé !",
    statusType: "limited",
    image: "/images/poster-road-trip-banquet.jpg",
  },
  {
    slug: "le-mans-classic-pegasus",
    category: "Expérience atypique",
    title: "Le Mans Classic avec Pegasus Racing",
    dateLabel: "Du Vendredi 3 au Dimanche 5 Juillet",
    location: "Le Mans, France",
    description:
      "Venez vivre un événement hors du temps et unique dans le paysage français : la version « classic » des 24h du Mans, des plateaux d'avant-guerre jusqu'aux années 2000, avec un nombre impressionnant d'icônes et de modèles extrêmement rares.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-le-mans-classic.jpg",
  },
  {
    slug: "foret-noire",
    category: "Rallye touristique",
    title: "La Forêt Noire",
    dateLabel: "Samedi & Dimanche 5 et 6 Septembre",
    location: "Schwarzwald, Allemagne",
    description:
      "Une escapade au cœur de la Schwarzwald. Découvrez ce massif boisé et ses superbes routes, accompagnés d'arrêts à la découverte des trésors cachés de la région.",
    status: "Limité à 20 équipages. Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-foret-noire.jpg",
  },
  {
    slug: "500-nocturnes",
    category: "Expérience immersive",
    title: "500 Nocturnes",
    dateLabel: "Samedi 27 Septembre",
    location: "Anneau du Rhin, Colmar",
    description:
      "En partenariat avec le Team Pegasus Racing, vivez en immersion depuis les stands de l'écurie la course des 500 Nocturnes : l'événement sport automobile de l'année en Alsace. Vainqueur de l'épreuve en 2024 en Lamborghini Huracán, le team est la grande force du plateau. Également disponible en offre professionnelle pour vos clients et relations d'affaires.",
    status: "Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-500-nocturnes.jpg",
  },
  {
    slug: "pyrenees",
    category: "Rallye touristique",
    title: "Les Pyrénées",
    dateLabel: "Du Dimanche 4 au Samedi 10 Octobre",
    location: "Pyrénées, France",
    description:
      "Vivez une aventure automobile intense à travers les cols mythiques des Pyrénées, entre panoramas vertigineux et villages de montagne authentiques. Un concentré d'émotions de conduite et de découvertes locales, dans une ambiance conviviale et passionnée pour clôturer l'année !",
    status: "Limité à 20 équipages. Programme à découvrir très bientôt.",
    statusType: "soon",
    image: "/images/poster-pyrenees.jpg",
  },
];

export const statusStyles: Record<StatusType, string> = {
  limited: "border-gold/40 text-gold bg-gold/10",
  soldout: "border-accent/40 text-accent bg-accent/10",
  soon: "border-foreground/20 text-muted bg-foreground/5",
  available: "border-foreground/20 text-muted bg-foreground/5",
};

export const categoryVariant: Record<string, "dark" | "red" | "gold"> = {
  "Rallye touristique": "red",
  "Sortie conviviale": "gold",
  "Expérience atypique": "dark",
  "Journée conviviale": "gold",
  "Expérience immersive": "red",
};
