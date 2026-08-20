import Reveal from "./reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
        {eyebrow}
      </p>
      <Heading className="text-balance mt-4 font-display text-4xl leading-[1.02] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-5 text-balance text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </Reveal>
  );
}
