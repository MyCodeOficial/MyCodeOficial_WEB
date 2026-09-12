"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, label, select, [role='button'], [data-cursor]";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      visible = true;
      const target = e.target as Element | null;
      hovering = !!target?.closest?.(INTERACTIVE_SELECTOR);
    };

    const onLeave = () => {
      visible = false;
    };

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      const dot = dotRef.current;
      const ringEl = ringRef.current;
      if (dot && ringEl) {
        dot.style.opacity = visible ? "1" : "0";
        ringEl.style.opacity = visible ? "1" : "0";
        dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
        const scale = hovering ? 1.9 : 1;
        ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringEl.style.borderColor = hovering
          ? "rgba(139, 92, 246, 0.8)"
          : "rgba(255, 255, 255, 0.35)";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-1.5 w-1.5 rounded-full bg-white opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[120] h-8 w-8 rounded-full border border-white/35 opacity-0 transition-[border-color] duration-300"
      />
    </>
  );
}
