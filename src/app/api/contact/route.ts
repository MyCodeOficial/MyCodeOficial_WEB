import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  projectType?: string | null;
  budget?: string | null;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo de la petición inválido." },
      { status: 400 }
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || name.length > 120) {
    return NextResponse.json(
      { ok: false, error: "El nombre es obligatorio." },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json(
      { ok: false, error: "El email no es válido." },
      { status: 400 }
    );
  }
  if (!message || message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "El mensaje es obligatorio." },
      { status: 400 }
    );
  }

  // TODO: enviar email con Resend cuando haya API key.
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "MYStack <hola@mystack.dev>",
  //   to: ["hola@mystack.dev"],
  //   replyTo: email,
  //   subject: `Nuevo contacto: ${name}${payload.projectType ? ` · ${payload.projectType}` : ""}`,
  //   text: [
  //     `Nombre: ${name}`,
  //     `Email: ${email}`,
  //     `Tipo de proyecto: ${payload.projectType ?? "No indicado"}`,
  //     `Presupuesto: ${payload.budget ?? "No indicado"}`,
  //     "",
  //     message,
  //   ].join("\n"),
  // });

  return NextResponse.json({ ok: true });
}
