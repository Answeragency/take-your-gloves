import Button from "@/components/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-3xl px-6 pt-32 text-center lg:px-10">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">Erreur 404</p>
        <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          Cette route ne mène <span className="gold-text">nulle part</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          La page que vous cherchez n&apos;existe plus ou a changé d&apos;adresse. Reprenons la route depuis le début.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href="/evenements" variant="outline">Voir les événements</Button>
        </div>
      </div>
    </section>
  );
}
