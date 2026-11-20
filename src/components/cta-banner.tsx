import Button from "./button";
import Reveal from "./reveal";
import Photo from "./photo";

type CtaBannerProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  imageUrl?: string;
  /** Point focal du recadrage : par défaut on garde le bas de la photo, là où sont les voitures. */
  imagePosition?: string;
};

export default function CtaBanner({
  eyebrow = "Prêt à enfiler vos gants ?",
  heading = "Parlons de votre prochaine expérience automobile",
  description = "Racontez-nous votre projet ou vos envies, rallyes, sortie conviviale, expérience sport automobile, et recevez un retour personnalisé.",
  imageUrl,
  imagePosition = "center 80%",
}: CtaBannerProps) {
  const bgImageUrl = imageUrl ?? "/images/amg-gtr-foret.jpg";
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Photo
          src={bgImageUrl}
          alt=""
          label="Take Your Gloves"
          variant="gold"
          position={imagePosition}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/50" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-24">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h2 className="text-balance mt-5 font-display text-2xl leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-5 text-balance text-base leading-relaxed text-muted">
            {description}
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/contact">Nous contacter</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
