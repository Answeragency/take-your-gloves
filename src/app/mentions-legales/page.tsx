import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import ProtectedEmail from "@/components/protected-email";
import { reverse } from "@/lib/reverse";
import { formatPhone } from "@/lib/phone";
import { getSiteSettings } from "@/sanity/lib/queries";
import { LEGAL, fullAddress } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Take Your Gloves : éditeur, hébergeur, propriété intellectuelle et responsabilité.",
  alternates: { canonical: `${LEGAL.siteUrl}/mentions-legales` },
  robots: { index: true, follow: true },
};

const h2 = "mt-12 font-display text-2xl tracking-tight text-foreground";
const p = "mt-4 text-base leading-relaxed text-foreground/80";
const dt = "text-xs uppercase tracking-[0.15em] text-muted";
const dd = "mt-1 text-base text-foreground/90";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-4 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-6">
      <dt className={dt}>{label}</dt>
      <dd className={dd}>{children}</dd>
    </div>
  );
}

export default async function MentionsLegalesPage() {
  // Même email et même téléphone que le reste du site (modifiables dans Sanity).
  const settings = await getSiteSettings();
  const email = settings?.email ?? LEGAL.email;
  const phone = settings?.phone ?? LEGAL.phone;

  return (
    <section className="pt-28 pb-16 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Informations légales</p>
          <h1 className="text-balance mt-4 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Mentions légales
          </h1>
          <p className="mt-5 text-sm text-muted">Dernière mise à jour : {LEGAL.updatedOn}</p>
        </Reveal>

        <h2 className={h2}>Éditeur du site</h2>
        <dl className="mt-4 border-t border-line">
          <Row label="Dénomination">{LEGAL.name}</Row>
          <Row label="Forme juridique">{LEGAL.legalForm}</Row>
          {LEGAL.capital && <Row label="Capital social">{LEGAL.capital}</Row>}
          <Row label="Siège social">{fullAddress()}</Row>
          <Row label="Immatriculation">
            SIREN {LEGAL.siren}, RCS {LEGAL.rcsCity}
            <br />
            SIRET {LEGAL.siret}
          </Row>
          {LEGAL.vat && <Row label="TVA intracommunautaire">{LEGAL.vat}</Row>}
          <Row label="Activité (NAF)">{LEGAL.naf}</Row>
          <Row label="Email">
            <ProtectedEmail reversed={reverse(email)} className="underline decoration-line underline-offset-4 hover:text-accent" />
          </Row>
          {phone && (
            <Row label="Téléphone">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-accent">
                {formatPhone(phone)}
              </a>
            </Row>
          )}
          <Row label="Directeur de la publication">
            {LEGAL.publicationDirector.name}, {LEGAL.publicationDirector.role}
          </Row>
          <Row label="Assurance">Responsabilité civile professionnelle souscrite auprès d&apos;{LEGAL.insurer}</Row>
        </dl>

        <h2 className={h2}>Hébergement</h2>
        <p className={p}>
          Le site est hébergé par <strong className="text-foreground">{LEGAL.host.name}</strong>, {LEGAL.host.address}.{" "}
          <a href={LEGAL.host.website} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-accent">
            vercel.com
          </a>
        </p>

        <h2 className={h2}>Propriété intellectuelle</h2>
        <p className={p}>
          L&apos;ensemble des contenus du site (textes, photographies, vidéos, logos, affiches, graphismes, marques)
          est la propriété de {LEGAL.name} ou de ses partenaires et photographes, et est protégé par le Code de la
          propriété intellectuelle. Toute reproduction, représentation, modification ou diffusion, totale ou partielle,
          sans autorisation écrite préalable est interdite.
        </p>
        <p className={p}>
          Les marques et logos de nos partenaires (Pegasus Racing, Automobile Club du Rhin, etc.) appartiennent à leurs
          propriétaires respectifs et sont utilisés avec leur accord.
        </p>

        <h2 className={h2}>Responsabilité</h2>
        <p className={p}>
          Nous nous efforçons de fournir des informations exactes et à jour. Les dates, lieux, programmes et tarifs des
          événements peuvent évoluer ; seule la confirmation écrite de {LEGAL.name} fait foi. Nous ne pouvons être tenus
          responsables d&apos;une erreur, d&apos;une omission ou d&apos;une indisponibilité temporaire du site.
        </p>
        <p className={p}>
          Le site peut contenir des liens vers des sites tiers (réseaux sociaux, partenaires). {LEGAL.name} n&apos;exerce
          aucun contrôle sur leur contenu et décline toute responsabilité à ce titre.
        </p>

        <h2 className={h2}>Données personnelles</h2>
        <p className={p}>
          Les informations transmises via les formulaires du site sont traitées conformément à notre{" "}
          <Link href="/confidentialite" className="underline decoration-line underline-offset-4 hover:text-accent">
            politique de confidentialité
          </Link>
          , qui détaille vos droits (accès, rectification, suppression) et la manière de les exercer.
        </p>

        <h2 className={h2}>Droit applicable</h2>
        <p className={p}>
          Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, et à défaut de
          résolution amiable, les tribunaux français sont seuls compétents.
        </p>
      </div>
    </section>
  );
}
