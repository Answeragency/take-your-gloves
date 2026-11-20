/** "+33 6 67396634" -> "06 67 39 66 34" : numéro français en paires de chiffres (sinon renvoyé tel quel). */
export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  const m = d.match(/^(?:33|0)(\d{9})$/);
  if (!m) return raw;
  return `0${m[1]}`.match(/\d{2}/g)?.join(" ") ?? raw;
}
