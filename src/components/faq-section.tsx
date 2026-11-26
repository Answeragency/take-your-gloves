import Reveal from "./reveal";
import JsonLd from "./json-ld";
import { faqJsonLd, type FaqItem } from "@/lib/seo";

/** Questions fréquentes : visibles par les visiteurs et publiées en données structurées FAQPage. */
export default function FaqSection({
  items,
  eyebrow = "Questions fréquentes",
  title = "Tout savoir sur Take Your Gloves",
}: {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-28">
      <JsonLd data={faqJsonLd(items)} />
      <Reveal>
        <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
        <h2 className="text-balance mt-4 font-display text-3xl leading-[1.05] tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left font-display text-lg leading-snug text-foreground [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span aria-hidden className="mt-1 shrink-0 text-accent transition-transform duration-300 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/80">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
