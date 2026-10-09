import { cache } from 'react'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'

import 'server-only'

type UserRow = Database['public']['Tables']['users']['Row']
type BankRow = Database['public']['Tables']['banks']['Row']

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

function toBank(row: BankRow): Bank {
  return {
    id: row.id,
    userId: row.user_id,
    bankId: row.bank_id,
    accountId: row.account_id,
    accessToken: row.access_token,
    fundingSourceUrl: row.funding_source_url,
    sharableId: row.sharable_id
  }
}

// The admin client is needed to read access_token, so always filter by the owner.
export async function getBanks({ userId }: getBanksProps): Promise<Bank[]> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from('banks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at')

  if (error) throw new Error(`Failed to load banks: ${error.message}`)

  return data.map(toBank)
}

export async function getBank({ bankRecordId, userId }: getBankProps): Promise<Bank | null> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from('banks')
    .select('*')
    .eq('id', bankRecordId)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw new Error(`Failed to load bank: ${error.message}`)

  return data ? toBank(data) : null
}

export async function getBankBySharableId({
  sharableId
}: getBankBySharableIdProps): Promise<Bank | null> {
  const admin = createAdminClient()

  const { data, error } = await admin
    .from('banks')
    .select('*')
    .eq('sharable_id', sharableId)
    .maybeSingle()

  if (error) throw new Error(`Failed to load bank: ${error.message}`)

  return data ? toBank(data) : null
}
