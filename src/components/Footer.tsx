import { footer, site } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08]">
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-16 md:px-8 md:pb-40">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="font-display text-2xl font-bold tracking-tight">
              MY<span className="text-gradient">Code</span>Oficial
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/40">
              Estudio de desarrollo y mantenimiento de aplicaciones web y
              móviles.
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={`mailto:${site.email}`}
            className="font-display text-lg text-white/70 transition-colors hover:text-white"
          >
            {site.email}
          </a>
        </div>

        <div className="hairline-gradient mt-14" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </span>
          <span>{footer.madeIn}</span>
        </div>
      </div>

      {/* Wordmark gigante como marca de agua */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
      >
        <span className="block translate-y-[35%] text-center font-display text-[12.5vw] font-bold leading-none tracking-tight text-white/[0.06]">
          MYCodeOficial
        </span>
      </div>
    </footer>
  );
}
