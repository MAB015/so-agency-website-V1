import { redirect } from 'next/navigation'
import type { Locale } from '@/lib/i18n/types'
import { getDictionary, locales } from '@/lib/i18n'
import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { Process } from '@/components/process'
import { Benefits } from '@/components/benefits'
import { Portfolio } from '@/components/portfolio'
import { Team } from '@/components/team'
import { FAQ } from '@/components/faq'
import { CTASection } from '@/components/cta-section'
import { Footer } from '@/components/footer'
import { WebMCPTools } from '@/components/webmcp-tools'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocalePage({ params }: Props) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'

  if (!locales.includes(locale as Locale)) {
    redirect('/en/')
  }

  const dict = getDictionary(locale as Locale)

  return (
    <main className="min-h-screen">
      <WebMCPTools dict={dict} />
      <Navbar dict={dict} />
      <Hero dict={dict} />
      <Services dict={dict} />
      <Process dict={dict} />
      <Benefits dict={dict} />
      <Portfolio dict={dict} />
      <Team dict={dict} />
      <FAQ dict={dict} />
      <CTASection dict={dict} />
      <Footer dict={dict} />
    </main>
  )
}
