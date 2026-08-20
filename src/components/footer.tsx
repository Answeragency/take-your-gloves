import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/sanity/lib/queries";

const columns = [
  {
    title: "Calendrier 2026",
    links: [
      { href: "/evenements", label: "Tout le calendrier" },
      { href: "/evenements/les-ardennes", label: "Rallye — Les Ardennes" },
      { href: "/evenements/rallye-gourmand", label: "Rallye Gourmand" },
      { href: "/evenements/500-nocturnes", label: "500 Nocturnes" },
    ],
  },
  {
    title: "Take Your Gloves",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/entreprises", label: "Entreprises" },
      { href: "/galerie", label: "Galerie" },
      { href: "/temoignages", label: "Témoignages" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default async function Footer() {
  const settings = await getSiteSettings();

  const email = settings?.email ?? "contact@takeyourgloves.fr";
  const phone = settings?.phone ?? "+33 (0)6 00 00 00 00";
  const location = settings?.location ?? "Strasbourg, France";
  const facebookUrl = settings?.facebookUrl ?? "https://www.facebook.com/TakeYourGlovesEvent/";
  const instagramUrl = settings?.instagramUrl ?? "#";
  const tagline = settings?.footerTagline ?? "Conduisez avec passion, roulez en sécurité.";
  const description = settings?.footerDescription ?? "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport. Basé à Strasbourg.";

  return (
    <footer className="relative border-t border-line bg-surface">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src={settings?.logoUrl ?? "/images/logo.png"}
                alt="Take Your Gloves"
                width={140}
                height={52}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {description}
            </p>
            <div className="mt-6 flex gap-5">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-foreground/75 transition-all hover:border-accent/50 hover:text-accent"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-foreground/75 transition-all hover:border-accent/50 hover:text-accent"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-xs uppercase tracking-[0.2em] text-foreground/70">
                {col.title}
              </h4>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.2em] text-foreground/70">
              Contact
            </h4>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-muted">
              <li>{location}</li>
              <li>
                <a href={`mailto:${email}`} className="transition-colors hover:text-foreground">
                  {email}
                </a>
              </li>
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="transition-colors hover:text-foreground">
                  {phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Take Your Gloves. Tous droits réservés.</p>
          <p className="text-muted">{tagline}</p>
        </div>
      </div>
    </footer>
  );
}
