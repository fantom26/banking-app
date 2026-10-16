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
    date: { month: 'short', day: 'numeric', year: 'numeric' },
    dayHeading: { weekday: 'long', month: 'short', day: 'numeric' },
    time: { hour: 'numeric', minute: 'numeric' }
  },
  number: {
    // Dwolla moves USD only, so amounts stay in dollars whatever the locale
    currency: { style: 'currency', currency: 'USD' },
    signedCurrency: { style: 'currency', currency: 'USD', signDisplay: 'exceptZero' },
    percent: { style: 'percent', maximumFractionDigits: 0 }
  }
} satisfies Formats
