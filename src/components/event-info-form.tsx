"use client";

import { useState, FormEvent } from "react";

const input =
  "w-full rounded-lg border border-line bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent";
const label = "mb-2 block font-display text-xs uppercase tracking-[0.15em] text-foreground/70";

export default function EventInfoForm({
  eventTitle,
  dateLabel,
  category,
}: {
  eventTitle: string;
  dateLabel: string;
  category: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "missing">("idle");
  const [mailto, setMailto] = useState("mailto:contact@take-your-gloves.fr");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    if (!d.email?.trim() && !d.phone?.trim()) {
      setStatus("missing");
      return;
    }
    const message = `Demande d'informations : ${eventTitle} (${dateLabel}).\nMerci de me recontacter avec le programme détaillé.`;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...d, eventType: category, message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      const subject = encodeURIComponent(`Infos : ${eventTitle}`);
      const body = encodeURIComponent(
        `Nom : ${d.name ?? ""}\nEmail : ${d.email ?? ""}\nTéléphone : ${d.phone ?? ""}\n\n${message}`
      );
      setMailto(`mailto:contact@take-your-gloves.fr?subject=${subject}&body=${body}`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-surface p-8 text-center">
        <p className="font-display text-xl uppercase tracking-tight text-foreground">Merci !</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Nous revenons vers vous très vite avec les informations sur {eventTitle}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-4 rounded-2xl border border-line bg-surface p-7">
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="info-website">Ne pas remplir</label>
        <input id="info-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="info-name" className={label}>Prénom &amp; nom</label>
        <input id="info-name" name="name" required autoComplete="name" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="info-email" className={label}>Email</label>
          <input id="info-email" name="email" type="email" autoComplete="email" className={input} />
        </div>
        <div>
          <label htmlFor="info-phone" className={label}>Téléphone</label>
          <input id="info-phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </div>
      </div>
      <p className="text-xs text-muted">Un email ou un téléphone suffit : nous vous rappelons.</p>
      {status === "missing" && (
        <p role="alert" className="text-sm text-gold">
          Merci d&apos;indiquer un email ou un numéro de téléphone.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-gold">
          L&apos;envoi a échoué.{" "}
          <a href={mailto} className="underline underline-offset-4">
            Nous écrire directement par email
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-fill px-8 py-4 font-display text-sm uppercase tracking-[0.05em] text-white transition-colors hover:bg-accent-fill-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Envoi…" : "Recevoir les infos"}
      </button>
    </form>
  );
}
