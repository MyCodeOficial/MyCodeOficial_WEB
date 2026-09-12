import Reveal from "@/components/Reveal";
import { trustBar } from "@/data/content";

export default function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-white/[0.015]">
      <Reveal>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6 md:justify-between md:px-8">
          <span className="text-xs uppercase tracking-[0.2em] text-white/30">
            {trustBar.label}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustBar.logos.map((logo) => (
              <span
                key={logo}
                className="font-display text-sm font-medium text-white/30 transition-colors duration-300 hover:text-white/60"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
