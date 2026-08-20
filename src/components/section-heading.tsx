import Reveal from "./reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  /** Mot ou groupe de mots du titre à mettre en évidence en doré (au lieu de casser la ligne). */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  const center = align === "center";
  const parts = highlight && title.includes(highlight) ? title.split(highlight) : null;

  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className={`font-display text-xs uppercase tracking-[0.3em] text-accent ${center ? "mx-auto" : ""}`}>
        {eyebrow}
      </p>
      <Heading
        className={`text-balance mt-4 max-w-4xl font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl ${center ? "mx-auto" : ""}`}
      >
        {parts ? (
          <>
            {parts[0]}
            <span className="text-gold-bright">{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </Heading>
      {description && (
        <p className={`mt-5 text-balance max-w-2xl text-base leading-relaxed text-muted ${center ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
