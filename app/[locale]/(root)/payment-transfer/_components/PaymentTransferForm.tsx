'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFormatter, useTranslations } from 'next-intl'
import { useForm, useWatch } from 'react-hook-form'

import Icon from '@/app/_components/Icon'
import { Button } from '@/app/_components/ui/button'
import { Card, CardTitle } from '@/app/_components/ui/card'
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

const labelClassName = 'text-sm font-semibold'
const messageClassName = 'text-caption'

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter()
  const format = useFormatter()
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

  const [senderBank, email, sharableId, amount] = useWatch({
    control: form.control,
    name: ['senderBank', 'email', 'sharableId', 'amount']
  })
  const sender = accounts.find((account) => account.bankRecordId === senderBank)
  const total = Number(amount) > 0 ? Number(amount) : 0

  const summary: [label: string, value: string][] = [
    [t('summaryTo'), email || sharableId || '—'],
    [t('summaryFrom'), sender ? `${sender.name} •••• ${sender.mask}` : '—'],
    [t('summaryMethod'), t('methodAch')]
  ]

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
      <form
        onSubmit={form.handleSubmit(submit)}
        className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_392px]'
      >
        <Card size='lg' className='gap-5.5'>
          <FormField
            control={form.control}
            name='senderBank'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>{t('sourceBankLabel')}</FormLabel>
                <FormControl>
                  <BankDropdown accounts={accounts} value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className={messageClassName} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='sharableId'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>{t('sharableIdLabel')}</FormLabel>
                <div className='relative'>
                  <Icon
                    name='hash'
                    className='pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground'
                  />
                  <FormControl>
                    <Input
                      placeholder={t('sharableIdPlaceholder')}
                      autoComplete='off'
                      className='pl-10 tabular-nums'
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormDescription className='text-caption'>
                  {t('sharableIdDescription')}
                </FormDescription>
                <FormMessage className={messageClassName} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>{t('emailLabel')}</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    autoComplete='email'
                    placeholder={t('emailPlaceholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={messageClassName} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='amount'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>{t('amountLabel')}</FormLabel>
                <div className='flex items-center gap-2 rounded-lg border border-input bg-card px-4.5 py-3 transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/25 has-aria-invalid:border-destructive'>
                  <span
                    aria-hidden
                    className='text-3xl font-bold tracking-tight text-muted-foreground md:text-[40px]'
                  >
                    $
                  </span>
                  <FormControl>
                    <input
                      inputMode='decimal'
                      autoComplete='off'
                      placeholder={t('amountPlaceholder')}
                      className='min-w-0 flex-1 bg-transparent text-3xl leading-tight font-bold tracking-tight tabular-nums outline-none placeholder:text-placeholder md:text-[40px]'
                      {...field}
                    />
                  </FormControl>
                  <span className='rounded-sm bg-muted px-2.5 py-1.5 text-caption font-semibold'>
                    USD
                  </span>
                </div>
                <FormMessage className={messageClassName} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className={labelClassName}>
                  {t('noteLabel')}
                  <span className='text-caption font-normal text-muted-foreground'>
                    {t('noteDescription')}
                  </span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder={t('notePlaceholder')} {...field} />
                </FormControl>
                <FormMessage className={messageClassName} />
              </FormItem>
            )}
          />
        </Card>

        <Card size='lg' className='gap-3.5 xl:sticky xl:top-6'>
          <CardTitle>{t('summary')}</CardTitle>
          <dl className='flex flex-col gap-3.5 text-sm'>
            {summary.map(([label, value]) => (
              <div key={label} className='flex justify-between gap-4'>
                <dt className='shrink-0 text-muted-foreground'>{label}</dt>
                <dd className='min-w-0 truncate text-right font-semibold'>{value}</dd>
              </div>
            ))}
          </dl>
          <div className='flex items-baseline justify-between gap-4 border-t pt-3.5'>
            <span className='text-body font-semibold'>{t('total')}</span>
            <span className='text-[26px] font-bold tracking-tight tabular-nums'>
              {format.number(total, 'currency')}
            </span>
          </div>

          {form.formState.errors.root && (
            <p role='alert' className='text-sm text-destructive'>
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type='submit' size='lg' className='w-full' disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name='loader' className='animate-spin' />
                {t('sending')}
              </>
            ) : (
              <>
                <Icon name='send' />
                {t('submit')}
              </>
            )}
          </Button>
          <p className='flex gap-2 text-caption text-muted-foreground'>
            <Icon name='shield-check' className='mt-0.5 size-4 shrink-0 text-accent-foreground' />
            {t('achNote')}
          </p>
        </Card>
      </form>
    </Form>
  )
}

export default PaymentTransferForm
