import type { Metadata, Viewport } from 'next'
import { BRAND_TITLE } from '@/lib/brand'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Geist, Geist_Mono, Audiowide, Roboto } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'
import { StarBackground } from '@/components/star-background'
import { RightClickCTA } from '@/components/right-click-cta'
import Script from 'next/script'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _audiowide = Audiowide({ subsets: ['latin'], weight: ["400"], variable: "--font-display" })
const _roboto = Roboto({ subsets: ['latin'], weight: ["400","500","700","900"], variable: "--font-roboto" })

const BASE_URL = 'https://soagency.dev'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f5c000',
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: BRAND_TITLE,
  description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities. Your digital launch partner.',
  keywords: ['web design', 'digital agency', 'web development', 'branding', 'digital marketing', 'SO Agency'],
  generator: 'v0.app',
  openGraph: {
    title: BRAND_TITLE,
    description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
    url: BASE_URL,
    siteName: 'SO Agency',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: BRAND_TITLE,
    description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
  authors: [{ name: 'SO Agency', url: BASE_URL }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={BRAND_TITLE} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
      </head>
      <body className={`font-sans antialiased ${_audiowide.variable} ${_roboto.variable}`}>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1589857299225670');
          fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1589857299225670&ev=PageView&noscript=1"
          />
        </noscript>

        <StarBackground />
        <CustomCursor />
        <RightClickCTA />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
