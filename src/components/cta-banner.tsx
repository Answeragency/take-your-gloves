import Button from "./button";
import Reveal from "./reveal";
import Photo from "./photo";

type CtaBannerProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  imageUrl?: string;
};

export default function CtaBanner({
  eyebrow = "Prêt à enfiler vos gants ?",
  heading = "Parlons de votre prochaine expérience automobile",
  description = "Racontez-nous votre projet — rallye, trackday, sortie entre amis ou expérience sur-mesure — et recevez une proposition personnalisée sous 48h.",
  imageUrl,
}: CtaBannerProps) {
  const bgImageUrl = imageUrl ?? "/images/amg-gtr-foret.jpg";
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Photo
          src={bgImageUrl}
          alt="Mercedes-AMG GT R verte sur une route en forêt"
          label="Take Your Gloves"
          variant="gold"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-background/75" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-28">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
            {eyebrow}
          </p>
          <h2 className="text-balance mt-5 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl">
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
