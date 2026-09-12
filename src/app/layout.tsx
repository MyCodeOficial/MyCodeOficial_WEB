import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";
import Grain from "@/components/Grain";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "MYCodeOficial — Desarrollo de aplicaciones web y móviles que funcionan y venden",
  description:
    "Estudio de desarrollo y mantenimiento de aplicaciones web y móviles. Diseñamos, construimos y mantenemos tu producto digital con presupuesto cerrado y respuesta en menos de 24h.",
  keywords: [
    "desarrollo web",
    "desarrollo de aplicaciones móviles",
    "mantenimiento de aplicaciones",
    "consultoría técnica",
    "desarrollo a medida",
    "estudio de desarrollo España",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: site.url,
    siteName: site.name,
    title: "MYCodeOficial — Desarrollo de aplicaciones web y móviles que funcionan y venden",
    description:
      "Diseñamos, desarrollamos y mantenemos aplicaciones web y móviles para empresas que no pueden permitirse que su software falle.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MYCodeOficial — Desarrollo web y móvil que funciona y vende",
    description:
      "De la idea al despliegue — y seguimos ahí después. Respuesta en menos de 24h.",
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#030308"/><defs><linearGradient id="g" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#8b5cf6"/><stop offset="0.5" stop-color="#3b82f6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><path d="M7 23V9l5.5 7L18 9v14" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="24.5" cy="20.5" r="3" fill="url(#g)"/></svg>`
          ),
        type: "image/svg+xml",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      email: site.email,
      description:
        "Estudio de desarrollo y mantenimiento de aplicaciones web y móviles.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ES",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#service`,
      name: site.name,
      url: site.url,
      email: site.email,
      image: `${site.url}/opengraph-image`,
      priceRange: "$$",
      description:
        "Desarrollo web, aplicaciones móviles, mantenimiento y consultoría técnica para empresas.",
      areaServed: "ES",
      serviceType: [
        "Desarrollo Web",
        "Aplicaciones Móviles",
        "Mantenimiento y Evolución de Software",
        "Consultoría Técnica",
      ],
      parentOrganization: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-space font-sans text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Preloader />
        {children}
        <Grain />
        <CustomCursor />
      </body>
    </html>
  );
}
