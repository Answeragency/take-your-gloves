"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "@/lib/calendar";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [mailtoHref, setMailtoHref] = useState("mailto:contact@take-your-gloves.com");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
    } catch {
      const subject = encodeURIComponent("Demande depuis le site");
      const body = encodeURIComponent(
        `Nom : ${data.name ?? ""}\nEmail : ${data.email ?? ""}\nTéléphone : ${data.phone ?? ""}\nType : ${data.eventType ?? ""}\n\n${data.message ?? ""}`
      );
      setMailtoHref(`mailto:contact@take-your-gloves.com?subject=${subject}&body=${body}`);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-accent/30 bg-surface p-10 text-center"
      >
        <p className="font-display text-2xl uppercase tracking-tight text-foreground">
          Merci !
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Votre demande a bien été enregistrée. Notre équipe vous recontacte
          avec une proposition personnalisée.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Champ piège anti-spam : invisible et inaccessible, un humain ne le remplit jamais */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Prénom & nom" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Téléphone" name="phone" />
        <div className="flex flex-col gap-2">
          <label htmlFor="eventType" className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
            Type d&apos;événement
          </label>
          <select
            id="eventType"
            name="eventType"
            className="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
            defaultValue=""
          >
            <option value="" disabled>
              Sélectionnez une expérience
            </option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="Autre">Autre / sur-mesure</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
          Votre projet
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Dites-nous en plus : date envisagée, nombre de personnes, type de voiture..."
          className="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-gold/40 bg-surface p-4 text-sm leading-relaxed text-foreground/90">
          L&apos;envoi n&apos;a pas abouti. Vos informations ne sont pas perdues :{" "}
          <a href={mailtoHref} className="text-gold-bright underline underline-offset-4">
            envoyer ma demande par e-mail
          </a>
          , ou écrivez-nous à contact@take-your-gloves.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-fill px-7 py-4 font-display text-sm uppercase tracking-[0.15em] text-white transition-colors hover:bg-accent-fill-hover disabled:opacity-60 sm:w-auto"
      >
        <AnimatePresence mode="wait">
          {status === "submitting" ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Envoi en cours...
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              Envoyer ma demande
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
