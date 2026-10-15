'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import Icon from '@/app/_components/Icon'
import { Button } from '@/app/_components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Textarea } from '@/app/_components/ui/textarea'
import { useRouter } from '@/app/_i18n/navigation'
import { transferFunds } from '@/app/_lib/actions/transfer.actions'
import { type TransferFormParams, transferFormSchema } from '@/app/_lib/utils'

import { BankDropdown } from './BankDropdown'

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter()
  const t = useTranslations('Transfer')
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<TransferFormParams>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      name: '',
      email: '',
      amount: '',
      senderBank: '',
      sharableId: ''
    }
  })

  const submit = async (data: TransferFormParams) => {
    setIsLoading(true)

    try {
      const result = await transferFunds(data)

      if ('error' in result) {
        form.setError('root', { message: result.error })
      } else {
        form.reset()
        router.push('/')
      }
    } catch (error) {
      console.error('Submitting create transfer request failed: ', error)
      form.setError('root', { message: t('genericError') })
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='flex flex-col'>
        <FormField
          control={form.control}
          name='senderBank'
          render={() => (
            <FormItem className='border-t border-gray-200'>
              <div className='payment-transfer_form-item pt-5 pb-6'>
                <div className='payment-transfer_form-content'>
                  <FormLabel className='text-14 font-medium text-gray-700'>
                    {t('sourceBankLabel')}
                  </FormLabel>
                  <FormDescription className='text-12 font-normal text-gray-600'>
                    {t('sourceBankDescription')}
                  </FormDescription>
                </div>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles='!w-full'
                    />
                  </FormControl>
                  <FormMessage className='text-12 text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='border-t border-gray-200'>
              <div className='payment-transfer_form-item pt-5 pb-6'>
                <div className='payment-transfer_form-content'>
                  <FormLabel className='text-14 font-medium text-gray-700'>
                    {t('noteLabel')}
                  </FormLabel>
                  <FormDescription className='text-12 font-normal text-gray-600'>
                    {t('noteDescription')}
                  </FormDescription>
                </div>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Textarea
                      placeholder={t('notePlaceholder')}
                      className='input-class'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-12 text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className='payment-transfer_form-details'>
          <h2 className='text-18 font-semibold text-gray-900'>{t('recipientHeading')}</h2>
          <p className='text-16 font-normal text-gray-600'>{t('recipientDescription')}</p>
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='border-t border-gray-200'>
              <div className='payment-transfer_form-item py-5'>
                <FormLabel className='w-full max-w-[280px] text-14 font-medium text-gray-700'>
                  {t('emailLabel')}
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input placeholder={t('emailPlaceholder')} className='input-class' {...field} />
                  </FormControl>
                  <FormMessage className='text-12 text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='sharableId'
          render={({ field }) => (
            <FormItem className='border-t border-gray-200'>
              <div className='payment-transfer_form-item pt-6 pb-5'>
                <FormLabel className='w-full max-w-[280px] text-14 font-medium text-gray-700'>
                  {t('sharableIdLabel')}
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      placeholder={t('sharableIdPlaceholder')}
                      className='input-class'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-12 text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem className='border-y border-gray-200'>
              <div className='payment-transfer_form-item py-5'>
                <FormLabel className='w-full max-w-[280px] text-14 font-medium text-gray-700'>
                  {t('amountLabel')}
                </FormLabel>
                <div className='flex w-full flex-col'>
                  <FormControl>
                    <Input
                      placeholder={t('amountPlaceholder')}
                      className='input-class'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className='text-12 text-red-500' />
                </div>
              </div>
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <p className='pt-5 text-14 text-red-500'>{form.formState.errors.root.message}</p>
        )}

        <div className='payment-transfer_btn-box'>
          <Button type='submit' className='payment-transfer_btn' disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name='loader' className='size-5 animate-spin' /> &nbsp; {t('sending')}
              </>
            ) : (
              t('submit')
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PaymentTransferForm
