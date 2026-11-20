/** "+33 6 67396634" -> "+33 6 67 39 66 34" (numéro français, sinon renvoyé tel quel). */
export function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  const m = d.match(/^(?:33|0)(\d)(\d{8})$/);
  if (!m) return raw;
  return `+33 ${m[1]} ${m[2].match(/\d{2}/g)?.join(" ")}`;
}
