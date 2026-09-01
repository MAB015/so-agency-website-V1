import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/types'
import { locales } from '@/lib/i18n'
import { BRAND_TITLE } from '@/lib/brand'
import { SchemaMarkup } from '@/components/schema-markup'

const BASE_URL = 'https://soagency.dev'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'
  const lang = locale as Locale

  const descriptions: Record<Locale, string> = {
    en: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    es: 'Transformamos tus ideas de negocio en presencias digitales de alto rendimiento — desde sitios web impactantes hasta identidades de marca completas.',
  }

  return {
    title: BRAND_TITLE,
    description: descriptions[lang] ?? descriptions.en,
    alternates: {
      canonical: `${BASE_URL}/${lang}/`,
      languages: {
        'en': `${BASE_URL}/en/`,
        'es': `${BASE_URL}/es/`,
        'x-default': `${BASE_URL}/en/`,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'
  const lang = (locales.includes(locale as Locale) ? locale : 'en') as Locale

  return (
    <>
      <SchemaMarkup locale={lang} baseUrl={BASE_URL} />
      {children}
    </>
  )
}
