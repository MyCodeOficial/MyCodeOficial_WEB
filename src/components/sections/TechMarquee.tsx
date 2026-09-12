import { technologies } from "@/data/content";

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      <div
        className={`flex w-max gap-4 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee-slow"
        }`}
      >
        {doubled.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/[0.1] bg-white/[0.02] px-6 py-3 font-display text-sm text-white/50 transition-colors duration-300 hover:border-accent-violet/60 hover:text-white"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Tecnologías que dominamos"
      className="relative overflow-hidden border-y border-white/[0.06] py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-space to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-space to-transparent"
      />
      <MarqueeRow items={technologies.rowA} />
      <MarqueeRow items={technologies.rowB} reverse />
    </section>
  );
}
