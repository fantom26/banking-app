'use client'

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  type ChartData,
  type ChartOptions,
  LinearScale,
  Tooltip
} from 'chart.js'
import { useFormatter, useTranslations } from 'next-intl'
import { Bar } from 'react-chartjs-2'

import { useChartColors } from '@/app/_lib/chart-colors'
import { cn } from '@/app/_lib/cn'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip)

const SLOTS = 5
const swatches = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5']

type Segment = { name: string; value: number; swatch: string; slot: number | null }

const toSegments = (accounts: Account[], otherLabel: string): Segment[] => {
  const visible = accounts.length > SLOTS ? accounts.slice(0, SLOTS - 1) : accounts
  const rest = accounts.slice(visible.length)

  const segments: Segment[] = visible.map((account, index) => ({
    name: account.name,
    value: account.currentBalance,
    swatch: swatches[index],
    slot: index
  }))

  if (rest.length > 0) {
    segments.push({
      name: otherLabel,
      value: rest.reduce((sum, account) => sum + account.currentBalance, 0),
      swatch: 'bg-muted-foreground',
      slot: null
    })
  }

  return segments
}

const BalanceSplitChart = ({ accounts }: { accounts: Account[] }) => {
  const format = useFormatter()
  const t = useTranslations('HomePage')
  const colors = useChartColors()

  const segments = toSegments(accounts, t('otherAccounts'))
  const total = segments.reduce((sum, segment) => sum + Math.max(segment.value, 0), 0)

  const data: ChartData<'bar'> = {
    labels: [t('chartLabel')],
    datasets: segments.map((segment) => ({
      label: segment.name,
      data: [Math.max(segment.value, 0)],
      backgroundColor: segment.slot === null ? colors?.muted : colors?.series[segment.slot],
      borderColor: colors?.surface,
      borderWidth: 2,
      borderRadius: 4,
      borderSkipped: false
    }))
  }

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true, display: false, max: total || undefined },
      y: { stacked: true, display: false }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors?.surface,
        borderColor: colors?.border,
        borderWidth: 1,
        titleColor: colors?.muted,
        bodyColor: colors?.text,
        displayColors: true,
        boxPadding: 4,
        callbacks: {
          title: () => '',
          label: (context) =>
            `${context.dataset.label}: ${format.number(context.parsed.x ?? 0, 'currency')}`
        }
      }
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='h-3.5'>{colors && <Bar data={data} options={options} />}</div>

      <ul className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2.5'>
        {segments.map((segment, index) => (
          <li key={index} className='flex items-center gap-2.5 rounded-lg bg-muted px-3 py-2.5'>
            <span className={cn('size-2.5 shrink-0 rounded-[3px]', segment.swatch)} />
            <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
              <span className='truncate text-caption text-muted-foreground'>{segment.name}</span>
              <span className='text-body font-semibold tabular-nums'>
                {format.number(segment.value, 'currency')}
              </span>
            </div>
            <span className='text-caption font-semibold text-muted-foreground tabular-nums'>
              {format.number(total ? Math.max(segment.value, 0) / total : 0, 'percent')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BalanceSplitChart
