"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(true);

  useEffect(() => {
    // Solo en la primera carga de la sesión y sin reduced-motion.
    // La marca de sesión se guarda al TERMINAR (no al empezar) para que el
    // doble montaje de React StrictMode en dev no deje el preloader colgado.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("mycodeoficial-preloader");
    if (reduced || seen) return;

    setSkipped(false);
    document.documentElement.style.overflow = "hidden";

    const duration = 1300;
    const start = performance.now();
    let raf = 0;
    let doneTimer: number | undefined;

    const finish = () => {
      sessionStorage.setItem("mycodeoficial-preloader", "1");
      setDone(true);
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out para que el contador frene al final
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        doneTimer = window.setTimeout(finish, 150);
      }
    };
    raf = requestAnimationFrame(tick);

    // Red de seguridad: pase lo que pase, el preloader nunca supera los 2.4s.
    const failSafe = window.setTimeout(finish, 2400);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(doneTimer);
      window.clearTimeout(failSafe);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  if (skipped) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-space"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <span className="font-display text-3xl font-bold tracking-tight">
              MY<span className="text-gradient">Code</span>Oficial
            </span>
            <div className="h-px w-40 overflow-hidden bg-white/10">
              <div
                className="h-full bg-accent-gradient transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-display text-sm tabular-nums text-white/40">
              {progress}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
