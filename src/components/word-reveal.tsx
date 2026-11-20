"use client";

import { motion } from "motion/react";

type Segment = { text: string; className?: string };

// Les mots apparaissent en cascade (fondu, montée légère, flou qui se dissipe).
export default function WordReveal({ segments }: { segments: Segment[] }) {
  let n = 0;
  return (
    <>
      {segments.map((seg, si) =>
        seg.text
          .split(/(\s+)/)
          .map((tok, ti) => {
            if (/^\s+$/.test(tok) || tok === "") return tok;
            const i = n++;
            return (
              <motion.span
                key={`${si}-${ti}`}
                className={`inline-block ${seg.className ?? ""}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {tok}
              </motion.span>
            );
          })
      )}
    </>
  );
}
