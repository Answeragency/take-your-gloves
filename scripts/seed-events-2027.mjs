/**
 * Publie le calendrier 2027 (src/lib/calendar.ts) dans Sanity, affiches comprises,
 * et supprime les événements qui n'en font plus partie.
 *
 *   NODE_OPTIONS=--use-system-ca node scripts/seed-events-2027.mjs
 *
 * Le jeton SANITY_API_TOKEN est lu dans .env.local (jamais commité).
 */
import { createClient } from "@sanity/client";
import { readFileSync, createReadStream } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf-8")
    .replace(/^﻿/, "")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

// Lit le tableau `calendar` du fichier TypeScript (données pures, sans import).
const src = readFileSync("src/lib/calendar.ts", "utf-8").replace(/\r\n/g, "\n");
const start = src.indexOf("export const calendar: CalendarEvent[] = [");
const end = src.indexOf("\n];\n", start);
const events = new Function(`return ${src.slice(start, end + 3).replace(/^export const calendar: CalendarEvent\[\] = /, "")}`)();

const keep = new Set(events.map((e) => `event-${e.slug}`));

for (const e of events) {
  const file = `public${e.image}`;
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: file.split("/").pop(),
  });
  const { slug, image, ...fields } = e;
  await client.createOrReplace({
    _id: `event-${slug}`,
    _type: "event",
    ...fields,
    slug: { _type: "slug", current: slug },
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: `Affiche ${e.title}, ${e.dateLabel} 2027` },
  });
  console.log("✓", e.title);
}

const old = await client.fetch(`*[_type == "event" && !(_id in $keep)]._id`, { keep: [...keep] });
for (const id of old) {
  await client.delete(id);
  console.log("✗ supprimé", id);
}
console.log(`\n${events.length} événements publiés, ${old.length} ancien(s) supprimé(s).`);
