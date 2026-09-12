import Reveal from "@/components/Reveal";

type SectionHeadingProps = {
  number: string;
  section: string;
};

/** Numeración editorial: "01 / Servicios" + separador de 1px en gradiente. */
export default function SectionHeading({ number, section }: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mb-14 md:mb-20">
        <div className="mb-6 flex items-baseline gap-3 font-display text-sm tracking-widest">
          <span className="text-gradient font-semibold">{number}</span>
          <span className="text-white/30">/</span>
          <span className="uppercase text-white/50">{section}</span>
        </div>
        <div className="hairline-gradient" />
      </div>
    </Reveal>
  );
}
