import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { AddIcon, CalendarIcon, CommentIcon, ImagesIcon } from "@sanity/icons";
import { uuid } from "@sanity/uuid";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const singleton = (S: any, id: string, title: string) =>
  S.listItem().title(title).id(id).child(
    S.document().schemaType(id).documentId(id).title(title)
  );

// Raccourci "➕ Nouveau…" : ouvre directement un document vierge du type
// donné, prêt à remplir (au lieu de passer par la liste puis le bouton +).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const quickCreate = (S: any, schemaType: string, title: string, icon: unknown) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.editor()
        .id(`quick-create-${schemaType}`)
        .schemaType(schemaType)
        .documentId(`drafts.${uuid()}`)
    );

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Take Your Gloves",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            // ── Paramètres globaux ─────────────────────────────────────
            singleton(S, "siteSettings", "⚙️ Paramètres du site"),
            S.divider(),

            // ── Pages ──────────────────────────────────────────────────
            S.listItem().title("📄 Pages").child(
              S.list().title("Pages").items([
                singleton(S, "homePage", "Accueil"),
                singleton(S, "eventsPage", "Événements"),
                singleton(S, "aboutPage", "À propos"),
                singleton(S, "entreprisesPage", "Entreprises"),
                singleton(S, "temoignagesPage", "Témoignages"),
                singleton(S, "contactPage", "Contact"),
              ])
            ),
            S.divider(),

            // ── Ajout rapide ─────────────────────────────────────────────
            quickCreate(S, "event", "➕ Nouvel événement", CalendarIcon),
            quickCreate(S, "testimonial", "➕ Nouveau témoignage", CommentIcon),
            quickCreate(S, "galleryPhoto", "➕ Nouvelle photo galerie", AddIcon),
            S.divider(),

            // ── Contenu dynamique ──────────────────────────────────────
            S.documentTypeListItem("event").title("📅 Événements").icon(CalendarIcon),
            S.documentTypeListItem("testimonial").title("💬 Témoignages").icon(CommentIcon),
            S.documentTypeListItem("galleryPhoto").title("🖼️ Galerie photos").icon(ImagesIcon),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
    media(),
  ],
  schema: { types: schemaTypes },
});
