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
      name: "introLetter",
      title: "Lettre d'introduction (de Cédric)",
      type: "array",
      of: [{ type: "block" }],
      description: "Le texte d'intro affiché en haut de la page calendrier.",
      initialValue: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Merci pour cette incroyable saison 2025 que nous avons vécue ensemble ! Des virages de Corse aux sommets des Alpes, sans oublier les routes sinueuses de notre massif des Vosges : les souvenirs indélébiles marqués par votre bonne humeur et votre passion ne manquent pas !" }],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [{ _type: "span", text: "Je vous remercie chaleureusement de faire partie de cette aventure et vous souhaite une merveilleuse année 2026, qui sera, je l'espère, pleine d'émotions automobiles !" }],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [{ _type: "span", text: "Pour la prochaine saison, j'ai voulu placer la barre encore plus haut et vous ai préparé un programme varié et conçu pour pleinement profiter de ces expériences au volant de vos autos." }],
          markDefs: [],
          style: "normal",
        },
        {
          _type: "block",
          children: [{ _type: "span", text: "Attachez votre ceinture et découvrez plus bas l'ensemble des événements qui vous attendent tout au long de l'année !" }],
          markDefs: [],
          style: "normal",
        },
      ],
    }),
    defineField({
      name: "introNote",
      title: "Note de bas d'intro",
      type: "string",
      initialValue: "N'hésitez pas à me faire part des dates qui peuvent vous intéresser, sans engagement définitif, afin de vous pré-réserver des places.",
    }),
    defineField({
      name: "signature",
      title: "Signature",
      type: "string",
      initialValue: "Cédric Wetta",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page Événements" }),
  },
});
