import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

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
            // Singleton — paramètres du site
            S.listItem()
              .title("Paramètres du site")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Paramètres du site")
              ),
            S.divider(),
            S.documentTypeListItem("event").title("Événements"),
            S.documentTypeListItem("testimonial").title("Témoignages"),
            S.documentTypeListItem("galleryPhoto").title("Galerie photos"),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
    media(),
  ],
  schema: { types: schemaTypes },
});
