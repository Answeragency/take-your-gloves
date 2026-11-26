import { defineField, defineType } from "sanity";

export const eventsPageSchema = defineType({
  name: "eventsPage",
  title: "Page Événements",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero, photo de fond",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "introTitle",
      title: "Titre de la page",
      type: "string",
      description: "Laisser vide pour le titre par défaut.",
    }),
    defineField({
      name: "introBody",
      title: "Texte d'introduction (de Cédric)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Paragraphe", value: "normal" },
            { title: "Sous-titre", value: "h2" },
          ],
          lists: [],
        },
      ],
      description: "Laisser vide pour le texte de la saison par défaut.",
    }),
    defineField({
      name: "signatureLine",
      title: "Signature",
      type: "string",
      description: 'Ex : "Cédric Wetta, Créateur d\'émotions automobiles". Laisser vide pour la signature par défaut.',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Événements" }),
  },
});
