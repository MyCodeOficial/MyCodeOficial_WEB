"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { hero } from "@/data/content";

const GalaxyBackground = dynamic(
  () => import("@/components/three/GalaxyBackground"),
  { ssr: false }
);

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <GalaxyBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 md:px-8">
        <motion.p
          className="mb-6 font-display text-xs font-medium tracking-[0.3em] text-white/50"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {hero.titleLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className={`block ${
                  i === hero.titleLines.length - 1 ? "text-gradient-animated" : ""
                }`}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient bg-[length:200%_auto] px-8 py-4 font-display text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.45)] transition-all duration-300 hover:scale-[1.02] hover:bg-right hover:shadow-[0_0_48px_rgba(99,102,241,0.65)]"
          >
            {hero.ctaPrimary}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#proceso"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.03] px-8 py-4 font-display text-sm font-semibold text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
          >
            {hero.ctaSecondary}
          </a>
        </motion.div>

        <motion.div
          className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
        >
          {hero.trustMicrocopy.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-cyan-300" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Indicador de scroll + marquee de keywords */}
      <motion.div
        className="relative z-10 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="mb-6 flex justify-center">
          <ChevronDown className="h-5 w-5 animate-bounce text-white/30" />
        </div>
        <div className="relative overflow-hidden" aria-hidden="true">
          <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-sm tracking-[0.25em] text-white/25">
            {[...hero.marquee, ...hero.marquee, ...hero.marquee, ...hero.marquee].map(
              (word, i) => (
                <span key={`${word}-${i}`} className="inline-flex items-center gap-12">
                  {word.toUpperCase()}
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
