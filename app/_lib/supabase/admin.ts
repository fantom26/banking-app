import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/types/database.types'

import 'server-only'

// Bypasses RLS. Only use for writes the user must not be able to make themselves.
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  )
}
