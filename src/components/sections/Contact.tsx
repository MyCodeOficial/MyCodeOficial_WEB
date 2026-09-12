"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail, TriangleAlert } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { contact } from "@/data/content";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border-0 border-b border-white/[0.14] bg-transparent px-0 py-3 text-white placeholder:text-white/30 transition-colors duration-300 focus:border-accent-violet focus:outline-none focus:ring-0";

function PillGroup({
  options,
  selected,
  onSelect,
  name,
}: {
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onSelect(option)}
            className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
              active
                ? "border-transparent bg-accent-gradient font-medium text-white"
                : "border-white/[0.14] text-white/50 hover:border-white/30 hover:text-white"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [projectType, setProjectType] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Dinos cómo te llamas";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Necesitamos un email válido para responderte";
    if (!message) errors.message = "Cuéntanos aunque sea en dos líneas";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          projectType,
          budget,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
      form.reset();
      setProjectType(null);
      setBudget(null);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading number={contact.number} section={contact.section} />

      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        {/* Claim + qué pasa al escribir */}
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-white/55">
            {contact.subtitle}
          </p>

          <a
            href={`mailto:${contact.email}`}
            className="group mt-8 inline-flex items-center gap-3 font-display text-xl font-semibold text-white md:text-2xl"
          >
            <Mail className="h-5 w-5 text-cyan-300" />
            <span className="border-b border-white/20 pb-0.5 transition-colors group-hover:border-white">
              {contact.email}
            </span>
          </a>
          <p className="mt-3 text-sm text-white/40">{contact.responseTime}</p>

          <div className="mt-10 space-y-0">
            {contact.steps.map((step, i) => (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/[0.14] font-display text-xs font-semibold text-white/70">
                    {i + 1}
                  </span>
                  {i < contact.steps.length - 1 && (
                    <span className="h-8 w-px bg-white/[0.12]" />
                  )}
                </div>
                <p className="pt-1.5 text-white/60">{step}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Formulario de baja fricción */}
        <Reveal delay={0.1}>
          <div className="surface relative rounded-2xl p-7 md:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-gradient">
                    <Check className="h-8 w-8 text-white" strokeWidth={3} />
                  </span>
                  <p className="mt-6 font-display text-2xl font-bold tracking-tight">
                    {contact.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-white/50 underline-offset-4 hover:text-white hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-7"
                >
                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-xs uppercase tracking-widest text-white/40"
                      >
                        Nombre *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        className={inputClass}
                        aria-invalid={!!fieldErrors.name}
                      />
                      {fieldErrors.name && (
                        <p className="mt-2 text-xs text-red-400">{fieldErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-xs uppercase tracking-widest text-white/40"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="tu@email.com"
                        className={inputClass}
                        aria-invalid={!!fieldErrors.email}
                      />
                      {fieldErrors.email && (
                        <p className="mt-2 text-xs text-red-400">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="mb-3 block text-xs uppercase tracking-widest text-white/40">
                      Tipo de proyecto
                    </span>
                    <PillGroup
                      options={contact.projectTypes}
                      selected={projectType}
                      onSelect={setProjectType}
                      name="Tipo de proyecto"
                    />
                  </div>

                  <div>
                    <span className="mb-3 block text-xs uppercase tracking-widest text-white/40">
                      Presupuesto orientativo{" "}
                      <span className="normal-case text-white/25">(opcional)</span>
                    </span>
                    <PillGroup
                      options={contact.budgets}
                      selected={budget}
                      onSelect={setBudget}
                      name="Presupuesto orientativo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-xs uppercase tracking-widest text-white/40"
                    >
                      Mensaje *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      placeholder="Cuéntanos qué necesitas, sin tecnicismos."
                      className={`${inputClass} resize-none`}
                      aria-invalid={!!fieldErrors.message}
                    />
                    {fieldErrors.message && (
                      <p className="mt-2 text-xs text-red-400">{fieldErrors.message}</p>
                    )}
                  </div>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-sm text-red-400"
                      role="alert"
                    >
                      <TriangleAlert className="h-4 w-4 shrink-0" />
                      {contact.errorMessage}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient bg-[length:200%_auto] px-8 py-4 font-display text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-[1.01] hover:bg-right disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando…
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
