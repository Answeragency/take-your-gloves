import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import ProtectedEmail from "@/components/protected-email";
import { reverse } from "@/lib/reverse";
import { getSiteSettings } from "@/sanity/lib/queries";
import { LEGAL, fullAddress } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Comment Take Your Gloves collecte, utilise et protège vos données personnelles, et comment exercer vos droits.",
  alternates: { canonical: `${LEGAL.siteUrl}/confidentialite` },
  robots: { index: true, follow: true },
};

/** Durée de conservation des demandes de contact. */
const RETENTION = "3 ans";

const h2 = "mt-12 font-display text-2xl tracking-tight text-foreground";
const p = "mt-4 text-base leading-relaxed text-foreground/80";
const ul = "mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-foreground/80 marker:text-accent";
const link = "underline decoration-line underline-offset-4 hover:text-accent";

export default async function ConfidentialitePage() {
  const settings = await getSiteSettings();
  const email = settings?.email ?? LEGAL.email;

  return (
    <section className="pt-28 pb-16 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Vos données</p>
          <h1 className="text-balance mt-4 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Politique de confidentialité
          </h1>
          <p className="mt-5 text-sm text-muted">Dernière mise à jour : {LEGAL.updatedOn}</p>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            Nous collectons le strict minimum pour répondre à vos demandes. Cette page explique quelles données nous
            recueillons, pourquoi, combien de temps nous les gardons et comment exercer vos droits.
          </p>
        </Reveal>

        <h2 className={h2}>Qui est responsable de vos données ?</h2>
        <p className={p}>
          {LEGAL.name}, {LEGAL.legalForm}, {fullAddress()} (SIREN {LEGAL.siren}). Contact :{" "}
          <ProtectedEmail reversed={reverse(email)} className={link} />.
        </p>

        <h2 className={h2}>Quelles données collectons-nous ?</h2>
        <p className={p}>Uniquement celles que vous nous envoyez volontairement via les formulaires du site :</p>
        <ul className={ul}>
          <li>
            <strong className="text-foreground">Formulaire de contact</strong> : prénom et nom, email, téléphone
            (facultatif), type d’événement et message.
          </li>
          <li>
            <strong className="text-foreground">Formulaire « Recevoir les infos »</strong> d’un événement : nom,
            email ou téléphone.
          </li>
        </ul>
        <p className={p}>
          Aucune donnée sensible n’est demandée. Nous vous invitons à ne pas en mentionner dans le champ message.
        </p>

        <h2 className={h2}>Pourquoi, et sur quelle base légale ?</h2>
        <ul className={ul}>
          <li>
            Répondre à votre demande et vous recontacter, ou vous envoyer le programme d’un événement : sur votre
            demande, avec votre consentement.
          </li>
          <li>Organiser votre participation à un événement si vous vous inscrivez : exécution de mesures précontractuelles ou du contrat.</li>
          <li>Assurer la sécurité du site et prévenir le spam : intérêt légitime.</li>
        </ul>
        <p className={p}>Vos données ne sont ni vendues, ni louées, ni utilisées pour de la publicité ciblée.</p>

        <h2 className={h2}>Qui y a accès ?</h2>
        <p className={p}>L’équipe de {LEGAL.name}, ainsi que les prestataires techniques strictement nécessaires :</p>
        <ul className={ul}>
          <li>
            <strong className="text-foreground">Vercel</strong> (hébergement du site) ;
          </li>
          <li>
            <strong className="text-foreground">Resend</strong> (envoi par email des demandes que vous nous adressez) ;
          </li>
          <li>
            <strong className="text-foreground">o2switch</strong> (nom de domaine et messagerie : réception des emails que
            vous nous envoyez) ;
          </li>
          <li>
            <strong className="text-foreground">Sanity</strong> (gestion des contenus du site : événements, photos,
            textes). Vos messages n’y sont pas stockés.
          </li>
        </ul>
        <p className={p}>
          Certains de ces prestataires peuvent traiter des données en dehors de l’Union européenne, notamment aux
          États-Unis, dans le cadre de garanties reconnues (clauses contractuelles types de la Commission européenne ou
          cadre de protection des données UE-États-Unis).
        </p>

        <h2 className={h2}>Combien de temps les gardons-nous ?</h2>
        <p className={p}>
          Les demandes de contact sont conservées {RETENTION} à compter de notre dernier échange, puis supprimées. Vous
          pouvez demander leur suppression à tout moment.
        </p>

        <h2 className={h2}>Cookies et suivi</h2>
        <p className={p}>
          Ce site ne dépose aucun cookie de mesure d’audience, de publicité ou de suivi, et n’utilise aucun
          outil d’analyse tiers : il n’y a donc pas de bandeau de consentement. Les polices de caractères sont
          servies depuis notre propre site. Les liens vers Facebook et Instagram vous mènent vers des services tiers qui
          ont leur propre politique de confidentialité.
        </p>

        <h2 className={h2}>Vos droits</h2>
        <p className={p}>
          Vous pouvez à tout moment demander l’accès à vos données, leur rectification, leur effacement, la
          limitation de leur traitement, vous y opposer, ou récupérer vos données dans un format réutilisable. Il suffit
          de nous écrire à <ProtectedEmail reversed={reverse(email)} className={link} />, nous répondons dans un délai
          d’un mois. Une pièce d’identité pourra être demandée en cas de doute.
        </p>
        <p className={p}>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez déposer une réclamation auprès de la CNIL :{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer" className={link}>
            cnil.fr
          </a>
          .
        </p>

        <p className="mt-12 text-sm text-muted">
          Voir aussi nos{" "}
          <Link href="/mentions-legales" className={link}>
            mentions légales
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
