import { defineField, defineType } from "sanity";

export const entreprisesPageSchema = defineType({
  name: "entreprisesPage",
  title: "Page Entreprises",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "partnership", title: "Partenariat" },
    { name: "offers", title: "5 formats" },
    { name: "secondary", title: "Team building" },
    { name: "clients", title: "Clients & CTA" },
  ],
  fields: [
    // ── Hero ───────────────────────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero, photo de fond",
      group: "hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero, sous-titre (petite étiquette)",
      group: "hero",
      type: "string",
      initialValue: "Pour les professionnels de l'automobile",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero, titre (partie normale)",
      group: "hero",
      type: "string",
      initialValue: "Des expériences automobiles",
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Hero, titre (partie dorée)",
      group: "hero",
      type: "string",
      initialValue: "à votre nom, à votre image",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero, description",
      group: "hero",
      type: "text",
      rows: 3,
      initialValue: "Concessions, garages, carrossiers, selliers : vos clients partagent la même passion que les nôtres. Take Your Gloves conçoit et organise pour vous des rallyes, journées circuit et stages glace, en marque blanche ou en partenariat visible.",
    }),

    // ── Partenariat (angle principal) ────────────────────────────────────────
    defineField({
      name: "partnershipEyebrow",
      title: "Partenariat, sous-titre",
      group: "partnership",
      type: "string",
      initialValue: "Notre priorité",
    }),
    defineField({
      name: "partnershipHeading",
      title: "Partenariat, titre",
      group: "partnership",
      type: "string",
      initialValue: "Vos clients sont déjà les nôtres",
    }),
    defineField({
      name: "partnershipText",
      title: "Partenariat, texte",
      group: "partnership",
      type: "text",
      rows: 4,
      initialValue: "Vous vendez, entretenez ou personnalisez des voitures de sport. Vos clients cherchent l'occasion de les vivre pleinement. Nous organisons cette expérience à votre place, sous votre nom ou en partenariat affiché : vous renforcez la relation client, nous nous occupons de la logistique, de la sécurité et de l'animation.",
    }),

    // ── 5 formats d'expérience ────────────────────────────────────────────────
    defineField({
      name: "offersEyebrow",
      title: "Formats, sous-titre",
      group: "offers",
      type: "string",
      initialValue: "Ce que nous organisons pour vous",
    }),
    defineField({
      name: "offersHeading",
      title: "Formats, titre",
      group: "offers",
      type: "string",
      initialValue: "5 formats d'expérience",
    }),
    defineField({
      name: "offers",
      title: "Les 5 formats",
      group: "offers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "text", title: "Texte", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
      initialValue: [
        {
          title: "Pilotage & sensations circuit",
          text: "Journées pilotage en GT de sport et baptêmes en véhicules de compétition, pour vivre l'adrénaline en toute sécurité.",
        },
        {
          title: "Road trip & balade routière",
          text: "Itinéraires sur-mesure à travers les plus belles routes d'Alsace et d'Europe, en convoi ou en autonomie encadrée.",
        },
        {
          title: "Journée à l'atelier Pegasus",
          text: "Accueil, visite de l'atelier, animation pit-stop et séance photo. Simulateurs, slot racing et repas traiteur en option.",
        },
        {
          title: "Coulisses des courses",
          text: "Accès paddock, loges privées, repas et services VIP lors des championnats de France et d'Europe. Visites guidées et rencontres pilotes.",
        },
        {
          title: "Stage glace",
          text: "Pilotage encadré sur circuit glace, hors saison, pour repousser les limites d'adhérence en toute sécurité.",
        },
      ],
    }),

    // ── Team building (secondaire) ───────────────────────────────────────────
    defineField({
      name: "secondaryEyebrow",
      title: "Secondaire, sous-titre",
      group: "secondary",
      type: "string",
      initialValue: "Aussi pour vos équipes",
    }),
    defineField({
      name: "secondaryHeading",
      title: "Secondaire, titre",
      group: "secondary",
      type: "string",
      initialValue: "Team building, séminaires et relations d'affaires",
    }),
    defineField({
      name: "secondaryText",
      title: "Secondaire, texte",
      group: "secondary",
      type: "text",
      rows: 3,
      initialValue: "Au-delà de vos clients, ces mêmes formats se prêtent tout autant à la cohésion de vos équipes ou à la fidélisation de vos partenaires d'affaires.",
    }),

    // ── Clients & CTA ──────────────────────────────────────────────────────
    defineField({
      name: "clientsEyebrow",
      title: "Clients, sous-titre",
      group: "clients",
      type: "string",
      initialValue: "Ils nous font confiance",
    }),
    defineField({
      name: "clientsHeading",
      title: "Clients, titre",
      group: "clients",
      type: "string",
      initialValue: "Conçu pour les professionnels de l'automobile et au-delà",
    }),
    defineField({
      name: "clients",
      title: "Types de clients (badges)",
      group: "clients",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Concessions automobiles",
        "Garages & carrossiers",
        "Détailing & sellerie",
        "Constructeurs & importateurs",
        "Comités d'entreprise",
        "Clubs automobiles",
      ],
    }),
    defineField({
      name: "ctaBoxEyebrow",
      title: "CTA, étiquette",
      group: "clients",
      type: "string",
      initialValue: "Devis gratuit & sans engagement",
    }),
    defineField({
      name: "ctaBoxHeading",
      title: "CTA, titre",
      group: "clients",
      type: "string",
      initialValue: "Parlons de votre projet",
    }),
    defineField({
      name: "ctaBoxDescription",
      title: "CTA, description",
      group: "clients",
      type: "text",
      rows: 2,
      initialValue: "Chaque partenariat est unique. Partagez-nous vos objectifs, votre clientèle et vos dates, nous vous proposons une formule sur-mesure sous 48h.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Entreprises" }),
  },
});
