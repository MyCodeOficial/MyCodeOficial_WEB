import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { services } from "@/data/content";

export default function Services() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading number={services.number} section={services.section} />

      <div>
        {services.items.map((service, i) => (
          <Reveal key={service.index} delay={i * 0.06}>
            <a
              href="#contacto"
              className="group block border-b border-white/[0.08] transition-colors duration-500 hover:bg-white/[0.04]"
            >
              <div className="grid gap-4 px-2 py-10 md:grid-cols-[80px_1fr_auto] md:items-center md:gap-8 md:px-6 md:py-12">
                <span className="font-display text-sm text-white/30">
                  {service.index}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-white/55 transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 transition-transform duration-500 ease-out group-hover:translate-x-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-display text-sm font-semibold text-white opacity-0 transition-all duration-500 group-hover:opacity-100 md:translate-x-4 md:group-hover:translate-x-0">
                  {services.rowCta}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
