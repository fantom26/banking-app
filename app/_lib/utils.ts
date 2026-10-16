import { z } from 'zod'

// Error messages are keys of the Validation messages; FormMessage translates them
export const signInFormSchema = z.object({
  email: z.string().email('invalidEmail'),
  password: z.string().min(8, 'passwordMin')
})

export const signUpFormSchema = z.object({
  ...signInFormSchema.shape,
  firstName: z.string().min(3, 'firstNameMin'),
  lastName: z.string().min(3, 'lastNameMin'),
  address1: z.string().max(50, 'addressMax'),
  city: z.string().max(50, 'cityMax'),
  state: z.string().length(2, 'stateLength'),
  postalCode: z.string().min(3, 'postalCodeLength').max(6, 'postalCodeLength'),
  dateOfBirth: z.iso.date('dateOfBirth'),
  ssn: z.string().min(3, 'ssnMin')
})

export const transferFormSchema = z.object({
  email: z.string().email('invalidEmail'),
  name: z.string().min(4, 'transferNoteMin'),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'amountFormat')
    .refine((value) => Number(value) > 0, 'amountPositive'),
  senderBank: z.string().min(1, 'senderBankRequired'),
  sharableId: z.string().min(8, 'sharableIdMin')
})

export type SignInParams = z.infer<typeof signInFormSchema>
export type SignUpParams = z.infer<typeof signUpFormSchema>
export type TransferFormParams = z.infer<typeof transferFormSchema>

export const parseStringify = (value: unknown) => JSON.parse(JSON.stringify(value))

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, '')
}

// FOOD_AND_DRINK_COFFEE -> Food and drink coffee
export const humanize = (value: string) => {
  const text = value.toLowerCase().replaceAll('_', ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function lastPathSegment(url: string) {
  return url.split('/').pop() ?? ''
}
