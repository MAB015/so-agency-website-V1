import type { Dictionary } from './types'

export const en: Dictionary = {
  locale: 'en',
  notFound: {
    headline: 'Mission failed. Rocket crash detected.',
    subheading: '404 — This page has left the orbit.',
    description: 'The page you\'re looking for doesn\'t exist or has been lost in space. Let\'s get you back on course.',
    backHome: 'Back to Orbit',
    contactUs: 'Contact Support',
  },
  navbar: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Team', href: '#team' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Get Started',
  },
  hero: {
    badge: 'Your Digital Launch Partner',
    headline: 'Your vision, our stellar design',
    slogan: 'Design. Build. Launch.',
    description:
      'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    ctaPrimary: 'Book Your Free Diagnostic',
    ctaSecondary: 'See Our Services',
  },
  services: {
    sectionTitle: 'Core Systems',
    sectionDescription:
      'Specialized services designed to ensure total business success across all digital channels.',
    items: [
      {
        title: 'Web Design & Dev',
        description:
          'Custom, performance-driven sites built on modern stacks. We engineer high-performance platforms that keep users engaged.',
      },
      {
        title: 'UX/UI Design',
        description:
          "Intuitive, conversion-focused interfaces. Every pixel serves a purpose in guiding the user's journey.",
      },
      {
        title: 'E-Commerce',
        description:
          'End-to-end online store solutions designed for frictionless transactions and maximum conversion.',
      },
      {
        title: 'Branding & Identity',
        description:
          'Full visual identity systems. We forge a unique signature that resonates across your industry, establishing undeniable authority.',
      },
      {
        title: 'Social Media',
        description:
          'Turning engagement into leads through calculated content strategies and data-driven campaigns.',
      },
      {
        title: 'AI Automation',
        description:
          'Streamlining operations with intelligent tools. Next-gen tech currently in development.',
        badge: 'Standby',
      },
    ],
  },
  process: {
    sectionTitle: 'How We Work',
    sectionDescription:
      'A proven process that takes you from idea to impact. Clear, collaborative, and built for speed.',
    steps: [
      {
        number: '01',
        title: 'Discovery',
        subtitle: 'Pre-Flight Check',
        description:
          'We dive deep into your business, understanding your goals, audience, and competitive landscape.',
      },
      {
        number: '02',
        title: 'Strategy',
        subtitle: 'Mission Planning',
        description:
          'Together, we craft a clear roadmap with defined milestones and measurable outcomes.',
      },
      {
        number: '03',
        title: 'Launch',
        subtitle: 'Liftoff',
        description: 'We execute with precision, delivering high-quality work on your timelines.',
      },
      {
        number: '04',
        title: 'Growth',
        subtitle: 'Orbit',
        description:
          'Ongoing support and optimization to keep your business scaling and thriving.',
      },
    ],
  },
  benefits: {
    sectionTitle: 'Why Clients Choose Us',
    sectionDescription:
      'We are not just another agency. We are your launch partners in your digital road, invested in your success.',
    items: [
      {
        title: 'Partner-Driven',
        description:
          'We work alongside you, not just for you. Your success is our mission — we are invested in your growth.',
      },
      {
        title: 'Fast Delivery',
        description:
          'Quality at speed. We move efficiently to hit your milestones without compromising on results.',
      },
      {
        title: 'Flexible Pricing',
        description:
          'Premium quality at accessible rates. Packages designed to fit businesses of all sizes.',
      },
      {
        title: 'End-to-End',
        description:
          'One team for branding, web, and marketing. Seamless execution across all your digital needs.',
      },
    ],
  },
  portfolio: {
    eyebrow: 'Selected Work',
    sectionTitle: 'Turning Ideas Into Masterpieces',
    visitWebsite: 'Visit Website',
    pauseAutoplay: 'Pause autoplay',
    resumeAutoplay: 'Resume autoplay',
    previousProject: 'Previous project',
    nextProject: 'Next project',
    projects: [
      {
        title: 'La Feika',
        subtitle: 'Fresh From China to LatAm',
        description:
          'E-commerce platform connecting Chinese fresh food suppliers with Latin American markets. A complete digital solution for cross-border commerce.',
        tags: ['E-Commerce', 'Web Development', 'Branding'],
      },
      {
        title: "It's Fuluz Time",
        subtitle: 'Cruelty-Free Leather Goods',
        description:
          'A great option for high-quality, completely Cruelty-Free leather goods. Their products range from handbags and wallets to more.',
        tags: ['Web Design', 'Web Development', 'Branding'],
      },
      {
        title: 'Yaku Adventures',
        subtitle: 'Tourism & Hiking Experiences',
        description:
          'Adventure tourism platform showcasing breathtaking hiking experiences and outdoor adventures across South America.',
        tags: ['Web Design', 'E-commerce', 'Web Development'],
      },
      {
        title: 'Singing Rooster',
        subtitle: 'A premium coffee, chocolate, and artisan marketplace',
        description:
          'Singing Rooster is an e-commerce website for coffee, chocolate, art, subscriptions, and wholesale/retail shopping experiences.',
        tags: ['Website Security', 'APP Development', 'Optimization'],
      },
    ],
  },
  team: {
    sectionTitle: 'Our Leadership',
    sectionDescription: 'The crew behind your mission to success.',
    members: [
      {
        name: 'Oscar & Miguel',
        label: 'Founding Partners',
        description:
          'The duo behind SO Agency. We design, build, and launch digital presences that actually perform — blending strategic development with sharp UX/UI design.',
      },
    ],
  },
  cta: {
    headline: 'Ready to Launch Your Digital Presence?',
    description:
      "Let's talk about your project and how we can help you reach new heights. Book a free diagnostic call today.",
    ctaPrimary: "Let's Make It Happen",
    ctaSecondary: 'Send a Message',
    responseTime: 'We typically respond within 24 hours',
  },
  faq: {
    sectionTitle: 'Frequently Asked Questions',
    sectionDescription: 'Everything you need to know before we launch together.',
    items: [
      {
        question: 'How long does it take to build a website?',
        answer:
          'Most projects are completed in 3 to 6 weeks depending on scope and complexity. A landing page or portfolio site can go live in as little as 2 weeks, while a full e-commerce build or brand identity system typically takes 4 to 8 weeks. We always agree on a clear timeline before we start.',
      },
      {
        question: 'How much does a project with SO Agency cost?',
        answer:
          'Every project is scoped individually because no two businesses are the same. As a reference, web design and development projects start from $1,500 USD, and branding packages from $800 USD. We offer flexible payment plans and can tailor a package to your budget. Book a free diagnostic call and we will give you a precise quote with no surprises.',
      },
      {
        question: 'What services does SO Agency offer?',
        answer:
          'We cover the full digital launch stack: web design and development, UX/UI design, e-commerce, branding and visual identity, social media strategy, and AI automation. Whether you need one service or the entire suite, we operate as an extension of your team.',
      },
      {
        question: 'Do I need to have a brand identity before building a website?',
        answer:
          'Not at all. Many of our clients come to us at the very start of their journey. We can handle branding first and then carry that identity seamlessly into your website — or we can do both in parallel to save time. We will recommend the best approach during your diagnostic call.',
      },
      {
        question: 'Will my website be optimized for search engines?',
        answer:
          'Yes. Every site we build follows current SEO best practices: semantic HTML, performance optimization, proper metadata, Open Graph tags, structured data (JSON-LD), and a sitemap. If you need ongoing SEO strategy or content, we can include that as part of a growth plan.',
      },
      {
        question: 'What happens after the project is launched?',
        answer:
          'Launch is not the end — it is the beginning of orbit. We offer post-launch support packages that include performance monitoring, content updates, security patches, and ongoing marketing. You will never be left alone after go-live.',
      },
      {
        question: 'Can SO Agency work with clients outside Latin America?',
        answer:
          'Absolutely. We work with clients across Latin America, the United States, Europe, and beyond. Our team operates remotely and communicates in both English and Spanish, so distance is never a barrier to great work.',
      },
    ],
  },
  footer: {
    tagline: 'Design. Build. Launch.',
    description:
      'Your digital launch partner. We help businesses launch and grow with strategic branding, web development, and marketing.',
    columns: [
      {
        title: 'Services',
        links: [
          { label: 'Web Design & Dev', href: '#services' },
          { label: 'Branding & Identity', href: '#services' },
          { label: 'E-Commerce', href: '#services' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Process', href: '#process' },
          { label: 'Team', href: '#team' },
          { label: 'Contact', href: '#contact' },
        ],
      },
    ],
    social: [
      { label: 'Twitter', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Instagram', href: '#' },
    ],
    copyright: 'SO Agency. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
  },
}
