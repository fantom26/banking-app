import { Geist } from 'next/font/google'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import ThemeScript from '@/app/_components/ThemeScript'
import { routing } from '@/app/_i18n/routing'

import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
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
    <html lang={locale} className={`${geist.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className='flex min-h-full flex-col'>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
