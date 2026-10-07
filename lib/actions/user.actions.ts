import { cache } from 'react'

import { createClient } from '@/lib/supabase/server'

export const getLoggedInUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient()

  const { data: claimsData } = await supabase.auth.getClaims()
  const claims = claimsData?.claims
  if (!claims) return null

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', claims.sub)
    .single()

  // Throw instead of returning null: the user is authenticated, so redirecting to
  // /sign-in would bounce straight back via proxy.ts and loop.
  if (error) throw new Error(`Failed to load profile: ${error.message}`)

  return {
    id: profile.id,
    email: claims.email ?? '',
    firstName: profile.first_name,
    lastName: profile.last_name,
    address1: profile.address1,
    city: profile.city,
    state: profile.state,
    postalCode: profile.postal_code,
    dateOfBirth: profile.date_of_birth
  }
})
