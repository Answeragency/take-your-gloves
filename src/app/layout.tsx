import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import LenisProvider from "@/components/lenis-provider";
import Preloader from "@/components/preloader";
import ScrollProgress from "@/components/scroll-progress";
import { getSiteSettings } from "@/sanity/lib/queries";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const BASE_URL = "https://take-your-gloves.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Take Your Gloves | Rallyes & Événements Automobiles en Alsace",
    template: "%s | Take Your Gloves",
  },
  description:
    "Organisateur de rallyes touristiques, trackdays et sorties en voiture de sport en Alsace et Grand Est. Rejoignez une communauté de plus de 800 passionnés automobiles. Strasbourg.",
  keywords: [
    "rallye touristique Alsace",
    "trackday Alsace",
    "sortie voiture de sport",
    "événement automobile Strasbourg",
    "Take Your Gloves",
    "roulage sur glace",
    "road trip automobile",
    "communauté automobile Alsace",
    "voiture de sport Grand Est",
    "rallye Strasbourg",
  ],
  authors: [{ name: "Take Your Gloves" }],
  creator: "Take Your Gloves",
  publisher: "Take Your Gloves",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Take Your Gloves",
    title: "Take Your Gloves | Rallyes & Événements Automobiles en Alsace",
    description:
      "Rallyes touristiques, trackdays et sorties conviviales en voiture de sport. Vivez le plaisir de conduire en Alsace et Grand Est.",
    images: [
      {
        url: "/images/ardennes-chateau-parade.jpg",
        width: 1200,
        height: 630,
        alt: "Take Your Gloves — Événements automobiles en Alsace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Take Your Gloves | Rallyes & Événements Automobiles en Alsace",
    description:
      "Rallyes touristiques, trackdays et sorties conviviales en voiture de sport en Alsace.",
    images: ["/images/ardennes-chateau-parade.jpg"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  name: "Take Your Gloves",
  description:
    "Organisateur de rallyes touristiques, trackdays et sorties en voiture de sport en Alsace et Grand Est.",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  image: `${BASE_URL}/images/ardennes-chateau-parade.jpg`,
  telephone: "+33600000000",
  email: "contact@takeyourgloves.fr",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Strasbourg",
    addressRegion: "Alsace",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 48.5734,
    longitude: 7.7521,
  },
  areaServed: {
    "@type": "GeoRegion",
    name: "Alsace, Grand Est, France",
  },
  sameAs: [
    "https://www.facebook.com/TakeYourGlovesEvent/",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const logoUrl = settings?.logoUrl ?? "/images/logo.png";

  return (
    <html lang="fr" className={`${geist.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LenisProvider>
          <Preloader logoUrl={logoUrl} />
          <ScrollProgress />
          <div className="noise-overlay" />
          <Cursor />
          <Nav logoUrl={logoUrl} />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
