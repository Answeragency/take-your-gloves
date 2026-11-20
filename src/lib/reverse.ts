/** Retourne une chaîne (sert à ne pas écrire un email en clair dans le HTML, voir ProtectedEmail). */
export const reverse = (s: string) => [...s].reverse().join("");
