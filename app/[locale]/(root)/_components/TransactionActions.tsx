'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { formUrlQuery } from '@/app/_lib/utils'

const TransactionActions = ({ transactionId }: { transactionId: string }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const t = useTranslations('Transactions')

  const showDetails = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'tx',
      value: transactionId
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='size-8' aria-label={t('actionsLabel')}>
          <Icon name='more-horizontal' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='end'>
        <DropdownMenuItem onSelect={showDetails}>{t('more')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TransactionActions
