import { notFound } from 'next/navigation'
import * as rootParams from 'next/root-params'

import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'

import { formats } from './formats'
import { routing } from './routing'

// next/root-params is unavailable in Server Actions, so actions pass `locale` explicitly
// (e.g. getTranslations({ locale })) and it takes precedence over the [locale] segment
export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale()
    if (!hasLocale(routing.locales, paramValue)) notFound()
    locale = paramValue
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    formats,
    // Fixed so server and client render the same times. Plaid's date-only values parse as
    // UTC midnight, so UTC also keeps them on the right day.
    timeZone: 'UTC'
  }
})
