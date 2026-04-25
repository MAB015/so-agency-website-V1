import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Geist, Geist_Mono, Audiowide, Roboto } from 'next/font/google'
import { SmoothScroll } from '@/components/smooth-scroll'
import { CustomCursor } from '@/components/custom-cursor'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _audiowide = Audiowide({ subsets: ['latin'], weight: ["400"], variable: "--font-display" })
const _roboto = Roboto({ subsets: ['latin'], weight: ["400","500","700","900"], variable: "--font-roboto" })

export const metadata: Metadata = {
  title: 'SO Agency | Design. Build. Launch.',
  description: 'We transform your business ideas into high-performing digital presences — from stunning websites to complete brand identities. Your digital launch partner.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background scroll-smooth">
      <body className={`font-sans antialiased ${_audiowide.variable} ${_roboto.variable}`}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
