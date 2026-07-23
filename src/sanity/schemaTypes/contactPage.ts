import { defineField, defineType } from "sanity";

export const contactPageSchema = defineType({
  name: "contactPage",
  title: "Page Contact",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Titre",
      type: "string",
      initialValue: "Construisons votre prochaine sortie",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      initialValue: "Que ce soit pour un rallye touristique, une journée trackday, une sortie entre amis ou une expérience sur-mesure, parlez-nous de votre projet. Nous vous répondons avec une proposition personnalisée sous 48h.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Contact" }),
  },
});
