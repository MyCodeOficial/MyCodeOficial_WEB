/**
 * Contenido editable de MYCodeOficial.
 * Todo el copy del sitio vive aquí: cambia textos sin tocar componentes.
 */

export const site = {
  name: "MYCodeOficial",
  email: "hola@mycodeoficial.com",
  url: "https://mycodeoficial.com",
  tagline: "Desarrollo web y móvil que funciona y vende",
  location: "España",
};

export const nav = {
  links: [
    { label: "Servicios", href: "#servicios" },
    { label: "Resultados", href: "#resultados" },
    { label: "Proceso", href: "#proceso" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contacto" },
  ],
  cta: "Iniciar proyecto",
};

export const hero = {
  eyebrow: "ESTUDIO DE DESARROLLO WEB & MÓVIL",
  titleLines: [
    "Tu producto digital,",
    "construido para funcionar",
    "y para vender.",
  ],
  subtitle:
    "Diseñamos, desarrollamos y mantenemos aplicaciones web y móviles para empresas que no pueden permitirse que su software falle. De la idea al despliegue — y seguimos ahí después.",
  ctaPrimary: "Cuéntanos tu proyecto",
  ctaSecondary: "Ver cómo trabajamos",
  trustMicrocopy: [
    "Respuesta en menos de 24h",
    "Presupuesto sin compromiso",
  ],
  marquee: [
    "Web",
    "Móvil",
    "APIs",
    "E-commerce",
    "Mantenimiento",
    "Consultoría",
  ],
};

export const trustBar = {
  label: "Tecnología de confianza:",
  logos: [
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "Flutter",
    "TypeScript",
    "PostgreSQL",
    "Docker",
  ],
};

export const problemSolution = {
  number: "01",
  section: "Por qué existimos",
  problemsTitle: "¿Te suena?",
  problems: [
    "Mi web/app va lenta y pierdo clientes",
    "Mi anterior proveedor desapareció",
    "Tengo una idea pero no sé por dónde empezar",
    "Mi software heredado da más problemas que soluciones",
  ],
  solutionsTitle: "Así lo resolvemos",
  solutions: [
    "Optimizamos rendimiento hasta que tu plataforma vuele — y tus clientes se queden",
    "Comunicación constante y soporte real: aquí nadie desaparece",
    "Te guiamos de la idea al plan concreto, con precio y plazos claros",
    "Rescatamos y modernizamos tu software hasta que trabaje para ti",
  ],
  closing:
    "Sea cual sea tu punto de partida, te decimos con claridad qué necesitas — y qué no.",
  closingCta: "Cuéntanos tu caso",
};

export const services = {
  number: "02",
  section: "Servicios",
  items: [
    {
      index: "01",
      title: "Desarrollo Web",
      description:
        "Plataformas, SaaS y e-commerce a medida que cargan rápido y escalan contigo.",
      tags: ["SaaS", "E-commerce", "Plataformas", "APIs"],
    },
    {
      index: "02",
      title: "Aplicaciones Móviles",
      description:
        "iOS y Android con experiencia nativa, desde el concepto hasta las stores.",
      tags: ["iOS", "Android", "Flutter", "Publicación"],
    },
    {
      index: "03",
      title: "Mantenimiento & Evolución",
      description:
        "Tu aplicación siempre online, segura y mejorando. También rescatamos proyectos heredados.",
      tags: ["Soporte", "Monitorización", "Rescates", "SLA"],
    },
    {
      index: "04",
      title: "Consultoría Técnica",
      description:
        "Auditamos tu producto y te damos un plan claro, sin humo.",
      tags: ["Auditoría", "Arquitectura", "Roadmap", "Rendimiento"],
    },
  ],
  rowCta: "Hablemos de esto",
};

// NOTA: métricas placeholder — sustituir por casos reales antes de publicar.
export const cases = {
  number: "03",
  section: "Resultados",
  items: [
    {
      metric: "−68%",
      metricLabel: "tiempo de carga",
      title: "Replataformado de e-commerce",
      description:
        "Migración completa de una tienda lenta a una plataforma moderna. Más velocidad, más conversión, mismo catálogo.",
    },
    {
      metric: "4.8★",
      metricLabel: "en stores",
      title: "App móvil de reservas construida desde cero",
      description:
        "Del concepto a las stores en tiempo récord, con una experiencia que los usuarios premian con su valoración.",
    },
    {
      metric: "0",
      metricLabel: "caídas en 12 meses",
      title: "Mantenimiento de plataforma SaaS",
      description:
        "Monitorización, seguridad y mejoras continuas. El cliente se dedica a su negocio; nosotros, a que nada falle.",
    },
  ],
  footer: "¿Quieres ser el siguiente caso?",
};

export const process = {
  number: "04",
  section: "Cómo trabajamos",
  title: "Un proceso pensado para que siempre sepas qué está pasando.",
  steps: [
    {
      index: "01",
      title: "Descubrimiento",
      description:
        "Entendemos tu negocio. Recibes una propuesta clara con alcance y precio.",
    },
    {
      index: "02",
      title: "Diseño",
      description: "Validamos la experiencia antes de escribir código.",
    },
    {
      index: "03",
      title: "Desarrollo",
      description: "Avances reales cada semana, sin desaparecer.",
    },
    {
      index: "04",
      title: "Despliegue",
      description: "Lanzamiento sin sustos, medido y monitorizado.",
    },
    {
      index: "05",
      title: "Evolución",
      description:
        "Seguimos contigo: soporte, mejoras y nuevas funcionalidades.",
    },
  ],
};

export const manifesto = {
  text: "El software bien construido no es un gasto. Es la ventaja competitiva que tu negocio todavía no tiene.",
};

export const studio = {
  number: "05",
  section: "El estudio",
  title: "Pequeños a propósito. Obsesionados con que tu software funcione.",
  body: "MYCodeOficial es un estudio de desarrollo donde hablas directamente con quien construye tu producto. Sin intermediarios, sin capas comerciales, sin promesas que el equipo técnico no pueda cumplir. Hacemos menos proyectos para hacerlos bien.",
  stats: [
    { value: 100, prefix: "", suffix: "%", label: "Código propio y documentado" },
    { value: 24, prefix: "<", suffix: "h", label: "Tiempo de respuesta" },
    { value: 12, prefix: "+", suffix: "", label: "Tecnologías dominadas" },
    { value: 1, prefix: "", suffix: "", label: "Equipo que da la cara" },
  ],
  principles: [
    {
      title: "Comunicación directa",
      description: "Hablas con quien programa, no con un intermediario.",
    },
    {
      title: "Calidad sin atajos",
      description: "Código que otro desarrollador elogiaría.",
    },
    {
      title: "Sin letra pequeña",
      description: "Presupuestos claros, plazos reales.",
    },
  ],
};

export const technologies = {
  rowA: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Flutter",
    "React Native",
    "PostgreSQL",
    "MongoDB",
  ],
  rowB: [
    "AWS",
    "Docker",
    "Tailwind CSS",
    "GraphQL",
    "Stripe",
    "Firebase",
    "Redis",
    "Vercel",
  ],
};

export const faq = {
  number: "06",
  section: "Preguntas frecuentes",
  items: [
    {
      question: "¿Cuánto cuesta un proyecto?",
      answer:
        "Depende del alcance: una web corporativa, una app móvil y un SaaS no cuestan lo mismo. Tras la fase de descubrimiento recibes un presupuesto cerrado, sin sorpresas. Pedirlo no cuesta nada ni te compromete a nada.",
    },
    {
      question: "¿Cuánto tarda?",
      answer:
        "Un proyecto pequeño puede estar listo en 3-4 semanas; uno grande, en varios meses. En la propuesta inicial te damos un calendario realista con hitos concretos — y lo cumplimos.",
    },
    {
      question: "¿Trabajáis con proyectos ya empezados o heredados?",
      answer:
        "Sí, los rescatamos. Auditamos el código existente, te decimos en qué estado está de verdad y trazamos un plan para estabilizarlo y hacerlo evolucionar.",
    },
    {
      question: "¿Qué pasa después del lanzamiento?",
      answer:
        "No desaparecemos. Ofrecemos planes de mantenimiento con soporte, monitorización y mejoras continuas. Tu aplicación queda en buenas manos: las mismas que la construyeron.",
    },
    {
      question: "¿Firmáis NDA?",
      answer:
        "Sin problema. Tu idea y tus datos están protegidos desde la primera conversación, con o sin papel firmado.",
    },
    {
      question: "¿Trabajáis en remoto con clientes de cualquier lugar?",
      answer:
        "Sí. Trabajamos con clientes de España y de fuera, con reuniones online y avances semanales visibles. La distancia nunca ha sido un problema.",
    },
  ],
};

export const finalCta = {
  title: "¿Tienes un proyecto en mente?",
  subtitle: "Cuéntanoslo hoy. Mañana tienes respuesta.",
  cta: "Empezar mi proyecto",
  microcopy: "Sin compromiso. Sin reuniones eternas.",
};

export const contact = {
  number: "07",
  section: "Contacto",
  title: "Hablemos de tu proyecto.",
  subtitle:
    "Escríbenos y te respondemos en 24/48h laborables con los siguientes pasos.",
  email: "hola@mycodeoficial.com",
  responseTime: "Respuesta en 24/48h laborables",
  steps: [
    "Te respondemos en 24h",
    "Llamada breve para entender tu caso",
    "Propuesta con precio cerrado",
  ],
  projectTypes: ["Web", "App móvil", "Mantenimiento", "Consultoría", "Aún no lo sé"],
  budgets: ["<5k", "5–15k", "15–50k", "+50k", "Prefiero hablarlo"],
  successMessage: "Recibido 🚀 Te escribimos en menos de 24h.",
  errorMessage: "Algo ha fallado. Inténtalo de nuevo o escríbenos a hola@mycodeoficial.com.",
};

export const footer = {
  madeIn: "Hecho con precisión en España",
  links: [
    { label: "Servicios", href: "#servicios" },
    { label: "Resultados", href: "#resultados" },
    { label: "Proceso", href: "#proceso" },
    { label: "FAQ", href: "#faq" },
    { label: "Contacto", href: "#contacto" },
  ],
};
