'use client'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger
} from '@/components/ui/select'
import { formatAmount, formUrlQuery } from '@/lib/utils'

import Icon from './Icon'

export const BankDropdown = ({ accounts = [], setValue, otherStyles }: BankDropdownProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
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
  const placeholder = hasAccounts ? 'Select a bank' : 'No bank accounts linked'

  return (
    <Select
      value={selected?.bankRecordId ?? ''}
      onValueChange={(value) => handleBankChange(value)}
      disabled={!hasAccounts}
    >
      <SelectTrigger className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}>
        <Icon name='credit-card' className='size-5 shrink-0 text-gray-500' />
        <p className={`line-clamp-1 w-full text-left ${selected ? '' : 'text-gray-500'}`}>
          {selected?.name ?? placeholder}
        </p>
      </SelectTrigger>
      <SelectContent
        className={`w-full bg-white md:w-[300px] ${otherStyles}`}
        position='popper'
        align='end'
      >
        <SelectGroup>
          <SelectLabel className='py-2 font-normal text-gray-500'>
            Select a bank to display
          </SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.bankRecordId}
              className='cursor-pointer border-t'
            >
              <div className='flex flex-col '>
                <p className='text-16 font-medium'>{account.name}</p>
                <p className='text-14 font-medium text-blue-600'>
                  {formatAmount(account.currentBalance)}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
