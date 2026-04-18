import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://cxowork.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CXOwork — Executive talent, on your terms.',
    template: '%s | CXOwork',
  },
  description:
    'CXOwork connects growing companies with battle-tested fractional CFOs, CMOs, CTOs and COOs — without the full-time cost or six-month search.',
  keywords: [
    'fractional executive',
    'fractional CFO',
    'fractional CMO',
    'fractional CTO',
    'fractional COO',
    'executive talent',
    'on-demand leadership',
    'interim executive',
    'C-suite',
    'CXOwork',
  ],
  authors: [{ name: 'CXOwork', url: siteUrl }],
  creator: 'CXOwork',
  publisher: 'CXOwork',
  applicationName: 'CXOwork',
  category: 'Business',
  classification: 'Fractional Executive Platform',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'CXOwork',
    title: 'CXOwork — Executive talent, on your terms.',
    description:
      'CXOwork connects growing companies with battle-tested fractional CFOs, CMOs, CTOs and COOs — without the full-time cost or six-month search.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CXOwork — Fractional executive platform for growing companies',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CXOwork — Executive talent, on your terms.',
    description:
      'CXOwork connects growing companies with battle-tested fractional CFOs, CMOs, CTOs and COOs — without the full-time cost or six-month search.',
    images: ['/og-image.png'],
    creator: '@cxowork',
    site: '@cxowork',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
