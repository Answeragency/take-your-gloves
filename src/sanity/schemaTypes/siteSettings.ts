import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  groups: [
    { name: "general", title: "Général" },
    { name: "media", title: "Logo & Images" },
    { name: "contact", title: "Contact & Réseaux" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ── Logo & images partagées ────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo",
      group: "media",
      type: "image",
      description: "Affiché dans le menu, le footer et l'écran de chargement.",
    }),
    defineField({
      name: "ctaBannerImage",
      title: "Photo de fond — Bannière « Nous contacter »",
      group: "media",
      type: "image",
      options: { hotspot: true },
      description: "Photo de fond utilisée derrière la bannière d'appel à l'action, sur toutes les pages.",
    }),

    // ── Chiffres & marquee ─────────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Chiffres clés",
      group: "general",
      type: "array",
      description: "Affichés dans la bande de statistiques",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string", description: 'Ex : "58" ou "180+"' }),
            defineField({ name: "label", title: "Label", type: "string", description: 'Ex : "Événements organisés"' }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "marqueeItems",
      title: "Textes du ticker défilant",
      group: "general",
      type: "array",
      of: [{ type: "string" }],
      description: 'Ex : "Rallye Touristique", "Roulage sur Glace"',
    }),

    // ── Contact ────────────────────────────────────────────────────────────
    defineField({
      name: "email",
      title: "Email",
      group: "contact",
      type: "string",
      initialValue: "contact@takeyourgloves.fr",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      group: "contact",
      type: "string",
      initialValue: "+33 (0)6 00 00 00 00",
    }),
    defineField({
      name: "location",
      title: "Localisation",
      group: "contact",
      type: "string",
      initialValue: "Strasbourg, France",
    }),
    defineField({
      name: "facebookUrl",
      title: "URL Facebook",
      group: "contact",
      type: "url",
      initialValue: "https://www.facebook.com/TakeYourGlovesEvent/",
    }),
    defineField({
      name: "instagramUrl",
      title: "URL Instagram",
      group: "contact",
      type: "url",
    }),

    // ── Footer ─────────────────────────────────────────────────────────────
    defineField({
      name: "footerTagline",
      title: "Tagline footer",
      group: "footer",
      type: "string",
      initialValue: "Conduisez avec passion, roulez en sécurité.",
    }),
    defineField({
      name: "footerDescription",
      title: "Description footer",
      group: "footer",
      type: "text",
      rows: 3,
      initialValue: "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport. Basé à Strasbourg.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Paramètres du site" }),
  },
});
