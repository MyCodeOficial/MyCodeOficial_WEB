import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { process } from "@/data/content";

export default function Process() {
  return (
    <section id="proceso" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading number={process.number} section={process.section} />

      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        {/* Título fijo a la izquierda */}
        <div>
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <h2 className="max-w-md font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {process.title}
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-white/50">
                Cinco fases, cero sorpresas. En cada una sabes exactamente qué
                recibes y cuándo.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Cards en cascada a la derecha */}
        <div className="space-y-5">
          {process.steps.map((step, i) => (
            <Reveal key={step.index} delay={i * 0.05}>
              <div className="surface group relative overflow-hidden rounded-2xl p-7 transition-colors duration-500 hover:bg-white/[0.05] md:p-8">
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-px bg-accent-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-start gap-6">
                  <span className="font-display text-sm font-semibold text-gradient">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-white/55">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
