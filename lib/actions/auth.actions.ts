'use server'

import { redirect } from 'next/navigation'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { extractCustomerIdFromUrl, signInFormSchema, signUpFormSchema } from '@/lib/utils'

import { createDwollaCustomer } from './dwolla.actions'
import { toUser } from './user.actions'

type AuthActionResult = { error: string }
type SignUpActionResult = AuthActionResult | { user: User }

export async function signIn(input: unknown): Promise<AuthActionResult> {
  const parsed = signInFormSchema.safeParse(input)
  if (!parsed.success) return { error: 'Invalid email or password' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error) return { error: error.message }

  redirect('/')
}

export async function signUp(input: unknown): Promise<SignUpActionResult> {
  const parsed = signUpFormSchema.safeParse(input)
  if (!parsed.success) return { error: 'Please check the highlighted fields' }

  const { password, ...userData } = parsed.data
  const { email, firstName, lastName, address1, city, state, postalCode, dateOfBirth } = userData

  const supabase = await createClient()

  // Creates the auth user, sets the session cookies, and the trigger creates the public.users row.
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        address1,
        city,
        state,
        postal_code: postalCode,
        date_of_birth: dateOfBirth
      }
    }
  })
  if (error) return { error: error.message }
  if (!data.user || !data.session) return { error: 'Please confirm your email to continue' }

  const userId = data.user.id
  const admin = createAdminClient()

  try {
    // The SSN is sent to Dwolla only and never stored.
    const dwollaCustomerUrl = await createDwollaCustomer({ ...userData, type: 'personal' })
    if (!dwollaCustomerUrl) throw new Error('Error creating Dwolla customer')

    const { data: row, error: rowError } = await admin
      .from('users')
      .update({
        dwolla_customer_id: extractCustomerIdFromUrl(dwollaCustomerUrl),
        dwolla_customer_url: dwollaCustomerUrl
      })
      .eq('id', userId)
      .select()
      .single()
    if (rowError) throw new Error(`Error saving Dwolla customer: ${rowError.message}`)

    return { user: toUser(row, email) }
  } catch (err) {
    console.error('Sign-up failed, rolling back the new user:', err)

    // Deleting the auth user cascades to public.users, so the email can sign up again.
    await admin.auth.admin.deleteUser(userId)
    await supabase.auth.signOut()

    return { error: 'Could not create your account. Please try again.' }
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/sign-in')
}
