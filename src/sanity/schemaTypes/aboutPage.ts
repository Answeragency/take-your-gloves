import { defineField, defineType } from "sanity";

export const aboutPageSchema = defineType({
  name: "aboutPage",
  title: "Page À propos",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "mission", title: "Mission" },
    { name: "values", title: "Valeurs" },
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
      name: "heroHeading",
      title: "Hero — Titre",
      group: "hero",
      type: "string",
      initialValue: "Né d'une passion partagée à Strasbourg",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero — Description",
      group: "hero",
      type: "text",
      rows: 3,
      initialValue: "Take Your Gloves est parti d'un constat simple : conduire sa voiture de sport au quotidien ne suffit pas à en révéler tout le potentiel — ni tout le plaisir. Nous avons créé les rendez-vous qui nous manquaient.",
    }),

    // ── Mission ────────────────────────────────────────────────────────────
    defineField({
      name: "missionImage",
      title: "Mission — Photo (grande, en haut du bloc)",
      group: "mission",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "missionHeading",
      title: "Mission — Titre",
      group: "mission",
      type: "string",
      initialValue: "Faire (re)découvrir le plaisir de conduire",
    }),
    defineField({
      name: "missionParagraphs",
      title: "Mission — Paragraphes",
      group: "mission",
      type: "array",
      of: [{ type: "text" }],
      initialValue: [
        "Trop de voitures de sport et de GT dorment dans les garages, réservées aux beaux jours et aux trajets sans relief. Take Your Gloves est né pour leur redonner leur usage premier : le plaisir de conduire.",
        "Depuis nos premiers rassemblements informels entre amis à Strasbourg, nous avons structuré une véritable offre d'événements — rallyes touristiques, trackdays, sorties conviviales et expériences atypiques — pour répondre à toutes les envies, du conducteur occasionnel au pilote confirmé.",
        "Aujourd'hui, c'est une communauté de plus de 800 passionnés qui se retrouve régulièrement autour de nos événements, en Alsace et au-delà.",
      ],
    }),

    // ── Values ─────────────────────────────────────────────────────────────
    defineField({
      name: "valuesImage1",
      title: "Mission — Petite photo 1 (à côté de missionImage)",
      group: "mission",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "valuesImage2",
      title: "Mission — Petite photo 2 (à côté de missionImage)",
      group: "mission",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "values",
      title: "Nos valeurs",
      group: "values",
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
          title: "Sécurité avant tout",
          text: "Chaque événement est encadré par des pilotes expérimentés, avec des briefings sécurité systématiques et des groupes adaptés au niveau de chacun.",
        },
        {
          title: "Exigence dans l'organisation",
          text: "Roadbooks soignés, itinéraires repérés en amont, partenariats circuits sélectionnés : rien n'est laissé au hasard pour que vous profitiez pleinement.",
        },
        {
          title: "Convivialité avant la performance",
          text: "Take Your Gloves n'est pas une compétition. C'est une communauté de passionnés qui se retrouvent pour partager une passion commune.",
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page À propos" }),
  },
});
