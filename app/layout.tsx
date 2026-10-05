import { IBM_Plex_Serif, Inter } from 'next/font/google'

import type { Metadata } from 'next'

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

export const metadata: Metadata = {
  title: 'Horizon',
  description:
    'Horizon is a banking app that helps you manage your finances and achieve your financial goals.',
  icons: {
    icon: '/icons/logo.svg'
  }
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={`${inter.variable} ${ibmPlexSerif.variable} h-full antialiased`}>
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  )
}
