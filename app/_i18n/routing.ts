import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  // English keeps unprefixed URLs (/sign-in), other locales get a prefix (/es/sign-in)
  localePrefix: 'as-needed'
})

export type Locale = (typeof routing.locales)[number]

// Each language is named in its own language, so these are not translated
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español'
}
