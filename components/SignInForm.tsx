'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { signInFormSchema } from '@/lib/utils'

import CustomInput from './CustomInput'

const SignInForm = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true)

    try {
      // logic
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer flex items-center gap-1'>
          <Image src='/icons/logo.svg' width={34} height={34} alt='Horizon logo' />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>

        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
            {user ? 'Link Account' : 'Sign In'}
            <p className='text-16 font-normal text-gray-600'>
              {user ? 'Link your account to get started' : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <CustomInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter your email'
              />
              <CustomInput
                control={form.control}
                name='password'
                label='Password'
                placeholder='Enter your password'
              />
              <div className='flex flex-col gap-4'>
                <Button type='submit' disabled={isLoading} className='form-btn'>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className='flex justify-center gap-1'>
            <p className='text-14 font-normal text-gray-600'>Don&apos;t have an account?</p>
            <Link href='/sign-up' className='form-link'>
              Sign up
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default SignInForm
