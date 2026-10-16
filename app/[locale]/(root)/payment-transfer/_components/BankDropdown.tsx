'use client'

import { useFormatter, useTranslations } from 'next-intl'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger
} from '@/app/_components/ui/select'

type BankDropdownProps = {
  accounts: Account[]
  value: string
  onChange: (bankRecordId: string) => void
}

const CardThumbnail = () => (
  <span aria-hidden className='aspect-[1.586] w-16 shrink-0 rounded-sm bg-(image:--cover-ocean)' />
)

export const BankDropdown = ({ accounts, value, onChange }: BankDropdownProps) => {
  const format = useFormatter()
  const t = useTranslations('Transfer')

  const selected = accounts.find((account) => account.bankRecordId === value)
  const hasAccounts = accounts.length > 0

  const available = (account: Account) =>
    t('available', { amount: format.number(account.availableBalance, 'currency') })

  return (
    <Select value={value} onValueChange={onChange} disabled={!hasAccounts}>
      <SelectTrigger className='w-full gap-3.5 bg-card px-3.5 py-3 data-[size=default]:h-auto'>
        {selected ? (
          <span className='flex min-w-0 flex-1 items-center gap-3.5'>
            <CardThumbnail />
            <span className='flex min-w-0 flex-col items-start gap-0.5'>
              <span className='truncate text-body font-semibold'>{selected.name}</span>
              <span className='text-caption text-muted-foreground'>{available(selected)}</span>
            </span>
          </span>
        ) : (
          <span className='flex-1 text-left text-body text-placeholder'>
            {hasAccounts ? t('bankPlaceholder') : t('noBanks')}
          </span>
        )}
      </SelectTrigger>
      <SelectContent position='popper' className='p-1'>
        <SelectGroup>
          <SelectLabel className='px-2 py-1.5'>{t('bankListLabel')}</SelectLabel>
          {accounts.map((account) => (
            <SelectItem
              key={account.id}
              value={account.bankRecordId}
              className='cursor-pointer gap-3 px-2 py-2'
            >
              <span className='flex flex-col'>
                <span className='text-sm font-semibold'>{account.name}</span>
                <span className='text-caption text-muted-foreground'>{available(account)}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
