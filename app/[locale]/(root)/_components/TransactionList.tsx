import { cn } from 'cn'
import { useFormatter, useTranslations } from 'next-intl'

import { Link } from '@/app/_i18n/navigation'
import { groupByDay, signedAmount } from '@/app/_lib/finance'
import { humanize, removeSpecialCharacters } from '@/app/_lib/utils'

import CategoryChip, { useCategoryLabel } from './CategoryChip'
import CategoryIcon from './CategoryIcon'
import StatusChip from './StatusChip'

type TransactionListProps = {
  transactions: Transaction[]
  variant?: 'compact' | 'table'
  rowHref?: (transaction: Transaction) => string
  selectedId?: string
}

const tableColumns =
  'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[minmax(0,2.4fr)_minmax(0,1.4fr)_120px_120px]'

const timeOf = (transaction: Transaction) => {
  if (transaction.details?.source === 'plaid') return transaction.details.datetime
  return transaction.date.length > 10 ? transaction.date : null
}

const TransactionList = ({
  transactions,
  variant = 'compact',
  rowHref,
  selectedId
}: TransactionListProps) => {
  const format = useFormatter()
  const t = useTranslations('Transactions')
  const tStatus = useTranslations('Status')
  const categoryLabel = useCategoryLabel()
  const isTable = variant === 'table'

  const channelLabel = (channel: string) => {
    const key = `channels.${channel}` as Parameters<typeof t>[0]
    return t.has(key) ? t(key) : humanize(channel)
  }

  if (transactions.length === 0) {
    return <p className='py-6 text-center text-body text-muted-foreground'>{t('empty')}</p>
  }

  return (
    <div className='flex flex-col'>
      {isTable && (
        <div
          aria-hidden
          className={cn(
            tableColumns,
            'border-b py-2.5 text-caption font-medium text-muted-foreground max-md:hidden'
          )}
        >
          <span>{t('columns.transaction')}</span>
          <span>{t('columns.category')}</span>
          <span>{t('columns.status')}</span>
          <span className='text-right'>{t('columns.amount')}</span>
        </div>
      )}

      {groupByDay(transactions).map(({ day, transactions: dayTransactions }) => (
        <section key={day} className='flex flex-col'>
          <h3 className='pt-3 pb-1 text-caption font-semibold text-muted-foreground'>
            {format.dateTime(new Date(`${day}T00:00:00Z`), 'dayHeading')}
          </h3>

          <ul className='flex flex-col'>
            {dayTransactions.map((transaction) => {
              const amount = signedAmount(transaction)
              const isIncome = amount > 0
              const time = timeOf(transaction)
              const meta = [
                time && format.dateTime(new Date(time), 'time'),
                channelLabel(transaction.paymentChannel)
              ].filter(Boolean)

              const content = (
                <>
                  <div className='flex min-w-0 items-center gap-3'>
                    <span
                      className={cn(
                        'grid size-10 shrink-0 place-items-center rounded-lg',
                        isIncome ? 'bg-success-muted text-success' : 'bg-muted text-foreground'
                      )}
                    >
                      <CategoryIcon category={transaction.category} className='size-4.5' />
                    </span>
                    <div className='flex min-w-0 flex-col gap-0.5'>
                      <span className='truncate text-body font-semibold'>
                        {removeSpecialCharacters(transaction.name)}
                      </span>
                      <span className='truncate text-caption text-muted-foreground'>
                        {meta.join(' · ')}
                        {isTable && (
                          <span className='md:hidden'>
                            {' · '}
                            {categoryLabel(transaction.category)}
                          </span>
                        )}
                        {transaction.pending && (
                          <span className={cn('text-accent-foreground', isTable && 'md:hidden')}>
                            {' · '}
                            {tStatus('pending')}
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {isTable && (
                    <>
                      <span className='max-md:hidden'>
                        <CategoryChip category={transaction.category} />
                      </span>
                      <span className='max-md:hidden'>
                        <StatusChip pending={transaction.pending} />
                      </span>
                    </>
                  )}

                  <span
                    className={cn(
                      'text-right text-body font-semibold whitespace-nowrap tabular-nums',
                      isIncome && 'text-success'
                    )}
                  >
                    {format.number(amount, 'signedCurrency')}
                  </span>
                </>
              )

              const rowClassName = cn(
                isTable ? tableColumns : 'flex items-center justify-between gap-3',
                'border-b border-muted py-2.5'
              )

              return (
                <li key={transaction.id}>
                  {rowHref ? (
                    <Link
                      href={rowHref(transaction)}
                      scroll={false}
                      aria-current={transaction.id === selectedId ? 'true' : undefined}
                      className={cn(
                        rowClassName,
                        '-mx-2 rounded-lg px-2 transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none aria-[current=true]:bg-accent/60'
                      )}
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className={rowClassName}>{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default TransactionList
