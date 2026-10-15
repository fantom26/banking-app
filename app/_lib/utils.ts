import qs from 'query-string'
import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const signUpFormSchema = z.object({
  ...signInFormSchema.shape,
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  address1: z.string().max(50),
  city: z.string().max(50),
  state: z.string().length(2),
  postalCode: z.string().min(3).max(6),
  dateOfBirth: z.iso.date(),
  ssn: z.string().min(3)
})

export const transferFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(4, 'Transfer note is too short'),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, 'Enter an amount like 5.00')
    .refine((value) => Number(value) > 0, 'Amount must be greater than 0'),
  senderBank: z.string().min(1, 'Please select a valid bank account'),
  sharableId: z.string().min(8, 'Please select a valid sharable Id')
})

export type SignInParams = z.infer<typeof signInFormSchema>
export type SignUpParams = z.infer<typeof signUpFormSchema>
export type TransferFormParams = z.infer<typeof transferFormSchema>

export const parseStringify = (value: unknown) => JSON.parse(JSON.stringify(value))

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, '')
}

interface UrlQueryParams {
  params: string
  key: string
  value: string
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params)

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  )
}

export function lastPathSegment(url: string) {
  return url.split('/').pop() ?? ''
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date()
  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(today.getDate() - 2)

  return date > twoDaysAgo ? 'Processing' : 'Success'
}
