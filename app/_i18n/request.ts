import { notFound } from 'next/navigation'
import * as rootParams from 'next/root-params'

import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import en from '../../messages/en.json'
import { formats } from './formats'
import { routing } from './routing'

type Messages = { [key: string]: string | Messages }

// next/root-params is unavailable in Server Actions, so actions pass `locale` explicitly
// (e.g. getTranslations({ locale })) and it takes precedence over the [locale] segment
export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale()
    if (!hasLocale(routing.locales, paramValue)) notFound()
    locale = paramValue
  }

  // English is the source of truth; other locales override it key by key, so a string
  // not translated yet shows in English instead of failing
  const messages =
    locale === 'en' ? en : deepMerge(en, (await import(`../../messages/${locale}.json`)).default)

  return {
    locale,
    messages,
    formats,
    // Fixed so server and client render the same times. Plaid's date-only values parse as
    // UTC midnight, so UTC also keeps them on the right day.
    timeZone: 'UTC'
  }
})

function deepMerge(base: Messages, override: Messages): Messages {
  const merged: Messages = { ...base }

  for (const [key, value] of Object.entries(override)) {
    const baseValue = merged[key]
    merged[key] =
      typeof value === 'object' && typeof baseValue === 'object'
        ? deepMerge(baseValue, value)
        : value
  }

  return merged
}
