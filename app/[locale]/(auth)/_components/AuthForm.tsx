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

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='flex cursor-pointer items-center gap-1'>
          <Logo size='lg' />
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 font-semibold text-gray-900 lg:text-36'>
            {user
              ? t('linkAccountTitle')
              : type === 'sign-in'
                ? t('signInTitle')
                : t('signUpTitle')}
            <p className='text-16 font-normal text-gray-600'>
              {user ? t('linkAccountSubtitle') : t('enterDetails')}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>
          <PlaidLink user={user} variant='primary' />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type === 'sign-up' && (
                <>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='firstName'
                      label={t('fields.firstName.label')}
                      placeholder={t('fields.firstName.placeholder')}
                    />
                    <CustomInput
                      control={form.control}
                      name='lastName'
                      label={t('fields.lastName.label')}
                      placeholder={t('fields.lastName.placeholder')}
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name='address1'
                    label={t('fields.address1.label')}
                    placeholder={t('fields.address1.placeholder')}
                  />
                  <CustomInput
                    control={form.control}
                    name='city'
                    label={t('fields.city.label')}
                    placeholder={t('fields.city.placeholder')}
                  />
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='state'
                      label={t('fields.state.label')}
                      placeholder={t('fields.state.placeholder')}
                    />
                    <CustomInput
                      control={form.control}
                      name='postalCode'
                      label={t('fields.postalCode.label')}
                      placeholder={t('fields.postalCode.placeholder')}
                    />
                  </div>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name='dateOfBirth'
                      label={t('fields.dateOfBirth.label')}
                      placeholder={t('fields.dateOfBirth.placeholder')}
                    />
                    <CustomInput
                      control={form.control}
                      name='ssn'
                      label={t('fields.ssn.label')}
                      placeholder={t('fields.ssn.placeholder')}
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name='email'
                label={t('fields.email.label')}
                placeholder={t('fields.email.placeholder')}
              />

              <CustomInput
                control={form.control}
                name='password'
                label={t('fields.password.label')}
                placeholder={t('fields.password.placeholder')}
              />

              {errors.root && <p className='form-message'>{errors.root.message}</p>}

              <div className='flex flex-col gap-4'>
                <Button type='submit' disabled={isSubmitting} className='form-btn'>
                  {isSubmitting ? (
                    <>
                      <Icon name='loader' className='size-5 animate-spin' /> &nbsp; {t('loading')}
                    </>
                  ) : type === 'sign-in' ? (
                    t('signInButton')
                  ) : (
                    t('signUpButton')
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>
              {type === 'sign-in' ? t('noAccount') : t('haveAccount')}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
              {type === 'sign-in' ? t('signUpLink') : t('signInLink')}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm
