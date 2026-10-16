'use client'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useFormatter, useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger
} from '@/app/_components/ui/select'
import { formUrlQuery } from '@/app/_lib/utils'

export const BankDropdown = ({ accounts = [], setValue, otherStyles }: BankDropdownProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const format = useFormatter()
  const t = useTranslations('Transfer')
  const [selected, setSeclected] = useState<Account | undefined>()

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.bankRecordId === id)!

    setSeclected(account)
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'id',
      value: id
    })
    router.push(newUrl, { scroll: false })

    if (setValue) {
      setValue('senderBank', id)
    }
  }

  const hasAccounts = accounts.length > 0
  const placeholder = hasAccounts ? t('bankPlaceholder') : t('noBanks')

  return (
    <Select
      value={selected?.bankRecordId ?? ''}
      onValueChange={(value) => handleBankChange(value)}
      disabled={!hasAccounts}
    >
      <SelectTrigger className={`flex w-full gap-3 md:w-[300px] ${otherStyles}`}>
        <Icon name='credit-card' className='size-5 shrink-0 text-gray-500' />
        <p className={`line-clamp-1 w-full text-left ${selected ? '' : 'text-gray-500'}`}>
          {selected?.name ?? placeholder}
        </p>
      </SelectTrigger>
      <SelectContent className={`w-full md:w-[300px] ${otherStyles}`} position='popper' align='end'>
        <SelectGroup>
          <SelectLabel className='py-2 font-normal text-gray-500'>{t('bankListLabel')}</SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.bankRecordId}
              className='cursor-pointer border-t'
            >
              <div className='flex flex-col'>
                <p className='text-16 font-medium'>{account.name}</p>
                <p className='text-14 font-medium text-blue-600'>
                  {format.number(account.currentBalance, 'currency')}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
