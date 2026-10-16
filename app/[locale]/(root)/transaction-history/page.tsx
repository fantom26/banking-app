import { getFormatter, getTranslations } from 'next-intl/server'
import qs from 'query-string'

import BankCard from '@/app/_components/BankCard'
import { Card } from '@/app/_components/ui/card'
import { getAccount, getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import LinkFirstBank from '@/app/[locale]/(root)/_components/LinkFirstBank'
import PageHeader from '@/app/[locale]/(root)/_components/PageHeader'
import { Pagination } from '@/app/[locale]/(root)/_components/Pagination'
import TransactionList from '@/app/[locale]/(root)/_components/TransactionList'
import TransactionDetails from '@/app/[locale]/(root)/transaction-history/_components/TransactionDetails'
import TransactionDetailsSheet from '@/app/[locale]/(root)/transaction-history/_components/TransactionDetailsSheet'

export default async function TransactionHistory({
  searchParams
}: PageProps<'/[locale]/transaction-history'>) {
  const { id, page, tx } = await searchParams
  const format = await getFormatter()
  const t = await getTranslations('TransactionHistory')
  const currentPage = Number(page as string) || 1
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })
  const header = <PageHeader title={t('title')} subtitle={t('subtext')} />

  if (accounts.data.length === 0) {
    return (
      <>
        {header}
        <LinkFirstBank user={user} />
      </>
    )
  }

  const bankRecordId = (id as string) || accounts.data[0].bankRecordId
  const account = await getAccount({ bankRecordId, userId: user.id })

  if (!account) {
    return (
      <>
        {header}
        <Card className='py-10 text-center text-body text-muted-foreground'>{t('loadError')}</Card>
      </>
    )
  }

  const accountTransactions = account.transactions
  const rowsPerPage = 10
  const totalPages = Math.ceil(accountTransactions.length / rowsPerPage)

  const indexOfLastTransaction = currentPage * rowsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage

  const currentTransactions = accountTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  )

  // Search all of the account's transactions, so a selection survives switching pages.
  const selectedTransaction = accountTransactions.find((t) => t.id === tx)
  const closeDetailsHref = qs.stringifyUrl(
    { url: '/transaction-history', query: { id, page } },
    { skipNull: true, skipEmptyString: true }
  )

  return (
    <>
      {header}

      <Card className='gap-4 sm:flex-row sm:items-center'>
        <div className='w-24 shrink-0 max-sm:hidden'>
          <BankCard
            name={account.data.name}
            mask={account.data.mask}
            holder={`${user.firstName} ${user.lastName}`}
          />
        </div>
        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <h2 className='truncate text-title font-semibold'>{account.data.name}</h2>
          {account.data.officialName && (
            <p className='truncate text-caption text-muted-foreground'>
              {account.data.officialName}
            </p>
          )}
          <p className='text-caption text-muted-foreground tabular-nums'>
            •••• {account.data.mask}
          </p>
        </div>
        <div className='flex flex-col gap-0.5 sm:items-end'>
          <span className='text-caption text-muted-foreground'>{t('currentBalance')}</span>
          <span className='text-stat font-bold tracking-tight tabular-nums'>
            {format.number(account.data.currentBalance, 'currency')}
          </span>
        </div>
      </Card>

      <Card className='gap-0 pt-2 pb-4'>
        <TransactionList
          variant='table'
          transactions={currentTransactions}
          rowHref={(transaction) =>
            qs.stringifyUrl(
              { url: '/transaction-history', query: { id, page, tx: transaction.id } },
              { skipNull: true, skipEmptyString: true }
            )
          }
          selectedId={selectedTransaction?.id}
        />
        {totalPages > 1 && (
          <div className='flex flex-wrap items-center justify-between gap-2.5 pt-4 text-sm text-muted-foreground'>
            <span>
              {t('showing', {
                from: indexOfFirstTransaction + 1,
                to: Math.min(indexOfLastTransaction, accountTransactions.length),
                total: accountTransactions.length
              })}
            </span>
            <Pagination totalPages={totalPages} page={currentPage} />
          </div>
        )}
      </Card>

      {selectedTransaction && (
        <TransactionDetailsSheet closeHref={closeDetailsHref}>
          <TransactionDetails transaction={selectedTransaction} />
        </TransactionDetailsSheet>
      )}
    </>
  )
}
