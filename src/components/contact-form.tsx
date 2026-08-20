"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { categories } from "@/lib/calendar";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 900);
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
          sous 48h avec une proposition personnalisée.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Prénom & nom" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Téléphone" name="phone" />
        <div className="flex flex-col gap-2">
          <label className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
            Type d&apos;événement
          </label>
          <select
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
        <label className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
          Votre projet
        </label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Dites-nous en plus : date envisagée, nombre de personnes, type de voiture..."
          className="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent-fill px-7 py-4 font-display text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-accent-fill-hover disabled:opacity-60 sm:w-auto"
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
      <label className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
