import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { finalCta } from "@/data/content";

const STARS = [
  { left: "8%", top: "22%", size: 2, delay: "0s" },
  { left: "16%", top: "68%", size: 1, delay: "0.8s" },
  { left: "27%", top: "35%", size: 2, delay: "1.6s" },
  { left: "38%", top: "15%", size: 1, delay: "2.4s" },
  { left: "47%", top: "78%", size: 2, delay: "0.4s" },
  { left: "58%", top: "28%", size: 1, delay: "1.2s" },
  { left: "67%", top: "62%", size: 2, delay: "2s" },
  { left: "76%", top: "18%", size: 1, delay: "2.8s" },
  { left: "85%", top: "48%", size: 2, delay: "0.6s" },
  { left: "92%", top: "72%", size: 1, delay: "1.8s" },
  { left: "12%", top: "85%", size: 1, delay: "3.2s" },
  { left: "70%", top: "85%", size: 1, delay: "1s" },
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      {/* Glow radial + estrellas CSS */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(139,92,246,0.14), transparent 65%), radial-gradient(ellipse 40% 30% at 50% 50%, rgba(34,211,238,0.08), transparent 60%)",
        }}
      />
      {STARS.map((star, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
            {finalCta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-white/60 md:text-xl">
            {finalCta.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 rounded-full bg-accent-gradient bg-[length:200%_auto] px-10 py-5 font-display text-base font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-300 hover:scale-[1.02] hover:bg-right hover:shadow-[0_0_60px_rgba(99,102,241,0.7)] md:px-12 md:py-6 md:text-lg"
            >
              {finalCta.cta}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="text-sm text-white/40">{finalCta.microcopy}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
