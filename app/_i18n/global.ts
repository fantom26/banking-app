import type en from '../../messages/en.json'
import type { formats } from './formats'

// Type-checks format names and message keys passed to next-intl
declare module 'next-intl' {
  interface AppConfig {
    Formats: typeof formats
    Messages: typeof en
  }
}
