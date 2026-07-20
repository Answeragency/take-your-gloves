import { client } from "./client";
import type { StatusType } from "@/lib/calendar";

// ─── Types retournés par Sanity ───────────────────────────────────────────────

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  alt?: string;
};

export type SanityEvent = {
  _id: string;
  slug: string;
  category: string;
  title: string;
  dateLabel: string;
  dateSort?: string;
  location: string;
  description: string;
  body?: unknown[]; // Portable Text blocks
  status?: string;
  statusType: StatusType;
  image?: string; // URL string projetée depuis Sanity
  imageRaw?: SanityImage; // objet complet pour urlFor() (page détail)
  maxParticipants?: number;
};

export type SanityTestimonial = {
  _id: string;
  name: string;
  role: string;
  quote: string;
};

export type SanityGalleryPhoto = {
  _id: string;
  label: string;
  variant: "dark" | "red" | "gold";
  image: SanityImage;
};

export type SanityStat = {
  value: string;
  label: string;
};

// ─── Queries GROQ ─────────────────────────────────────────────────────────────

const EVENT_FIELDS = `
  _id,
  "slug": slug.current,
  category,
  title,
  dateLabel,
  dateSort,
  location,
  description,
  status,
  statusType,
  "image": image.asset->url
`;

export async function getAllEvents(): Promise<SanityEvent[]> {
  return client.fetch(
    `*[_type == "event"] | order(dateSort asc) { ${EVENT_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getEventBySlug(
  slug: string
): Promise<SanityEvent | null> {
  return client.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      ${EVENT_FIELDS},
      body,
      maxParticipants,
      "imageRaw": image
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getAllEventSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "event"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 3600 } }
  );
  return results.map((r) => r.slug);
}

export async function getUpcomingEvents(limit = 3): Promise<SanityEvent[]> {
  return client.fetch(
    `*[_type == "event"] | order(dateSort asc)[0...$limit] { ${EVENT_FIELDS} }`,
    { limit },
    { next: { revalidate: 60 } }
  );
}

export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(featured desc, order asc) {
      _id, name, role, quote
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export async function getFeaturedTestimonials(
  limit = 4
): Promise<SanityTestimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(featured desc, order asc)[0...$limit] {
      _id, name, role, quote
    }`,
    { limit },
    { next: { revalidate: 3600 } }
  );
}

export async function getAllGalleryPhotos(): Promise<SanityGalleryPhoto[]> {
  return client.fetch(
    `*[_type == "galleryPhoto"] | order(order asc) {
      _id, label, variant, image
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export async function getSiteSettings(): Promise<{
  stats?: SanityStat[];
} | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{ stats }`,
    {},
    { next: { revalidate: 3600 } }
  );
}
