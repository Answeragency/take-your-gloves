import { defineField, defineType } from "sanity";

export const galleryPhotoSchema = defineType({
  name: "galleryPhoto",
  title: "Photo galerie",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "label",
      title: "Légende",
      type: "string",
      description: 'Ex : "Convoi devant le château, Les Ardennes"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: "variant",
      title: "Teinte de l'overlay",
      type: "string",
      options: {
        list: [
          { title: "Sombre (neutre)", value: "dark" },
          { title: "Rouge (sport)", value: "red" },
          { title: "Or / Cuivre", value: "gold" },
        ],
        layout: "radio",
      },
      initialValue: "dark",
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: "label", media: "image" },
  },
});
