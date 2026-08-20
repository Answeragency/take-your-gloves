import { defineField, defineType } from "sanity";

export const temoignagesPageSchema = defineType({
  name: "temoignagesPage",
  title: "Page Témoignages",
  type: "document",
  groups: [
    { name: "hero", title: "En-tête" },
    { name: "press", title: "Section Presse" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "En-tête — Étiquette",
      group: "hero",
      type: "string",
      initialValue: "Témoignages",
    }),
    defineField({
      name: "heading",
      title: "En-tête — Titre",
      group: "hero",
      type: "string",
      initialValue: "La parole à ceux qui ont enfilé leurs gants",
    }),
    defineField({
      name: "description",
      title: "En-tête — Description",
      group: "hero",
      type: "text",
      rows: 3,
      initialValue: "Plus de 800 passionnés nous ont déjà fait confiance pour vivre une expérience automobile unique. Voici ce qu'ils en disent.",
    }),
    defineField({
      name: "pressEyebrow",
      title: "Presse — Étiquette",
      group: "press",
      type: "string",
      initialValue: "Presse",
    }),
    defineField({
      name: "pressHeading",
      title: "Presse — Titre",
      group: "press",
      type: "string",
      initialValue: "Ils parlent de nous",
    }),
    defineField({
      name: "pressItems",
      title: "Articles de presse",
      group: "press",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nom du média", type: "string" }),
            defineField({ name: "note", title: "Citation", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "name" } },
        },
      ],
      initialValue: [
        { name: "DNA — Dernières Nouvelles d'Alsace", note: "« Une communauté de passionnés qui redonne vie aux belles mécaniques. »" },
        { name: "Radio Alsace Auto", note: "« L'un des rendez-vous les plus attendus par les amateurs de sport-auto en région. »" },
        { name: "L'Automobile Magazine", note: "« Take Your Gloves sait créer des événements où la passion est au rendez-vous à chaque virage. »" },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Témoignages" }),
  },
});
