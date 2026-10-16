import { getFormatter, getTranslations } from 'next-intl/server'
import qs from 'query-string'

import { getAccount, getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import PageHeader from '@/app/[locale]/(root)/_components/PageHeader'
import { Pagination } from '@/app/[locale]/(root)/_components/Pagination'
import RightSidebar from '@/app/[locale]/(root)/_components/RightSidebar'
import TransactionList from '@/app/[locale]/(root)/_components/TransactionList'
import TransactionDetails from '@/app/[locale]/(root)/transaction-history/_components/TransactionDetails'

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

  if (!accounts) return

  const accountsData = accounts?.data
  const bankRecordId = (id as string) || accountsData[0]?.bankRecordId

  const account = bankRecordId ? await getAccount({ bankRecordId, userId: user.id }) : null

  if (!account) {
    return <div>{t('loadError')}</div>
  }

  const accountTransactions = account.transactions || []
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
      <PageHeader title={t('title')} subtitle={t('subtext')} />

      <div className='flex gap-6'>
        <div className='min-w-0 flex-1 space-y-6'>
          <div className='transactions-account'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-18 font-bold text-white'>{account.data.name}</h2>
              <p className='text-14 text-blue-25'>{account.data.officialName}</p>
              <p className='text-14 font-semibold tracking-[1.1px] text-white'>
                ●●●● ●●●● ●●●● {account.data.mask}
              </p>
            </div>
            <div className='transactions-account-balance'>
              <p className='text-14'>{t('currentBalance')}</p>
              <p className='text-center text-24 font-bold'>
                {format.number(account.data.currentBalance, 'currency')}
              </p>
            </div>
          </div>

          <section className='flex w-full flex-col gap-6'>
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
              <div className='my-4 w-full'>
                <Pagination totalPages={totalPages} page={currentPage} />
              </div>
            )}
          </section>
        </div>
        <RightSidebar>
          <TransactionDetails transaction={selectedTransaction} closeHref={closeDetailsHref} />
        </RightSidebar>
      </div>
    </>
  )
}
