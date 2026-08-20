import { defineField, defineType } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Page d'accueil",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "spirit", title: "Section Spirit" },
    { name: "cta", title: "Bannière CTA" },
  ],
  fields: [
    // ── Hero ───────────────────────────────────────────────────────────────
    defineField({
      name: "heroImage",
      title: "Hero, photo de fond",
      group: "hero",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroVideo",
      title: "Hero, vidéo de fond",
      group: "hero",
      type: "file",
      options: { accept: "video/*" },
      description: "Vidéo jouée en boucle par-dessus la photo de fond (optionnelle).",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero, accroche (petite ligne)",
      group: "hero",
      type: "string",
      initialValue: "Strasbourg · Alsace · Émotions automobiles",
    }),
    defineField({
      name: "heroLine1",
      title: "Hero, titre ligne 1",
      group: "hero",
      type: "string",
      description: "Texte blanc (ex : « Enfilez vos gants. »)",
      initialValue: "Enfilez vos gants.",
    }),
    defineField({
      name: "heroLine2",
      title: "Hero, titre ligne 2",
      group: "hero",
      type: "string",
      description: "Texte doré (ex : « Vivez la route. »)",
      initialValue: "Vivez la route.",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero, sous-titre",
      group: "hero",
      type: "text",
      rows: 3,
      initialValue: "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport. Rallyes touristiques, trackdays, sorties conviviales et expériences atypiques.",
    }),

    // ── Spirit ─────────────────────────────────────────────────────────────
    defineField({
      name: "spiritHeading",
      title: "Spirit, titre",
      group: "spirit",
      type: "string",
      initialValue: "Plus qu'un organisateur d'événements, une communauté de passionnés",
    }),
    defineField({
      name: "spiritDescription",
      title: "Spirit, texte",
      group: "spirit",
      type: "text",
      rows: 4,
      initialValue: "Depuis nos premiers rallyes entre amis à Strasbourg, Take Your Gloves est devenu un rendez-vous incontournable pour les passionnés de voitures de sport en Alsace. Sécurité, convivialité et exigence : chaque événement est pensé pour vous faire vivre le plaisir de conduire dans les meilleures conditions.",
    }),
    defineField({
      name: "spiritImages",
      title: "Spirit, photos (3 max, la 1ère est la grande)",
      group: "spirit",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (R) => R.max(3),
    }),
    defineField({
      name: "spiritBullets",
      title: "Spirit, points clés",
      group: "spirit",
      type: "array",
      of: [{ type: "string" }],
      initialValue: [
        "Encadrement par des pilotes expérimentés",
        "Itinéraires et circuits sélectionnés avec soin",
        "Une communauté de plus de 800 passionnés",
        "Expériences sur-mesure, du débutant au confirmé",
      ],
    }),

    // ── CTA Banner ─────────────────────────────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "CTA, accroche",
      group: "cta",
      type: "string",
      initialValue: "Prêt à enfiler vos gants ?",
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA, titre",
      group: "cta",
      type: "string",
      initialValue: "Parlons de votre prochaine expérience automobile",
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA, description",
      group: "cta",
      type: "text",
      rows: 3,
      initialValue: "Racontez-nous votre projet, rallye, trackday, sortie entre amis ou expérience sur-mesure, et recevez une proposition personnalisée sous 48h.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Page d'accueil" }),
  },
});
