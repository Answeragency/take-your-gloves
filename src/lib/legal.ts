/**
 * Informations légales de l'éditeur, utilisées par les mentions légales (et la politique de confidentialité).
 * Source : registre national des entreprises (SIREN 948 879 226), vérifié le 25/11/2026.
 *
 * Les champs `undefined` ne s'affichent pas : à compléter dès qu'ils sont connus
 * (capital, TVA, téléphone), la page se met à jour toute seule.
 */
export const LEGAL = {
  name: "Take Your Gloves",
  legalForm: "Société par actions simplifiée (SAS)",
  /** Capital social, ex : "1 000 €". À compléter (mention obligatoire pour une SAS). */
  capital: undefined as string | undefined,
  siren: "948 879 226",
  siret: "948 879 226 00017",
  /** Greffe d'immatriculation (Bas-Rhin : Strasbourg). */
  rcsCity: "Strasbourg",
  /** N° de TVA intracommunautaire, ex : "FR30948879226". À confirmer avant publication. */
  vat: undefined as string | undefined,
  createdOn: "2 février 2023",
  naf: "93.29Z, Autres activités récréatives et de loisirs",
  address: { street: "7 rue de Berstett", postalCode: "67170", city: "Olwisheim", country: "France" },
  /** Email affiché (anti-spam : écrit à l'envers côté page). */
  email: "contact@take-your-gloves.fr",
  phone: undefined as string | undefined,
  insurer: "Allianz",
  publicationDirector: { name: "Cédric Wetta", role: "Président" },
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    website: "https://vercel.com",
  },
  siteUrl: "https://take-your-gloves.vercel.app",
  updatedOn: "25 novembre 2026",
} as const;

export const fullAddress = () =>
  `${LEGAL.address.street}, ${LEGAL.address.postalCode} ${LEGAL.address.city}, ${LEGAL.address.country}`;
