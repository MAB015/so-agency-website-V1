import type { Dictionary } from './types'

export const es: Dictionary = {
  locale: 'es',
  notFound: {
    headline: 'Misión fallida. Choque de cohete detectado.',
    subheading: '404 — Esta página ha dejado la órbita.',
    description: 'La página que buscas no existe o se ha perdido en el espacio. Volvamos a ponerte en curso.',
    backHome: 'Volver a la Órbita',
    contactUs: 'Contactar Soporte',
  },
  navbar: {
    links: [
      { label: 'Servicios', href: '#services' },
      { label: 'Proceso', href: '#process' },
      { label: 'Equipo', href: '#team' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contacto', href: '#contact' },
    ],
    cta: 'Empezar',
  },
  hero: {
    badge: 'Tu Socio de Lanzamiento Digital',
    headline: 'Tu visión, nuestro diseño estelar',
    slogan: 'Diseña. Construye. Despega.',
    description:
      'Transformamos tus ideas de negocio en presencias digitales de alto rendimiento — desde sitios web impactantes hasta identidades de marca completas.',
    ctaPrimary: 'Agenda tu Diagnóstico Gratis',
    ctaSecondary: 'Ver Nuestros Servicios',
  },
  services: {
    sectionTitle: 'Soluciones Estratégicas',
    sectionDescription:
      'Servicios especializados diseñados para garantizar el éxito total de tu negocio en todos los canales digitales.',
    items: [
      {
        title: 'Diseño & Desarrollo Web',
        description:
          'Sitios a medida, impulsados por el rendimiento y construidos sobre stacks modernos. Ingeniamos plataformas de alto desempeño que mantienen a los usuarios comprometidos.',
      },
      {
        title: 'Diseño UX/UI',
        description:
          'Interfaces intuitivas y orientadas a la conversión. Cada sección tiene un propósito en la guía del viaje del usuario.',
      },
      {
        title: 'E-Commerce',
        description:
          'Soluciones de tiendas online que van desde el inicio hasta el final, diseñadas para transacciones sin fricción y máxima conversión.',
      },
      {
        title: 'Marca e Identidad',
        description:
          'Sistemas completos de identidad visual. Hacemos que tu marca resuene de forma única en tu industria y establezca una autoridad innegable.',
      },
      {
        title: 'Redes Sociales',
        description:
          'Convertimos la interacción en clientes potenciales mediante estrategias de contenido calculadas y campañas basadas en datos.',
      },
      {
        title: 'Automatización IA',
        description:
          'Optimizamos operaciones con herramientas inteligentes. Tecnología de próxima generación actualmente en desarrollo.',
        badge: 'Próximamente',
      },
    ],
  },
  process: {
    sectionTitle: 'Cómo Trabajamos',
    sectionDescription:
      'Un proceso probado que te lleva de la idea al impacto. Claro, colaborativo y diseñado para la velocidad.',
    steps: [
      {
        number: '01',
        title: 'Descubrimiento',
        subtitle: 'Revisión Pre-Vuelo',
        description:
          'Nos sumergimos en tu negocio para comprender tus objetivos, audiencia y panorama competitivo.',
      },
      {
        number: '02',
        title: 'Estrategia',
        subtitle: 'Planificación de Misión',
        description:
          'Juntos, trazamos una hoja de ruta clara con hitos definidos y resultados medibles.',
      },
      {
        number: '03',
        title: 'Lanzamiento',
        subtitle: 'Despegue',
        description:
          'Ejecutamos con precisión, entregando trabajo de alta calidad en tus plazos.',
      },
      {
        number: '04',
        title: 'Crecimiento',
        subtitle: 'Órbita',
        description:
          'Soporte continuo y optimización para que tu negocio siga escalando y prosperando.',
      },
    ],
  },
  benefits: {
    sectionTitle: 'Por Qué Nos Eligen',
    sectionDescription:
      'No somos solo otra agencia. Somos tu mejor socio para que despegues en tu ruta digital, comprometidos con tu éxito.',
    items: [
      {
        title: 'Orientado al Socio',
        description:
          'Trabajamos junto a ti, no solo para ti. Tu éxito es nuestra misión — estamos comprometidos en tu crecimiento.',
      },
      {
        title: 'Entrega Rápida',
        description:
          'Calidad a velocidad. Nos movemos eficientemente para cumplir tus hitos sin comprometer los resultados.',
      },
      {
        title: 'Precios Flexibles',
        description:
          'Calidad premium a tarifas accesibles. Paquetes diseñados para empresas de todos los tamaños.',
      },
      {
        title: 'De Principio a Fin',
        description:
          'Un solo equipo para branding, web y marketing. Ejecución fluida en todas tus necesidades digitales.',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Trabajo Selecto',
    sectionTitle: 'Convirtiendo Ideas en Obras Maestras',
    visitWebsite: 'Visitar Sitio Web',
    pauseAutoplay: 'Pausar reproducción automática',
    resumeAutoplay: 'Reanudar reproducción automática',
    previousProject: 'Proyecto anterior',
    nextProject: 'Proyecto siguiente',
    projects: [
      {
        title: 'La Feika',
        subtitle: 'Fresco de China a LatAm',
        description:
          'Plataforma de e-commerce que conecta proveedores de alimentos frescos chinos con mercados latinoamericanos. Una solución digital completa para el comercio transfronterizo.',
        tags: ['E-Commerce', 'Desarrollo Web', 'Branding'],
      },
      {
        title: "It's Fuluz Time",
        subtitle: 'Artículos de Cuero Cruelty-Free',
        description:
          'Una excelente opción para artículos de cuero de alta calidad y completamente libres de crueldad. Sus productos van desde bolsos y billeteras hasta mucho más.',
        tags: ['Diseño Web', 'Desarrollo Web', 'Branding'],
      },
      {
        title: 'Yaku Adventures',
        subtitle: 'Turismo y Experiencias de Senderismo',
        description:
          'Plataforma de turismo de aventura que muestra impresionantes experiencias de senderismo y aventuras al aire libre por Sudamérica.',
        tags: ['Diseño Web', 'E-commerce', 'Desarrollo Web'],
      },
      {
        title: 'Singing Rooster',
        subtitle: 'Mercado premium de café, chocolate y artesanías',
        description:
          'Singing Rooster es un sitio de e-commerce para café, chocolate, arte, suscripciones y experiencias de compra al por mayor y al detalle.',
        tags: ['Seguridad Web', 'Desarrollo APP', 'Optimización'],
      },
    ],
  },
  team: {
    sectionTitle: 'Nuestro Liderazgo',
    sectionDescription: 'El equipo detrás de tu misión al éxito.',
    members: [
      {
        name: 'Miguel & Oscar',
        label: 'Socios Fundadores',
        description:
          'Fundadores de SO Agency. Diseñamos, construimos y lanzamos presencias digitales que realmente impactan — combinando desarrollo estratégico con un diseño UX/UI impactante.',
      },
    ],
  },
  cta: {
    headline: '¿Listo para Lanzar tu Presencia Digital?',
    description:
      'Hablemos de tu proyecto y cómo podemos ayudarte a alcanzar nuevas alturas. Agenda una llamada de diagnóstico gratuita hoy.',
    ctaPrimary: 'Hagámoslo Realidad',
    ctaSecondary: 'Enviar un Mensaje',
    responseTime: 'Normalmente respondemos en menos de 24 horas',
  },
  faq: {
    sectionTitle: 'Preguntas Frecuentes',
    sectionDescription: 'Todo lo que necesitas saber antes de que lancemos juntos.',
    items: [
      {
        question: '¿Cuánto tiempo tarda en construirse un sitio web?',
        answer:
          'La mayoría de los proyectos se completan en 3 a 6 semanas según el alcance y la complejidad. Una landing page o portafolio puede estar en vivo en tan solo 2 semanas, mientras que un e-commerce completo o un sistema de identidad de marca suele tomar de 4 a 8 semanas. Siempre acordamos un cronograma claro antes de comenzar.',
      },
      {
        question: '¿Cuánto cuesta un proyecto con SO Agency?',
        answer:
          'Cada proyecto se planifica individualmente porque ningún negocio es igual. Como referencia, los proyectos de diseño y desarrollo web comienzan desde $1,500 USD, y los paquetes de branding desde $800 USD. Ofrecemos planes de pago flexibles y podemos adaptar un paquete a tu presupuesto. Agenda una llamada de diagnóstico gratuita y te daremos una cotización precisa sin sorpresas.',
      },
      {
        question: '¿Qué servicios ofrece SO Agency?',
        answer:
          'Cubrimos todo el stack de lanzamiento digital: diseño y desarrollo web, diseño UX/UI, e-commerce, branding e identidad visual, estrategia de redes sociales y automatización con IA. Ya sea que necesites un solo servicio o toda la suite, operamos como una extensión de tu equipo.',
      },
      {
        question: '¿Necesito tener una identidad de marca antes de construir un sitio web?',
        answer:
          'Para nada. Muchos de nuestros clientes llegan a nosotros al inicio de su camino. Podemos encargarnos primero del branding y luego llevar esa identidad de manera fluida a tu sitio web, o hacer ambas cosas en paralelo para ahorrar tiempo. Te recomendaremos el mejor enfoque durante tu llamada de diagnóstico.',
      },
      {
        question: '¿Mi sitio web estará optimizado para los motores de búsqueda?',
        answer:
          'Sí. Cada sitio que construimos sigue las mejores prácticas SEO actuales: HTML semántico, optimización de rendimiento, metadatos correctos, etiquetas Open Graph, datos estructurados (JSON-LD) y un sitemap. Si necesitas estrategia SEO continua o contenido, podemos incluirlo como parte de un plan de crecimiento.',
      },
      {
        question: '¿Qué sucede después del lanzamiento del proyecto?',
        answer:
          'El lanzamiento no es el final — es el inicio de la órbita. Ofrecemos paquetes de soporte post-lanzamiento que incluyen monitoreo de rendimiento, actualizaciones de contenido, parches de seguridad y marketing continuo. Nunca te dejaremos solo después del go-live.',
      },
      {
        question: '¿SO Agency puede trabajar con clientes fuera de Latinoamérica?',
        answer:
          'Absolutamente. Trabajamos con clientes en toda América Latina, Estados Unidos, Europa y más allá. Nuestro equipo opera de forma remota y se comunica tanto en inglés como en español, por lo que la distancia nunca es una barrera para un gran trabajo.',
      },
    ],
  },
  footer: {
    tagline: 'Diseña. Construye. Lanza.',
    description:
      'Tu socio de lanzamiento digital. Ayudamos a empresas a crecer con branding estratégico, desarrollo web y marketing.',
    columns: [
      {
        title: 'Servicios',
        links: [
          { label: 'Diseño & Desarrollo Web', href: '#services' },
          { label: 'Marca e Identidad', href: '#services' },
          { label: 'E-Commerce', href: '#services' },
        ],
      },
      {
        title: 'Empresa',
        links: [
          { label: 'Proceso', href: '#process' },
          { label: 'Equipo', href: '#team' },
          { label: 'Contacto', href: '#contact' },
        ],
      },
    ],
    social: [
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
    copyright: 'SO Agency. Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
  },
}
