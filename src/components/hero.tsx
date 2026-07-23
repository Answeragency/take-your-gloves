"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Button from "./button";
import Photo from "./photo";

type HeroProps = {
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
  line1 = "Enfilez vos gants.",
  line2 = "Vivez la route.",
  subtitle = "Votre meilleur partenaire pour vivre des émotions automobiles uniques et (re)découvrir tout le potentiel de plaisir au volant de votre voiture de sport. Rallyes touristiques, trackdays, sorties conviviales et expériences atypiques.",
  imageUrl,
  videoUrl,
}: HeroProps) {
  const bgImageUrl = imageUrl ?? "/images/ardennes-chateau-parade.jpg";
  const bgVideoUrl = videoUrl ?? "/videos/Full Edit-1.mp4";
  const ref = useRef<HTMLDivElement>(null);
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
  let wordIndex = -1;

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Photo
          src={bgImageUrl}
          alt="Convoi de voitures de sport devant un château"
          label="Take Your Gloves — Strasbourg"
          className="h-full w-full"
          variant="red"
          priority
        />
        {bgVideoUrl && (
          <video
            key={bgVideoUrl}
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -right-32 top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 rounded-full border border-accent/20 lg:block"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute -right-10 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-gold/15 lg:block"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-xs uppercase tracking-[0.35em] text-foreground/55"
        >
          {eyebrow}
        </motion.p>

        <h1 className="text-balance mt-6 max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          <span className="block overflow-hidden">
            {words1.map((word) => {
              wordIndex += 1;
              return (
                <motion.span
                  key={word + wordIndex}
                  custom={wordIndex}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="mr-4 inline-block"
                >
                  {word}
                </motion.span>
              );
            })}
          </span>
          <span className="block overflow-hidden">
            {words2.map((word) => {
              wordIndex += 1;
              return (
                <motion.span
                  key={word + wordIndex}
                  custom={wordIndex}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  className="gold-text mr-4 inline-block"
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
          className="mt-3 max-w-xl text-balance text-sm leading-relaxed text-muted sm:mt-8 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="mt-4 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-5"
        >
          <Button href="/evenements">Découvrir les événements</Button>
          <Button href="/contact" variant="outline">
            Nous contacter
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-muted">
          Défiler
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-foreground/30"
        />
      </motion.div>
    </section>
  );
}
