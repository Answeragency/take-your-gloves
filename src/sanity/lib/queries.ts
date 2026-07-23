import { client } from "./client";
import type { StatusType } from "@/lib/calendar";
import { POSTER_MAP } from "@/lib/calendar";

function withPoster<T extends { slug: string; image?: string }>(event: T): T {
  return event.image ? event : { ...event, image: POSTER_MAP[event.slug] };
}

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
  const results = await client.fetch<SanityEvent[]>(
    `*[_type == "event"] | order(dateSort asc) { ${EVENT_FIELDS} }`,
    {},
    { next: { revalidate: 60 } }
  );
  return results.map(withPoster);
}

export async function getEventBySlug(
  slug: string
): Promise<SanityEvent | null> {
  const result = await client.fetch<SanityEvent | null>(
    `*[_type == "event" && slug.current == $slug][0] {
      ${EVENT_FIELDS},
      body,
      maxParticipants,
      "imageRaw": image
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
  return result ? withPoster(result) : null;
}

export async function getAllEventSlugs(): Promise<string[]> {
  const results = await client.fetch<{ slug: string }[]>(
    `*[_type == "event"]{ "slug": slug.current }`,
    {},
    { next: { revalidate: 60 } }
  );
  return results.map((r) => r.slug);
}

export async function getUpcomingEvents(limit = 3): Promise<SanityEvent[]> {
  const results = await client.fetch<SanityEvent[]>(
    `*[_type == "event"] | order(dateSort asc)[0...$limit] { ${EVENT_FIELDS} }`,
    { limit },
    { next: { revalidate: 60 } }
  );
  return results.map(withPoster);
}

export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(featured desc, order asc) {
      _id, name, role, quote
    }`,
    {},
    { next: { revalidate: 60 } }
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
    { next: { revalidate: 60 } }
  );
}

export async function getAllGalleryPhotos(): Promise<SanityGalleryPhoto[]> {
  return client.fetch(
    `*[_type == "galleryPhoto"] | order(order asc) {
      _id, label, variant, image
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getSiteSettings(): Promise<{
  stats?: SanityStat[];
  marqueeItems?: string[];
  email?: string;
  phone?: string;
  location?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  footerTagline?: string;
  footerDescription?: string;
  logoUrl?: string;
  ctaBannerImageUrl?: string;
} | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      stats, marqueeItems, email, phone, location,
      facebookUrl, instagramUrl,
      footerTagline, footerDescription,
      "logoUrl": logo.asset->url,
      "ctaBannerImageUrl": ctaBannerImage.asset->url
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getHomePage(): Promise<{
  heroEyebrow?: string;
  heroLine1?: string;
  heroLine2?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  heroVideoUrl?: string;
  spiritHeading?: string;
  spiritDescription?: string;
  spiritBullets?: string[];
  spiritImageUrls?: string[];
  ctaEyebrow?: string;
  ctaHeading?: string;
  ctaDescription?: string;
} | null> {
  return client.fetch(
    `*[_type == "homePage"][0]{
      heroEyebrow, heroLine1, heroLine2, heroSubtitle,
      "heroImageUrl": heroImage.asset->url,
      "heroVideoUrl": heroVideo.asset->url,
      spiritHeading, spiritDescription, spiritBullets,
      "spiritImageUrls": spiritImages[].asset->url,
      ctaEyebrow, ctaHeading, ctaDescription
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getAboutPage(): Promise<{
  heroImageUrl?: string;
  heroHeading?: string;
  heroDescription?: string;
  missionImageUrl?: string;
  valuesImage1Url?: string;
  valuesImage2Url?: string;
  missionHeading?: string;
  missionParagraphs?: string[];
  values?: { title: string; text: string }[];
} | null> {
  return client.fetch(
    `*[_type == "aboutPage"][0]{
      "heroImageUrl": heroImage.asset->url,
      heroHeading, heroDescription,
      "missionImageUrl": missionImage.asset->url,
      "valuesImage1Url": valuesImage1.asset->url,
      "valuesImage2Url": valuesImage2.asset->url,
      missionHeading, missionParagraphs,
      values[]{ title, text }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getEventsPage(): Promise<{
  heroImageUrl?: string;
  introLetter?: unknown[];
  introNote?: string;
  signature?: string;
} | null> {
  return client.fetch(
    `*[_type == "eventsPage"][0]{
      "heroImageUrl": heroImage.asset->url,
      introLetter, introNote, signature
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getContactPage(): Promise<{
  heading?: string;
  description?: string;
} | null> {
  return client.fetch(
    `*[_type == "contactPage"][0]{ heading, description }`,
    {},
    { next: { revalidate: 60 } }
  );
}
