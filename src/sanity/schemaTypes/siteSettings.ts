import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "Chiffres clés",
      type: "array",
      description: "Affichés dans la bande de statistiques en page d'accueil",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string", description: 'Ex : "58" ou "180+"' }),
            defineField({ name: "label", title: "Label", type: "string", description: 'Ex : "Événements organisés"' }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "marqueeItems",
      title: "Textes du ticker défilant",
      type: "array",
      of: [{ type: "string" }],
      description: 'Ex : "Rallye Touristique", "Roulage sur Glace"',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Paramètres du site" }),
  },
});
