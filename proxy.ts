import type { NextRequest } from 'next/server'

import createMiddleware from 'next-intl/middleware'

import { routing } from '@/app/_i18n/routing'
import { updateSession } from '@/app/_lib/supabase/proxy'

const handleI18nRouting = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  return updateSession(request, handleI18nRouting)
}

export const config = {
  matcher: [
    // Everything except Next.js internals and static assets
    '/((?!_next/static|_next/image|favicon.ico|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'
  ]
}
