"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { manifesto } from "@/data/content";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <span aria-hidden="true" className="absolute inset-0 text-white/20">
        {word}
      </span>
      <motion.span style={{ opacity }} className="relative text-white">
        {word}
      </motion.span>
    </span>
  );
}

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = manifesto.text.split(" ");

  return (
    <section className="mx-auto max-w-5xl px-5 py-28 md:px-8 md:py-44">
      <div ref={containerRef}>
        <p className="font-display text-3xl font-bold leading-snug tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {words.map((word, i) => (
            <Word
              key={`${word}-${i}`}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, Math.min((i + 1) / words.length, 1)]}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
