import { hasLocale } from 'next-intl'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  // English keeps unprefixed URLs (/sign-in), other locales get a prefix (/es/sign-in)
  localePrefix: 'as-needed'
})

export type Locale = (typeof routing.locales)[number]

// For locales that arrive untyped, e.g. as a Server Action argument
export const toLocale = (locale: unknown): Locale =>
  hasLocale(routing.locales, locale) ? locale : routing.defaultLocale

// Each language is named in its own language, so these are not translated
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français'
}
