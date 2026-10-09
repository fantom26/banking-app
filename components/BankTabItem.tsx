'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from 'cn'

import { formUrlQuery } from '@/lib/utils'

export const BankTabItem = ({ account, isActive }: BankTabItemProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'id',
      value: account?.bankRecordId
    })
    router.push(newUrl, { scroll: false })
  }

  return (
    <div
      onClick={handleBankChange}
      className={cn(`banktab-item`, {
        ' border-blue-600': isActive
      })}
    >
      <p
        className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500`, {
          ' text-blue-600': isActive
        })}
      >
        {account.name}
      </p>
    </div>
  )
}
