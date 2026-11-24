import { client } from "./client";
import { fixDeep } from "@/lib/copy-fixes";
import { safeImageSrc } from "@/lib/masked-images";

async function fetchFixed<T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: { next?: { revalidate?: number } }
): Promise<T> {
  return fixDeep(await client.fetch<T>(query, params, options));
}
import type { StatusType } from "@/lib/calendar";
import { calendar, displayCategory } from "@/lib/calendar";

function withPoster<T extends { category: string }>(event: T): T {
  return { ...event, category: displayCategory(event.category) };
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
  duration?: string;
  inclusions?: string;
  program?: { _key: string; day?: string; title?: string; text?: string }[];
  gallery?: string[]; // URLs projetées depuis Sanity
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
  filename?: string;
};

export type SanityStat = {
  value: string;
  label: string;
};

// ─── Queries GROQ ─────────────────────────────────────────────────────────────

// Calendrier 2027 : les événements viennent de src/lib/calendar.ts (triés par date),
// pas de Sanity. Les photos de galerie, témoignages et pages restent dans Sanity.
const EVENTS: SanityEvent[] = [...calendar]
  .sort((x, y) => (x.dateSort ?? "").localeCompare(y.dateSort ?? ""))
  .map((e) => withPoster({ ...e, _id: `event-${e.slug}` }));

export async function getAllEvents(): Promise<SanityEvent[]> {
  return EVENTS;
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  return EVENTS.find((e) => e.slug === slug) ?? null;
}

export async function getGalleryByLabel(match: string): Promise<string[]> {
  const rows = await fetchFixed<{ src: string; file?: string }[]>(
    `*[_type == "galleryPhoto" && label match $match]{ "src": image.asset->url, "file": image.asset->originalFilename }`,
    { match },
    { next: { revalidate: 60 } }
  );
  return rows.filter((r) => r.src).map((r) => safeImageSrc(r.file, r.src));
}

export async function getAllEventSlugs(): Promise<string[]> {
  return EVENTS.map((e) => e.slug);
}

export async function getUpcomingEvents(limit = 3): Promise<SanityEvent[]> {
  return EVENTS.slice(0, limit);
}

export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  return fetchFixed(
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
  return fetchFixed(
    `*[_type == "testimonial"] | order(featured desc, order asc)[0...$limit] {
      _id, name, role, quote
    }`,
    { limit },
    { next: { revalidate: 60 } }
  );
}

export async function getAllGalleryPhotos(): Promise<SanityGalleryPhoto[]> {
  return fetchFixed(
    `*[_type == "galleryPhoto"] | order(order asc) {
      _id, label, variant, image,
      "filename": image.asset->originalFilename
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getSiteSettings(): Promise<{
  stats?: SanityStat[];
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
  return fetchFixed(
    `*[_type == "siteSettings"][0]{
      stats, email, phone, location,
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
  return fetchFixed(
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
  return fetchFixed(
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
  introTitle?: string;
  introBody?: unknown[];
  signatureLine?: string;
} | null> {
  return fetchFixed(
    `*[_type == "eventsPage"][0]{
      "heroImageUrl": heroImage.asset->url,
      introTitle, introBody, signatureLine
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getContactPage(): Promise<{
  heading?: string;
  description?: string;
} | null> {
  return fetchFixed(
    `*[_type == "contactPage"][0]{ heading, description }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getEntreprisesPage(): Promise<{
  heroImageUrl?: string;
  heroEyebrow?: string;
  heroHeading?: string;
  heroHeadingAccent?: string;
  heroDescription?: string;
  partnershipEyebrow?: string;
  partnershipHeading?: string;
  partnershipText?: string;
  offersEyebrow?: string;
  offersHeading?: string;
  offers?: { title: string; text: string }[];
  secondaryEyebrow?: string;
  secondaryHeading?: string;
  secondaryText?: string;
  clientsEyebrow?: string;
  clientsHeading?: string;
  clients?: string[];
  ctaBoxEyebrow?: string;
  ctaBoxHeading?: string;
  ctaBoxDescription?: string;
} | null> {
  return fetchFixed(
    `*[_type == "entreprisesPage"][0]{
      "heroImageUrl": heroImage.asset->url,
      heroEyebrow, heroHeading, heroHeadingAccent, heroDescription,
      partnershipEyebrow, partnershipHeading, partnershipText,
      offersEyebrow, offersHeading,
      offers[]{ title, text },
      secondaryEyebrow, secondaryHeading, secondaryText,
      clientsEyebrow, clientsHeading, clients,
      ctaBoxEyebrow, ctaBoxHeading, ctaBoxDescription
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getTemoignagesPage(): Promise<{
  eyebrow?: string;
  heading?: string;
  description?: string;
} | null> {
  return fetchFixed(
    `*[_type == "temoignagesPage"][0]{ eyebrow, heading, description }`,
    {},
    { next: { revalidate: 60 } }
  );
}
