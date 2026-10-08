'use client'

import { ChartData } from 'chart.js'

import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DonughnutChart'

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance
}: TotalBalanceBoxProps) => {
  const chartData: ChartData<'doughnut'> = {
    datasets: [
      {
        label: 'Banks',
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
        <h2 className='header-2'>Bank Accounts: {totalBanks}</h2>
        <div className='flex flex-col gap-2'>
          <p className='total-balance-label'>Total Current Balance</p>
          <p className='total-balance-amount flex-center gap-2'>
            <AnimatedCounter amount={totalCurrentBalance} />
          </p>
        </div>
      </div>
    </section>
  )
}

export default TotalBalanceBox
