import { defineField, defineType } from "sanity";

export const temoignagesPageSchema = defineType({
  name: "temoignagesPage",
  title: "Page Témoignages",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "En-tête — Étiquette",
      type: "string",
      initialValue: "Témoignages",
    }),
    defineField({
      name: "heading",
      title: "En-tête — Titre",
      type: "string",
      initialValue: "La parole à ceux qui ont enfilé leurs gants",
    }),
    defineField({
      name: "description",
      title: "En-tête — Description",
      type: "text",
      rows: 3,
      initialValue: "Plus de 800 passionnés nous ont déjà fait confiance pour vivre une expérience automobile unique. Voici ce qu'ils en disent.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Témoignages" }),
  },
});
