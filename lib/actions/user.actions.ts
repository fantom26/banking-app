import { cache } from 'react'

import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'

import 'server-only'

type UserRow = Database['public']['Tables']['users']['Row']

export function toUser(row: UserRow, email: string): User {
  return {
    id: row.id,
    email,
    firstName: row.first_name,
    lastName: row.last_name,
    address1: row.address1,
    city: row.city,
    state: row.state,
    postalCode: row.postal_code,
    dateOfBirth: row.date_of_birth,
    dwollaCustomerId: row.dwolla_customer_id,
    dwollaCustomerUrl: row.dwolla_customer_url
  }
}

export const getLoggedInUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient()

  const { data: claimsData } = await supabase.auth.getClaims()
  const claims = claimsData?.claims
  if (!claims) return null

  const { data: row, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', claims.sub)
    .single()

  // Throw instead of returning null: the user is authenticated, so redirecting to
  // /sign-in would bounce straight back via proxy.ts and loop.
  if (error) throw new Error(`Failed to load user: ${error.message}`)

  return toUser(row, claims.email ?? '')
})
