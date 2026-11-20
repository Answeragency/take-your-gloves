"use client";

import { useSyncExternalStore } from "react";
import { reverse } from "@/lib/reverse";

const noopSubscribe = () => () => {};

/**
 * Adresse email invisible pour les robots qui aspirent le HTML (spam) :
 * elle n'est pas dans la page rendue côté serveur et n'apparaît qu'une fois la page chargée.
 * `reversed` est l'adresse écrite à l'envers (voir `reverse()`).
 */

export default function ProtectedEmail({
  reversed,
  className,
  placeholder = "Nous écrire",
}: {
  reversed: string;
  className?: string;
  placeholder?: string;
}) {
  const email = useSyncExternalStore(
    noopSubscribe,
    () => reverse(reversed),
    () => null
  );
  return email ? (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  ) : (
    <span className={className}>{placeholder}</span>
  );
}
