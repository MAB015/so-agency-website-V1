import type { Locale } from '@/lib/i18n/types'
import { WHATSAPP_URL } from '@/lib/contact'
import { BRAND_TITLE } from '@/lib/brand'

type Props = {
  locale: Locale
  baseUrl: string
}

const content: Record<Locale, {
  description: string
  services: { name: string; description: string }[]
  faqs: { question: string; answer: string }[]
}> = {
  en: {
    description: 'SO Agency transforms business ideas into high-performing digital presences — from stunning websites to complete brand identities. Your digital launch partner.',
    services: [
      {
        name: 'Web Design & Development',
        description: 'Custom, performance-driven websites built on modern stacks. High-performance platforms that keep users engaged and convert visitors into customers.',
      },
      {
        name: 'UX/UI Design',
        description: 'Intuitive, conversion-focused interfaces. Every pixel serves a purpose in guiding the user journey toward your business goals.',
      },
      {
        name: 'E-Commerce Solutions',
        description: 'End-to-end online store design and development for frictionless transactions, maximum conversion, and scalable growth.',
      },
      {
        name: 'Branding & Identity',
        description: 'Full visual identity systems — logos, brand guidelines, typography, and color systems — that establish authority in your industry.',
      },
      {
        name: 'Social Media Marketing',
        description: 'Calculated content strategies and data-driven campaigns that turn social engagement into qualified leads and revenue.',
      },
      {
        name: 'AI Automation',
        description: 'Next-generation workflow automation and intelligent tooling to streamline operations and reduce manual overhead.',
      },
    ],
    faqs: [
      {
        question: 'How long does it take to build a website?',
        answer: 'Most projects are completed in 3 to 6 weeks depending on scope and complexity. A landing page or portfolio site can go live in as little as 2 weeks, while a full e-commerce build or brand identity system typically takes 4 to 8 weeks. We always agree on a clear timeline before we start.',
      },
      {
        question: 'How much does a project with SO Agency cost?',
        answer: 'Every project is scoped individually because no two businesses are the same. As a reference, web design and development projects start from $1,500 USD, and branding packages from $800 USD. We offer flexible payment plans and can tailor a package to your budget. Book a free diagnostic call and we will give you a precise quote with no surprises.',
      },
      {
        question: 'What services does SO Agency offer?',
        answer: 'We cover the full digital launch stack: web design and development, UX/UI design, e-commerce, branding and visual identity, social media strategy, and AI automation. Whether you need one service or the entire suite, we operate as an extension of your team.',
      },
      {
        question: 'Do I need to have a brand identity before building a website?',
        answer: 'Not at all. Many of our clients come to us at the very start of their journey. We can handle branding first and then carry that identity seamlessly into your website — or we can do both in parallel to save time. We will recommend the best approach during your diagnostic call.',
      },
      {
        question: 'Will my website be optimized for search engines?',
        answer: 'Yes. Every site we build follows current SEO best practices: semantic HTML, performance optimization, proper metadata, Open Graph tags, structured data (JSON-LD), and a sitemap. If you need ongoing SEO strategy or content, we can include that as part of a growth plan.',
      },
      {
        question: 'What happens after the project is launched?',
        answer: 'Launch is not the end — it is the beginning of orbit. We offer post-launch support packages that include performance monitoring, content updates, security patches, and ongoing marketing. You will never be left alone after go-live.',
      },
      {
        question: 'Can SO Agency work with clients outside Latin America?',
        answer: 'Absolutely. We work with clients across Latin America, the United States, Europe, and beyond. Our team operates remotely and communicates in both English and Spanish, so distance is never a barrier to great work.',
      },
    ],
  },
  es: {
    description: 'SO Agency transforma ideas de negocio en presencias digitales de alto rendimiento — desde sitios web impactantes hasta identidades de marca completas. Tu socio de lanzamiento digital.',
    services: [
      {
        name: 'Diseño y Desarrollo Web',
        description: 'Sitios web personalizados y de alto rendimiento construidos sobre tecnologías modernas. Plataformas que mantienen a los usuarios comprometidos y convierten visitas en clientes.',
      },
      {
        name: 'Diseño UX/UI',
        description: 'Interfaces intuitivas y orientadas a la conversión. Cada píxel tiene un propósito: guiar al usuario hacia los objetivos de tu negocio.',
      },
      {
        name: 'Soluciones E-Commerce',
        description: 'Diseño y desarrollo integral de tiendas en línea para transacciones sin fricciones, máxima conversión y crecimiento escalable.',
      },
      {
        name: 'Branding e Identidad',
        description: 'Sistemas de identidad visual completos — logos, guías de marca, tipografía y sistemas de color — que establecen autoridad en tu industria.',
      },
      {
        name: 'Marketing en Redes Sociales',
        description: 'Estrategias de contenido calculadas y campañas basadas en datos que convierten el engagement social en leads calificados e ingresos.',
      },
      {
        name: 'Automatización con IA',
        description: 'Automatización de flujos de trabajo de próxima generación y herramientas inteligentes para optimizar operaciones y reducir la carga manual.',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo tarda en construirse un sitio web?',
        answer: 'La mayoría de los proyectos se completan en 3 a 6 semanas según el alcance y la complejidad. Una landing page o portafolio puede estar en vivo en tan solo 2 semanas, mientras que un e-commerce completo o un sistema de identidad de marca suele tomar de 4 a 8 semanas. Siempre acordamos un cronograma claro antes de comenzar.',
      },
      {
        question: '¿Cuánto cuesta un proyecto con SO Agency?',
        answer: 'Cada proyecto se planifica individualmente porque ningún negocio es igual. Como referencia, los proyectos de diseño y desarrollo web comienzan desde $1,500 USD, y los paquetes de branding desde $800 USD. Ofrecemos planes de pago flexibles y podemos adaptar un paquete a tu presupuesto. Agenda una llamada de diagnóstico gratuita y te daremos una cotización precisa sin sorpresas.',
      },
      {
        question: '¿Qué servicios ofrece SO Agency?',
        answer: 'Cubrimos todo el stack de lanzamiento digital: diseño y desarrollo web, diseño UX/UI, e-commerce, branding e identidad visual, estrategia de redes sociales y automatización con IA. Ya sea que necesites un solo servicio o toda la suite, operamos como una extensión de tu equipo.',
      },
      {
        question: '¿Necesito tener una identidad de marca antes de construir un sitio web?',
        answer: 'Para nada. Muchos de nuestros clientes llegan a nosotros al inicio de su camino. Podemos encargarnos primero del branding y luego llevar esa identidad de manera fluida a tu sitio web, o hacer ambas cosas en paralelo para ahorrar tiempo. Te recomendaremos el mejor enfoque durante tu llamada de diagnóstico.',
      },
      {
        question: '¿Mi sitio web estará optimizado para los motores de búsqueda?',
        answer: 'Sí. Cada sitio que construimos sigue las mejores prácticas SEO actuales: HTML semántico, optimización de rendimiento, metadatos correctos, etiquetas Open Graph, datos estructurados (JSON-LD) y un sitemap. Si necesitas estrategia SEO continua o contenido, podemos incluirlo como parte de un plan de crecimiento.',
      },
      {
        question: '¿Qué sucede después del lanzamiento del proyecto?',
        answer: 'El lanzamiento no es el final — es el inicio de la órbita. Ofrecemos paquetes de soporte post-lanzamiento que incluyen monitoreo de rendimiento, actualizaciones de contenido, parches de seguridad y marketing continuo. Nunca te dejaremos solo después del go-live.',
      },
      {
        question: '¿SO Agency puede trabajar con clientes fuera de Latinoamérica?',
        answer: 'Absolutamente. Trabajamos con clientes en toda América Latina, Estados Unidos, Europa y más allá. Nuestro equipo opera de forma remota y se comunica tanto en inglés como en español, por lo que la distancia nunca es una barrera para un gran trabajo.',
      },
    ],
  },
}

export function SchemaMarkup({ locale, baseUrl }: Props) {
  const { description, services, faqs } = content[locale]
  const pageUrl = `${baseUrl}/${locale}/`

  const graph = [
    // 1. Organization
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'SO Agency',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
      },
      description,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'Spanish'],
        url: WHATSAPP_URL,
      },
      sameAs: [
        'https://soagency.dev',
        'https://www.instagram.com/soagency.dev',
      ],
      foundingDate: '2023',
      knowsLanguage: ['en', 'es'],
      areaServed: {
        '@type': 'Place',
        name: 'Worldwide',
      },
    },
    // 2. WebSite with SearchAction
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'SO Agency',
      description,
      publisher: { '@id': `${baseUrl}/#organization` },
      inLanguage: [locale],
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/${locale}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    // 3. WebPage
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: BRAND_TITLE,
      description,
      isPartOf: { '@id': `${baseUrl}/#website` },
      about: { '@id': `${baseUrl}/#organization` },
      inLanguage: locale,
    },
    // 4. ProfessionalService with OfferCatalog
    {
      '@type': 'ProfessionalService',
      '@id': `${baseUrl}/#service`,
      name: 'SO Agency',
      url: pageUrl,
      image: `${baseUrl}/og-image.png`,
      description,
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Credit Card, Bank Transfer',
      openingHours: 'Mo-Fr 09:00-18:00',
      areaServed: { '@type': 'Place', name: 'Worldwide' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: locale === 'en' ? 'Digital Agency Services' : 'Servicios de Agencia Digital',
        itemListElement: services.map((svc, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            description: svc.description,
            provider: { '@id': `${baseUrl}/#organization` },
            url: pageUrl,
          },
        })),
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['English', 'Spanish'],
        url: WHATSAPP_URL,
      },
    },
    // 5. BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: pageUrl,
        },
      ],
    },
    // 6. FAQPage
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
