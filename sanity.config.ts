import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const singleton = (S: any, id: string, title: string) =>
  S.listItem().title(title).id(id).child(
    S.document().schemaType(id).documentId(id).title(title)
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

            // ── Contenu dynamique ──────────────────────────────────────
            S.documentTypeListItem("event").title("📅 Événements"),
            S.documentTypeListItem("testimonial").title("💬 Témoignages"),
            S.documentTypeListItem("galleryPhoto").title("🖼️ Galerie photos"),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
    media(),
  ],
  schema: { types: schemaTypes },
});
