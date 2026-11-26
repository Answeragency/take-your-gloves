import { LEGAL } from "@/lib/legal";
import type { CalendarEvent } from "@/lib/calendar";

/** Données de référence du site pour le référencement (moteurs classiques et IA). */
export const BASE_URL = LEGAL.siteUrl;
export const ORG_ID = `${BASE_URL}/#organization`;
export const SITE_ID = `${BASE_URL}/#website`;

const abs = (url: string) => (url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`);

type OrgInput = { logoUrl: string; phone?: string; facebookUrl?: string; instagramUrl?: string; linkedinUrl?: string };

/** Fiche de l'entreprise : identité, adresse réelle, zone de chalandise, réseaux. Lue par Google et par les IA. */
export function organizationJsonLd({ logoUrl, phone, facebookUrl, instagramUrl, linkedinUrl }: OrgInput) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "SportsOrganization"],
    "@id": ORG_ID,
    name: LEGAL.name,
    legalName: LEGAL.name,
    alternateName: "TYG",
    url: BASE_URL,
    slogan: "Prenez le volant, vivez la route.",
    description:
      "Organisateur de rallyes touristiques, journées conviviales, sorties circuit, road trips et expériences atypiques pour conducteurs de voitures de sport en Alsace et en Europe. Basé près de Strasbourg.",
    logo: abs(logoUrl),
    image: abs("/images/ardennes-chateau-parade.jpg"),
    email: LEGAL.email,
    ...(phone ? { telephone: phone.replace(/[()\s]/g, "") } : {}),
    foundingDate: "2023-02-02",
    founder: { "@type": "Person", name: LEGAL.publicationDirector.name, jobTitle: "Président" },
    taxID: LEGAL.siren.replace(/\s/g, ""),
    vatID: LEGAL.vat,
    address: {
      "@type": "PostalAddress",
      streetAddress: LEGAL.address.street,
      postalCode: LEGAL.address.postalCode,
      addressLocality: LEGAL.address.city,
      addressRegion: "Grand Est",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 48.6953, longitude: 7.6719 },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Alsace" },
      { "@type": "City", name: "Strasbourg" },
      { "@type": "AdministrativeArea", name: "Grand Est" },
      { "@type": "Country", name: "France" },
    ],
    knowsAbout: [
      "rallye touristique",
      "sortie en voiture de sport",
      "road trip automobile",
      "pilotage sur glace",
      "événement automobile pour entreprises",
    ],
    sameAs: [facebookUrl, instagramUrl, linkedinUrl].filter((u): u is string => Boolean(u)),
  };
}

export const webSiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: BASE_URL,
  name: LEGAL.name,
  inLanguage: "fr-FR",
  publisher: { "@id": ORG_ID },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

export type FaqItem = { question: string; answer: string };

export const faqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: { "@type": "Answer", text: q.answer },
  })),
});

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

/** Fiche « Event » : dates de début et de fin, lieu, organisateur. Éligible aux résultats enrichis Google. */
export function eventJsonLd(event: CalendarEvent, duration?: string) {
  const days = Number(duration?.match(/\d+/)?.[0] ?? 1);
  const start = event.dateSort;
  const placeConfirmed = !event.location.toLowerCase().startsWith("lieu");
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    url: `${BASE_URL}/evenements/${event.slug}`,
    image: abs(event.image ?? "/images/ardennes-chateau-parade.jpg"),
    inLanguage: "fr-FR",
    ...(start ? { startDate: start, endDate: addDays(start, Math.max(days, 1) - 1) } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    ...(placeConfirmed
      ? { location: { "@type": "Place", name: event.location, address: { "@type": "PostalAddress", addressLocality: event.location } } }
      : {}),
    organizer: { "@type": "Organization", "@id": ORG_ID, name: LEGAL.name, url: BASE_URL },
  };
}
