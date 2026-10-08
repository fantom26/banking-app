import { type NextRequest, NextResponse } from 'next/server'

import { createServerClient } from '@supabase/ssr'

import type { Database } from '@/types/database.types'

const AUTH_ROUTES = ['/sign-in', '/sign-up']
// Set by @supabase/ssr whenever it writes auth cookies
const CACHE_HEADERS = ['cache-control', 'expires', 'pragma']

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

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
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value)
          )
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

  const { pathname } = request.nextUrl
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  // Server Actions are POSTs to the page they run on. A redirect breaks the action
  // response, and each action checks auth itself.
  const isServerAction = request.headers.has('next-action')

  if (!isAuthenticated && !isAuthRoute) return redirectTo(request, '/sign-in', supabaseResponse)
  if (isAuthenticated && isAuthRoute && !isServerAction)
    return redirectTo(request, '/', supabaseResponse)

  return supabaseResponse
}

function redirectTo(request: NextRequest, pathname: string, supabaseResponse: NextResponse) {
  const url = request.nextUrl.clone()
  url.pathname = pathname

  const response = NextResponse.redirect(url)
  supabaseResponse.cookies.getAll().forEach((cookie) => response.cookies.set(cookie))
  CACHE_HEADERS.forEach((key) => {
    const value = supabaseResponse.headers.get(key)
    if (value) response.headers.set(key, value)
  })

  return response
}
