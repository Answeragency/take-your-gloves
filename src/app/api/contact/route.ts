import { NextResponse } from "next/server";

const MAX = { name: 120, email: 160, phone: 40, eventType: 80, message: 4000 };

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  // Champ piège invisible : un humain ne le remplit jamais. On répond OK sans rien envoyer.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const eventType = clean(body.eventType, MAX.eventType);
  const message = clean(body.message, MAX.message);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    // Envoi non configuré : on le dit clairement au lieu de faire croire que c'est parti.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const html = `
    <h2>Nouvelle demande depuis takeyourgloves</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone) || "non renseigné"}</p>
    <p><strong>Type d'événement :</strong> ${escapeHtml(eventType) || "non renseigné"}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Take Your Gloves <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Nouvelle demande de ${name}`,
        html,
      }),
    });
    if (!res.ok) {
      console.error("contact: Resend a refusé l'envoi", res.status);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("contact: envoi impossible", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
