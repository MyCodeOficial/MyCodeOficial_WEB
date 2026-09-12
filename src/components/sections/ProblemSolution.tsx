import { ArrowRight, Check, Minus } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { problemSolution } from "@/data/content";

export default function ProblemSolution() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading
        number={problemSolution.number}
        section={problemSolution.section}
      />

      <div className="grid gap-10 md:grid-cols-2 md:gap-8">
        {/* Dolores */}
        <Reveal>
          <div className="surface h-full rounded-2xl p-8 md:p-10">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {problemSolution.problemsTitle}
            </h2>
            <ul className="mt-8 space-y-5">
              {problemSolution.problems.map((problem) => (
                <li key={problem} className="flex items-start gap-4">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/15">
                    <Minus className="h-3 w-3 text-white/40" />
                  </span>
                  <span className="leading-relaxed text-white/55">
                    «{problem}»
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Respuestas en espejo */}
        <Reveal delay={0.12}>
          <div className="surface relative h-full overflow-hidden rounded-2xl p-8 md:p-10">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-violet/10 blur-3xl"
            />
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              {problemSolution.solutionsTitle}
            </h2>
            <ul className="mt-8 space-y-5">
              {problemSolution.solutions.map((solution) => (
                <li key={solution} className="flex items-start gap-4">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-gradient">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed text-white/75">{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-14 flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-lg leading-relaxed text-white/60">
            {problemSolution.closing}
          </p>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 font-display text-sm font-semibold text-white"
          >
            <span className="border-b border-white/20 pb-0.5 transition-colors group-hover:border-white">
              {problemSolution.closingCta}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
