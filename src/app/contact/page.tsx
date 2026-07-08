import { Metadata } from "next";
import Reveal from "@/components/reveal";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | Take Your Gloves",
  description:
    "Demandez votre devis personnalisé pour un rallye, trackday ou expérience automobile sur-mesure avec Take Your Gloves.",
};

export default function ContactPage() {
  return (
    <section className="pt-28 pb-16 lg:pt-40 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
            Contact
          </p>
          <h1 className="text-balance mt-5 font-display text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl">
            Construisons votre prochaine sortie
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Que ce soit pour un rallye touristique, une journée trackday, une
            sortie entre amis ou une expérience sur-mesure, parlez-nous de
            votre projet. Nous vous répondons avec une proposition
            personnalisée sous 48h.
          </p>

          <div className="mt-10 space-y-5 border-t border-line pt-8 text-sm text-muted">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
                Email
              </p>
              <p className="mt-1">contact@takeyourgloves.fr</p>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
                Téléphone
              </p>
              <p className="mt-1">+33 (0)6 00 00 00 00</p>
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.15em] text-foreground/70">
                Localisation
              </p>
              <p className="mt-1">Strasbourg, France</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-2xl border border-line bg-surface p-8 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
