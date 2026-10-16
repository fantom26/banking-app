'use client'

import { useTranslations } from 'next-intl'

import { Card } from '@/app/_components/ui/card'

import AnimatedCounter from './AnimatedCounter'
import BalanceSplitChart from './BalanceSplitChart'

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance
}: TotalBalanceBoxProps) => {
  const t = useTranslations('HomePage')

  return (
    <Card size='lg' className='gap-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-title font-semibold'>{t('bankAccounts', { count: totalBanks })}</h2>
        <p className='text-body text-muted-foreground'>{t('totalCurrentBalance')}</p>
        <p className='text-hero font-bold tracking-tight tabular-nums'>
          <AnimatedCounter amount={totalCurrentBalance} />
        </p>
      </div>
      <BalanceSplitChart accounts={accounts} />
    </Card>
  )
}

export default TotalBalanceBox
