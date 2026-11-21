/**
 * Corrections de texte validées avec le client (revue du site du 20/11).
 * Elles s'appliquent à l'affichage tant que le texte d'origine est encore dans Sanity :
 * dès que le texte est modifié dans le Studio, la correspondance exacte ne joue plus et
 * la saisie du client prend le dessus. Aucun besoin d'y toucher ensuite.
 */
const FIXES: Record<string, string> = {
  // Nouvelle adresse de contact
  "contact@takeyourgloves.fr": "contact@take-your-gloves.fr",

  // Chiffres cohérents partout : 250
  "+230": "+250",
  "Une communauté de plus de 200 passionnés": "Une communauté de plus de 250 passionnés",

  // Bloc « esprit » : plus de redondance sur l'Alsace, « conviviaux » plutôt que « entre amis »
  "Depuis nos premiers événements entre amis à Strasbourg, Take Your Gloves est devenu une référence incontournable pour les passionnés de voitures de sport en Alsace. Sécurité, convivialité et exigence : chaque événement est pensé pour vous faire vivre le plaisir de conduire dans les meilleures conditions.":
    "Depuis nos premiers événements conviviaux en Alsace, Take Your Gloves est devenu une référence incontournable pour les passionnés de voitures de sport. Sécurité, convivialité et exigence : chaque événement est pensé pour vous faire vivre le plaisir de conduire dans les meilleures conditions.",

  // Slogan du hero : « Prenez le volant, / Vivez la route. » (2 lignes)
  "Prêts à prendre le volant,": "Prenez le volant,",
  "Enfilez vos gants.": "Prenez le volant,",

  // Sous-titre du hero : tout au pluriel, comme dans le bandeau
  "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport.\nRallyes touristiques, expériences atypiques, sortie circuit, journée thématiques.":
    "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport.\nRallyes touristiques, expériences atypiques, sorties circuit, journées thématiques et bien davantage…",

  // Bandeau final
  "Racontez-nous votre projet ou vos envies, rallyes, sortie conviviale, expérience sport automobile, et recevez un retour personnalisé sous 48h.":
    "Racontez-nous votre projet ou vos envies : rallyes, sortie conviviale, expérience sport automobile, et recevez un retour personnalisé.",

  // Bandeau défilant : tout au pluriel
  "Rallye Touristique": "Rallyes Touristiques",
  "Road Trip": "Road Trips",
  "Sortie Conviviale": "Sorties Conviviales",
  "Expérience Atypique": "Expériences Atypiques",
  "Journée Circuit": "Journées Circuit",
  "Roulage sur Glace": "Roulages sur Glace",
  Trackday: "Trackdays",
  "Expérience Immersive": "Expériences Immersives",

  // Page Entreprises : on s'adresse d'abord aux professionnels
  "Concessions, garages, carrossiers, selliers : vos clients partagent la même passion que les nôtres. Take Your Gloves conçoit et organise pour vous des rallyes, journées circuit et stages glace, en marque blanche ou en partenariat visible.":
    "Professionnels de l'automobile (concessions, garages, carrossiers, selliers…), vos clients partagent la même passion que la nôtre. Take Your Gloves conçoit et organise pour vous des événements automobiles et des expériences clients, en marque blanche ou en partenariat visible.",
};

/** Pas de long tiret dans les textes : une virgule à la place. */
const DASH = /\s[—–]\s/g;

/** Plus de promesse de délai « sous 48h » dans les textes. */
const DELAY = / sous 48 ?h(?:eures)?/gi;

/** Faute de français : « le potentiel du plaisir ». */
const POTENTIEL = /potentiel de plaisir/g;

export const fixCopy = (s: string): string => (FIXES[s] ?? s).replace(DASH, ", ").replace(DELAY, "").replace(POTENTIEL, "potentiel du plaisir");

export function fixDeep<T>(value: T): T {
  if (typeof value === "string") return fixCopy(value) as T;
  if (Array.isArray(value)) return value.map(fixDeep) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, fixDeep(v)])
    ) as T;
  }
  return value;
}
