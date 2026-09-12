import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { cases } from "@/data/content";

/**
 * NOTA: las métricas de esta sección son PLACEHOLDERS (ver src/data/content.ts).
 * Sustituir por casos reales con permiso del cliente antes de publicar.
 */
export default function Cases() {
  return (
    <section id="resultados" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading number={cases.number} section={cases.section} />

      <div className="grid gap-6 md:grid-cols-3">
        {cases.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.1}>
            <article className="surface group flex h-full flex-col rounded-2xl p-8 transition-colors duration-500 hover:bg-white/[0.05]">
              <div className="font-display text-5xl font-bold tracking-tight md:text-6xl">
                <span className="text-gradient">{item.metric}</span>
              </div>
              <div className="mt-2 font-display text-sm uppercase tracking-widest text-white/40">
                {item.metricLabel}
              </div>
              <div className="hairline-gradient my-6" />
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-12 flex justify-center">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 font-display text-lg font-semibold text-white/70 transition-colors hover:text-white"
          >
            {cases.footer}
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
