import { type NextRequest, NextResponse } from 'next/server'

import { createServerClient, type SetAllCookies } from '@supabase/ssr'

import { routing } from '@/app/_i18n/routing'
import type { Database } from '@/types/database.types'

const AUTH_ROUTES = ['/sign-in', '/sign-up']

export async function updateSession(
  request: NextRequest,
  handleI18nRouting: (request: NextRequest) => NextResponse
) {
  let cookiesToApply: Parameters<SetAllCookies>[0] = []
  // Cache headers set by @supabase/ssr whenever it writes auth cookies
  let headersToApply: Parameters<SetAllCookies>[1] = {}

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          // Updating the request cookies also updates its `cookie` header, which next-intl
          // forwards to Server Components, so they see the refreshed session
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          cookiesToApply = cookiesToSet
          headersToApply = headers
        }
      }
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims()
  const isAuthenticated = Boolean(data?.claims)

  const applySession = (response: NextResponse) => {
    cookiesToApply.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
    Object.entries(headersToApply).forEach(([key, value]) => response.headers.set(key, value))
    return response
  }

  // Locale redirects (e.g. /en/sign-in -> /sign-in) go first; auth runs on the follow-up request
  const i18nResponse = handleI18nRouting(request)
  if (i18nResponse.headers.has('location')) return applySession(i18nResponse)

  const { locale, pathname } = splitLocale(request.nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  // Server Actions are POSTs to the page they run on. A redirect breaks the action
  // response, and each action checks auth itself.
  const isServerAction = request.headers.has('next-action')

  if (!isAuthenticated && !isAuthRoute)
    return redirectTo(request, localizePath(locale, '/sign-in'), applySession)
  if (isAuthenticated && isAuthRoute && !isServerAction)
    return redirectTo(request, localizePath(locale, '/'), applySession)

  return applySession(i18nResponse)
}

function splitLocale(pathname: string) {
  const [, segment, ...rest] = pathname.split('/')
  const locale = routing.locales.find((l) => l === segment)
  if (!locale) return { locale: routing.defaultLocale, pathname }

  return { locale, pathname: `/${rest.join('/')}` }
}

// With localePrefix 'as-needed' only non-default locales carry a prefix
function localizePath(locale: string, pathname: string) {
  if (locale === routing.defaultLocale) return pathname

  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
}

function redirectTo(
  request: NextRequest,
  pathname: string,
  applySession: (response: NextResponse) => NextResponse
) {
  const url = request.nextUrl.clone()
  url.pathname = pathname

  return applySession(NextResponse.redirect(url))
}
