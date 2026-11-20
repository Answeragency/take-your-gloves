/**
 * Photos dont les plaques d'immatriculation ont été floutées.
 * Les originaux restent dans Sanity : pour ces fichiers, le site affiche la copie floutée
 * (public/images/<nom>.jpg) à la place de l'URL Sanity. Toute nouvelle photo avec une plaque
 * lisible doit être floutée avant d'être ajoutée au Studio.
 */
const MASKED = new Set([
  "amg-gtr-foret",
  "ardennes-chateau-parade",
  "glace-convoi",
  "glace-groupe",
  "nurburgring-trackday",
  "groupe-drapeaux",
]);

export function safeImageSrc(filename: string | undefined, url: string): string {
  const base = filename?.replace(/\.[a-z0-9]+$/i, "").toLowerCase();
  return base && MASKED.has(base) ? `/images/${base}.jpg` : url;
}
