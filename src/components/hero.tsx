"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Button from "./button";
import CountUp from "./count-up";
import Photo from "./photo";
import { DEFAULT_STATS, type Stat } from "@/lib/stats";

type HeroProps = {
  stats?: Stat[];
  eyebrow?: string;
  line1?: string;
  line2?: string;
  subtitle?: string;
  imageUrl?: string;
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

export default function Hero({
  eyebrow = "Strasbourg · Alsace · Émotions automobiles",
  line1 = "Prenez le volant,",
  line2 = "Vivez la route.",
  subtitle = "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport.\nRallyes touristiques, expériences atypiques, sorties circuit, journées thématiques et bien davantage.",
  imageUrl,
  videoUrl,
  stats,
}: HeroProps) {
  const figures = stats && stats.length > 0 ? stats : DEFAULT_STATS;
  const bgImageUrl = imageUrl ?? "/images/ardennes-chateau-parade.jpg";
  const bgVideoUrl = videoUrl ?? "/videos/hero.mp4";
  const ref = useRef<HTMLDivElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  // La vidéo (10 Mo) ne se charge que sur écran large, sans réduction de mouvement,
  // et après le premier affichage, pour ne pas retarder l'image du hero.
  useEffect(() => {
    const ok = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
    if (!ok) return;
    const id = window.setTimeout(() => setCanPlayVideo(true), 800);
    return () => window.clearTimeout(id);
  }, []);
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
        <Photo
          src={bgImageUrl}
          alt="Convoi de voitures de sport devant un château"
          label="Take Your Gloves, Strasbourg"
          className="h-full w-full"
          variant="red"
          priority
        />
        {bgVideoUrl && canPlayVideo && (
          <video
            key={bgVideoUrl}
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          >
            <source src={bgVideoUrl} type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
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

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mx-auto mt-3 max-w-2xl whitespace-pre-line text-balance text-sm leading-relaxed text-muted sm:mt-8 sm:text-lg"
        >
          {subtitle}
        </motion.p>

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
