"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { MessageSquare, ShieldCheck, FileCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { studio } from "@/data/content";

const PRINCIPLE_ICONS = [MessageSquare, ShieldCheck, FileCheck];

function Counter({
  value,
  prefix,
  suffix,
}: {
  value: number;
  prefix: string;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold tracking-tight md:text-5xl">
      <span className="text-gradient">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}

export default function Studio() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading number={studio.number} section={studio.section} />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            {studio.title}
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-white/55">
            {studio.body}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-6">
          {studio.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="surface flex h-full flex-col justify-between rounded-2xl p-6">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <p className="mt-3 text-sm leading-snug text-white/50">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {studio.principles.map((principle, i) => {
          const Icon = PRINCIPLE_ICONS[i % PRINCIPLE_ICONS.length];
          return (
            <Reveal key={principle.title} delay={i * 0.08}>
              <div className="surface h-full rounded-2xl p-7 transition-colors duration-500 hover:bg-white/[0.05]">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
