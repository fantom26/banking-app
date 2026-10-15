import type { Formats } from 'next-intl'

export const formats = {
  dateTime: {
    withTime: {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    },
    date: { month: 'short', day: 'numeric', year: 'numeric' }
  },
  number: {
    // Dwolla moves USD only, so amounts stay in dollars whatever the locale
    currency: { style: 'currency', currency: 'USD' }
  }
} satisfies Formats
