export type Locale = 'en' | 'es'

export interface Dictionary {
  locale: Locale
  notFound: {
    headline: string
    subheading: string
    description: string
    backHome: string
    contactUs: string
  }
  navbar: {
    links: { label: string; href: string }[]
    cta: string
  }
  hero: {
    badge: string
    headline: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
  }
  services: {
    sectionTitle: string
    sectionDescription: string
    /** Label of the per-card WhatsApp button. */
    cta: string
    /** WhatsApp message for the per-card button. `{service}` is replaced with the title. */
    ctaMessage: string
    items: {
      title: string
      description: string
      badge?: string
    }[]
  }
  process: {
    sectionTitle: string
    sectionDescription: string
    steps: {
      number: string
      title: string
      subtitle: string
      description: string
    }[]
  }
  benefits: {
    sectionTitle: string
    sectionDescription: string
    items: {
      title: string
      description: string
    }[]
  }
  portfolio: {
    eyebrow: string
    sectionTitle: string
    visitWebsite: string
    pauseAutoplay: string
    resumeAutoplay: string
    previousProject: string
    nextProject: string
    projects: {
      title: string
      subtitle: string
      description: string
      tags: string[]
    }[]
  }
  team: {
    sectionTitle: string
    sectionDescription: string
    members: {
      name: string
      label: string
      description: string
    }[]
  }
  cta: {
    headline: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    responseTime: string
    /** WhatsApp message for the contact section's buttons. */
    whatsappMessage: string
  }
  faq: {
    sectionTitle: string
    sectionDescription: string
    items: {
      question: string
      answer: string
    }[]
  }
  footer: {
    description: string
    /** Heading for the services column, whose links come from `services.items`. */
    servicesTitle: string
    columns: {
      title: string
      links: { label: string; href: string }[]
    }[]
    social: { label: string; href: string }[]
    copyright: string
    privacy: string
    terms: string
  }
}
