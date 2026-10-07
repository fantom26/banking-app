'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { signInFormSchema, signUpFormSchema } from '@/lib/utils'

type AuthActionResult = { error: string }

export async function signIn(input: unknown): Promise<AuthActionResult> {
  const parsed = signInFormSchema.safeParse(input)
  if (!parsed.success) return { error: 'Invalid email or password' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)
  if (error) return { error: error.message }

  redirect('/')
}

export async function signUp(input: unknown): Promise<AuthActionResult> {
  const parsed = signUpFormSchema.safeParse(input)
  if (!parsed.success) return { error: 'Please check the highlighted fields' }

  const { email, password, firstName, lastName, address1, city, state, postalCode, dateOfBirth } =
    parsed.data

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
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

  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()

  redirect('/sign-in')
}
