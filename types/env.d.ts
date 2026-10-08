declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_SITE_URL: string

    readonly NEXT_PUBLIC_SUPABASE_URL: string
    readonly NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: string
    readonly SUPABASE_SECRET_KEY: string

    readonly PLAID_CLIENT_ID: string
    readonly PLAID_SECRET: string
    readonly PLAID_ENV: string
    readonly PLAID_PRODUCTS: string
    readonly PLAID_COUNTRY_CODES: string

    readonly DWOLLA_KEY: string
    readonly DWOLLA_SECRET: string
    readonly DWOLLA_BASE_URL: string
    readonly DWOLLA_ENV: string
  }
}
