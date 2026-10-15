import { IBM_Plex_Serif, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { routing } from '@/app/_i18n/routing'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const ibmPlexSerif = IBM_Plex_Serif({
  variable: '--font-ibm-plex-serif',
  weight: ['400', '700'],
  subsets: ['latin']
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: '/icons/logo.svg'
    }
  }
}

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  return (
    <html lang={locale} className={`${inter.variable} ${ibmPlexSerif.variable} h-full antialiased`}>
      <body className='flex min-h-full flex-col'>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
