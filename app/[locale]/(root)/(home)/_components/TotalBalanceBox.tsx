'use client'

import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import PlaidLink from '@/app/_components/PlaidLinks'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import { Link } from '@/app/_i18n/navigation'
import { cn } from '@/app/_lib/cn'

import AnimatedCounter from './AnimatedCounter'
import BalanceSplitChart from './BalanceSplitChart'

type TotalBalanceBoxProps = {
  user: User
  accounts: Account[]
  totalBanks: number
  totalCurrentBalance: number
  className?: string
}

const TotalBalanceBox = ({
  user,
  accounts,
  totalBanks,
  totalCurrentBalance,
  className
}: TotalBalanceBoxProps) => {
  const t = useTranslations('HomePage')

  return (
    <Card size='lg' className={cn('gap-4.5', className)}>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='text-body font-medium text-muted-foreground'>
            {t('totalCurrentBalance')}
          </h2>
          <span className='text-caption text-muted-foreground'>
            {t('bankAccounts', { count: totalBanks })}
          </span>
        </div>
        <p className='text-hero font-bold tracking-[-0.035em] tabular-nums xl:text-hero-lg'>
          <AnimatedCounter amount={totalCurrentBalance} />
        </p>
      </div>

      <BalanceSplitChart accounts={accounts} />

      <div className='mt-auto flex flex-wrap gap-2.5 border-t pt-4.5'>
        <Button asChild size='lg' className='flex-[1_1_160px]'>
          <Link href='/payment-transfer'>
            <Icon name='arrow-left-right' />
            {t('transfer')}
          </Link>
        </Button>
        <PlaidLink user={user} variant='outline' size='lg' className='flex-[1_1_160px]' />
      </div>
    </Card>
  )
}

export default TotalBalanceBox
