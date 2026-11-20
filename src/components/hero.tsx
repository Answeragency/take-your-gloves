"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";
import Button from "./button";
import CountUp from "./count-up";
import { DEFAULT_STATS, type Stat } from "@/lib/stats";

type HeroProps = {
  stats?: Stat[];
  eyebrow?: string;
  line1?: string;
  line2?: string;
  subtitle?: string;
  videoUrl?: string;
};

const wordVariants = {
  hidden: { opacity: 0, y: "100%" },
  visible: (i: number) => ({
    opacity: 1,
    y: "0%",
    transition: { duration: 0.9, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const noopSubscribe = () => () => {};

function useMedia(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default function Hero({
  eyebrow = "Strasbourg · Alsace · Émotions automobiles",
  line1 = "Prenez le volant,",
  line2 = "Vivez la route.",
  subtitle = "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport.\nRallyes touristiques, expériences atypiques, sorties circuit, journées thématiques et bien davantage.",
  videoUrl,
  stats,
}: HeroProps) {
  const figures = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  const ref = useRef<HTMLDivElement>(null);
  // La vidéo ne s'insère qu'après l'affichage (la page ne charge pas 28 Mo avant d'être visible),
  // en 720p sur mobile et en 1080p ailleurs. Sans mouvement souhaité : image fixe, extraite de la vidéo.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const small = useMedia("(max-width: 767px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const bgVideoUrl = videoUrl ?? (small ? "/videos/hero-mobile.mp4" : "/videos/hero-desktop.mp4");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.25, 0.95], [1, 0]);

  const words1 = line1.split(" ");
  const words2 = line2.split(" ");

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden pb-40 pt-28 sm:pb-48">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        {/* Première image de la vidéo : affichée instantanément, puis recouverte par la vidéo */}
        <Image
          src="/images/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover"
        />
        {mounted && !reduced && (
          <video
            key={bgVideoUrl}
            poster="/images/hero-poster.jpg"
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={bgVideoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/25 to-background/55" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-background/70 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-xs uppercase tracking-[0.35em] text-foreground/70"
        >
          {eyebrow}
        </motion.p>

        <h1 className="text-balance mx-auto mt-6 max-w-5xl font-display text-[clamp(1.9rem,8.6vw,3rem)] leading-[0.98] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          <span className="block overflow-hidden">
            {words1.map((word, i) => {
              const wordIndex = i;
              return (
                <motion.span
                  key={word + wordIndex}
                  custom={wordIndex}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="mx-2 inline-block"
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
          <span className="block overflow-hidden">
            {words2.map((word, i) => {
              const wordIndex = words1.length + i;
              return (
                <motion.span
                  key={word + wordIndex}
                  custom={wordIndex}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="gold-text mx-2 inline-block"
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
        </h1>

        {/* Une phrase par ligne de texte, chacune équilibrée : pas de dernière ligne orpheline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto mt-3 max-w-2xl space-y-1 text-sm leading-relaxed text-muted sm:mt-8 sm:space-y-2 sm:text-lg"
        >
          {subtitle.split(/\r?\n/).map((line) => (
            <p key={line} className="text-balance">
              {line}
            </p>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-5"
        >
          <Button href="/evenements">Découvrir nos événements</Button>
          <Button href="/contact" variant="outline">
            Nous contacter
          </Button>
        </motion.div>
      </motion.div>

      {/* Chiffres clés : directement sur la photo, sans fond. Ils respirent lentement après leur entrée. */}
      <motion.dl
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-0 z-10 pb-8 sm:pb-12"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-6 sm:gap-10 lg:px-10">
          {figures.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col-reverse items-center justify-end gap-2 text-center [text-shadow:0_2px_28px_rgba(0,0,0,0.65)]"
            >
              <motion.dt
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.9 + i * 0.15 }}
                className="text-xs uppercase tracking-[0.12em] text-foreground/75 sm:tracking-[0.2em]"
              >
                {s.label}
              </motion.dt>
              <motion.dd
                initial={{ opacity: 0, y: 28, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, delay: 1.4 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl leading-none tracking-tight text-foreground sm:text-7xl"
              >
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mb-3 block h-px w-10 origin-center bg-gradient-to-r from-transparent via-gold to-transparent sm:mb-5 sm:w-16"
                />
                <CountUp value={s.value} delay={1.5 + i * 0.18} duration={2.4} />
              </motion.dd>
            </div>
          ))}
        </div>
      </motion.dl>
    </section>
  );
}
