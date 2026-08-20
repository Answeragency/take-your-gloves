import { defineField, defineType } from "sanity";

export const entreprisesPageSchema = defineType({
  name: "entreprisesPage",
  title: "Page Entreprises",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "advantages", title: "Avantages" },
    { name: "clients", title: "Clients & CTA" },
  ],
  fields: [
    // ── Hero ───────────────────────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero — Photo de fond",
      group: "hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero — Sous-titre (petite étiquette)",
      group: "hero",
      type: "string",
      initialValue: "Pour les professionnels",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero — Titre (partie normale)",
      group: "hero",
      type: "string",
      initialValue: "L'émotion automobile",
    }),
    defineField({
      name: "heroHeadingAccent",
      title: "Hero — Titre (partie dorée)",
      group: "hero",
      type: "string",
      initialValue: "au service de votre marque",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero — Description",
      group: "hero",
      type: "text",
      rows: 3,
      initialValue: "Concessions, constructeurs, agences : Take Your Gloves conçoit des expériences automobiles sur-mesure qui marquent vos clients, fédèrent vos équipes et renforcent votre image.",
    }),

    // ── Avantages ──────────────────────────────────────────────────────────
    defineField({
      name: "advantagesEyebrow",
      title: "Avantages — Sous-titre",
      group: "advantages",
      type: "string",
      initialValue: "Pourquoi nous choisir",
    }),
    defineField({
      name: "advantagesHeading",
      title: "Avantages — Titre",
      group: "advantages",
      type: "string",
      initialValue: "L'excellence opérationnelle, l'émotion en prime",
    }),
    defineField({
      name: "advantagesDescription",
      title: "Avantages — Description",
      group: "advantages",
      type: "text",
      rows: 3,
      initialValue: "Nous ne sommes pas une agence généraliste. Take Your Gloves est né de la passion automobile — chaque événement que nous organisons, nous le vivons nous-mêmes. Cette authenticité se ressent à chaque virage.",
    }),
    defineField({
      name: "advantages",
      title: "Les 4 avantages",
      group: "advantages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "icon", title: "Emoji / Icône", type: "string" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "text", title: "Texte", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        },
      ],
      initialValue: [
        { icon: "🏁", title: "Expertise terrain", text: "Plus de 5 ans d'organisation d'événements automobiles. Nos pilotes et coordinateurs connaissent chaque route, chaque circuit." },
        { icon: "🛡️", title: "Sécurité certifiée", text: "Protocoles sécurité professionnels, briefings obligatoires, encadrement par des pilotes expérimentés. Zéro incident depuis la création." },
        { icon: "📍", title: "Logistique complète", text: "Roadbooks, assistance mobile, partenaires hôteliers et restaurateurs sélectionnés. Vous vous concentrez sur vos invités, on gère le reste." },
        { icon: "✦", title: "Sur-mesure total", text: "Chaque événement est conçu selon vos objectifs, votre budget et votre image de marque. Aucune formule standard, chaque detail compte." },
      ],
    }),

    // ── Clients & CTA ──────────────────────────────────────────────────────
    defineField({
      name: "clientsEyebrow",
      title: "Clients — Sous-titre",
      group: "clients",
      type: "string",
      initialValue: "Ils nous font confiance",
    }),
    defineField({
      name: "clientsHeading",
      title: "Clients — Titre",
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
        "Constructeurs & importateurs",
        "Agences événementielles",
        "Comités d'entreprise",
        "Clubs automobiles & associations",
        "Marques de prestige",
      ],
    }),
    defineField({
      name: "ctaBoxEyebrow",
      title: "CTA — Étiquette",
      group: "clients",
      type: "string",
      initialValue: "Devis gratuit & sans engagement",
    }),
    defineField({
      name: "ctaBoxHeading",
      title: "CTA — Titre",
      group: "clients",
      type: "string",
      initialValue: "Parlons de votre projet",
    }),
    defineField({
      name: "ctaBoxDescription",
      title: "CTA — Description",
      group: "clients",
      type: "text",
      rows: 2,
      initialValue: "Chaque événement est unique. Partagez-nous vos objectifs, votre budget et vos dates — nous vous proposons une formule sur-mesure sous 48h.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Entreprises" }),
  },
});
