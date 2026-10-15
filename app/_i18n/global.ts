import type { formats } from './formats'

// Type-checks format names passed to useFormatter/getFormatter
declare module 'next-intl' {
  interface AppConfig {
    Formats: typeof formats
  }
}
