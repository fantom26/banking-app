'use client'

import { ChartData } from 'chart.js'
import { useTranslations } from 'next-intl'

import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance
}: TotalBalanceBoxProps) => {
  const t = useTranslations('HomePage')

  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        label: t('chartLabel'),
        data: accounts.map((a) => a.currentBalance),
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
      }
    ],
    labels: accounts.map((a) => a.name)
  }

  return (
    <section className='total-balance'>
      <div className='total-balance-chart'>
        <DoughnutChart data={chartData} />
      </div>
      <div className='flex flex-col gap-6'>
        <h2 className='header-2'>{t('bankAccounts', { count: totalBanks })}</h2>
        <div className='flex flex-col gap-2'>
          <p className='total-balance-label'>{t('totalCurrentBalance')}</p>
          <p className='flex-center total-balance-amount gap-2'>
            <AnimatedCounter amount={totalCurrentBalance} />
          </p>
        </div>
      </div>
    </section>
  )
}

export default TotalBalanceBox
