export type Stat = { value: string; label: string };

/** Chiffres clés par défaut (modifiables dans Sanity : Réglages du site). */
export const DEFAULT_STATS: Stat[] = [
  { value: "+50", label: "Événements organisés" },
  { value: "+250", label: "Pilotes rencontrés" },
  { value: "+5", label: "Ans d'expérience" },
];
