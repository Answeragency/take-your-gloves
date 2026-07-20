import { defineField, defineType } from "sanity";

export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle / Contexte",
      type: "string",
      description: 'Ex : "Propriétaire Porsche 992" ou "Membre depuis 2022"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "featured",
      title: "Mis en avant",
      type: "boolean",
      description: "Les témoignages mis en avant apparaissent en premier sur la page d'accueil",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
