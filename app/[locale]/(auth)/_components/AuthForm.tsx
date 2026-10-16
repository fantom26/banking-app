'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useLocale, useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Icon from '@/app/_components/Icon'
import Logo from '@/app/_components/Logo'
import PlaidLink from '@/app/_components/PlaidLinks'
import { Button } from '@/app/_components/ui/button'
import { Form } from '@/app/_components/ui/form'
import { Link } from '@/app/_i18n/navigation'
import { signIn, signUp } from '@/app/_lib/actions/auth.actions'
import {
  signInFormSchema,
  type SignInParams,
  signUpFormSchema,
  type SignUpParams
} from '@/app/_lib/utils'

import CustomInput from './CustomInput'

type AuthFormValues = SignInParams | SignUpParams

type FieldName = keyof SignUpParams

const AuthForm = ({ type }: AuthFormProps) => {
  const locale = useLocale()
  const t = useTranslations('Auth')
  const [user, setUser] = useState<User | null>(null)

  const formSchema = type === 'sign-in' ? signInFormSchema : signUpFormSchema

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address1: '',
      city: '',
      state: '',
      postalCode: '',
      dateOfBirth: '',
      ssn: ''
    }
  })

  const { isSubmitting, errors } = form.formState

  const onSubmit = async (data: AuthFormValues) => {
    const result =
      type === 'sign-up' && 'firstName' in data
        ? await signUp(data)
        : await signIn({ email: data.email, password: data.password }, locale)

    if ('user' in result) setUser(result.user)
    else form.setError('root', { message: result.error })
  }

  const title = user
    ? t('linkAccountTitle')
    : type === 'sign-in'
      ? t('signInTitle')
      : t('signUpTitle')
  const subtitle = user
    ? t('linkAccountSubtitle')
    : type === 'sign-in'
      ? t('signInSubtitle')
      : t('signUpSubtitle')

  const input = (name: FieldName) => (
    <CustomInput
      control={form.control}
      name={name}
      label={t(`fields.${name}.label`)}
      placeholder={t(`fields.${name}.placeholder`)}
    />
  )

  return (
    <section className='flex w-full max-w-105 flex-col gap-7'>
      <Link
        href='/'
        className='w-fit rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
      >
        <Logo size='lg' />
      </Link>

      <header className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold tracking-tight md:text-4xl'>{title}</h1>
        <p className='text-body text-muted-foreground'>{subtitle}</p>
      </header>

      {user ? (
        <PlaidLink user={user} size='lg' className='w-full' />
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3.5'>
              {type === 'sign-up' && (
                <>
                  <div className='grid gap-3 sm:grid-cols-2'>
                    {input('firstName')}
                    {input('lastName')}
                  </div>
                  {input('address1')}
                  <div className='grid gap-3 sm:grid-cols-[1.6fr_0.7fr_1fr]'>
                    {input('city')}
                    {input('state')}
                    {input('postalCode')}
                  </div>
                  <div className='grid gap-3 sm:grid-cols-2'>
                    {input('dateOfBirth')}
                    {input('ssn')}
                  </div>
                </>
              )}

              {input('email')}
              {input('password')}

              {errors.root && (
                <p role='alert' className='text-sm text-destructive'>
                  {errors.root.message}
                </p>
              )}

              <Button type='submit' size='lg' disabled={isSubmitting} className='mt-1.5 w-full'>
                {isSubmitting ? (
                  <>
                    <Icon name='loader' className='animate-spin' />
                    {t('loading')}
                  </>
                ) : type === 'sign-in' ? (
                  t('signInButton')
                ) : (
                  t('signUpButton')
                )}
              </Button>
            </form>
          </Form>

          <p className='flex flex-wrap justify-center gap-1.5 text-sm text-muted-foreground'>
            {type === 'sign-in' ? t('noAccount') : t('haveAccount')}
            <Link
              href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
              className='font-semibold text-accent-foreground hover:underline'
            >
              {type === 'sign-in' ? t('signUpLink') : t('signInLink')}
            </Link>
          </p>
        </>
      )}
    </section>
  )
}

export default AuthForm
