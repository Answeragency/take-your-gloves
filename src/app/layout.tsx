import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import LenisProvider from "@/components/lenis-provider";
import Preloader from "@/components/preloader";
import ScrollProgress from "@/components/scroll-progress";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://take-your-gloves.vercel.app"),
  title: "Take Your Gloves | Émotions automobiles",
  description:
    "Rallyes touristiques, trackdays et sorties conviviales en voiture de sport. Take Your Gloves vous fait (re)découvrir le plaisir de conduire, en Alsace et Grand Est.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Take Your Gloves | Émotions automobiles",
    description:
      "Rallyes touristiques, trackdays et sorties conviviales en voiture de sport. Vivez le plaisir de conduire en Alsace.",
    url: "https://take-your-gloves.vercel.app",
    siteName: "Take Your Gloves",
    images: [
      {
        url: "/images/ardennes-chateau-parade.jpg",
        width: 1200,
        height: 630,
        alt: "Take Your Gloves — Émotions automobiles en Alsace",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <LenisProvider>
          <Preloader />
          <ScrollProgress />
          <div className="noise-overlay" />
          <Cursor />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
