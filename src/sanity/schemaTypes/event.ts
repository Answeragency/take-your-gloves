import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Événement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "slug",
      title: "URL (slug)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          "Rallye touristique",
          "Sortie conviviale",
          "Expérience atypique",
          "Journée conviviale",
          "Expérience immersive",
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "dateLabel",
      title: "Date (texte affiché)",
      type: "string",
      description: 'Ex : "Vendredi 16 Janvier, en soirée" ou "Du 17 au 19 Avril"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "dateSort",
      title: "Date de tri",
      type: "date",
      description: "Utilisée pour trier les événements par ordre chronologique",
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description courte",
      type: "text",
      rows: 3,
      description: "Affichée sur les cartes et dans les aperçus",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "body",
      title: "Contenu détaillé",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Titre H2", value: "h2" },
            { title: "Titre H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Gras", value: "strong" },
              { title: "Italique", value: "em" },
            ],
          },
        },
      ],
      description: "Contenu riche affiché sur la page détail de l'événement",
    }),
    defineField({
      name: "statusType",
      title: "Statut des places",
      type: "string",
      options: {
        list: [
          { title: "Disponible", value: "available" },
          { title: "Places limitées", value: "limited" },
          { title: "Complet", value: "soldout" },
          { title: "Programme à venir", value: "soon" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "status",
      title: "Label de statut (optionnel)",
      type: "string",
      description: 'Ex : "Dernières places restantes !" ou "Limité à 20 équipages."',
    }),
    defineField({
      name: "image",
      title: "Affiche / Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          description: "Description pour l'accessibilité et le SEO",
        }),
      ],
    }),
    defineField({
      name: "maxParticipants",
      title: "Nombre max de participants",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "dateLabel",
      media: "image",
    },
  },
  orderings: [
    {
      title: "Date (chronologique)",
      name: "dateAsc",
      by: [{ field: "dateSort", direction: "asc" }],
    },
  ],
});
