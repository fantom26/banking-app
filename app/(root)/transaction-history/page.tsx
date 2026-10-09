import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination'
import TransactionsTable from '@/components/TransactionsTable'
import { getAccount, getAccounts } from '@/lib/actions/account.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { formatAmount } from '@/lib/utils'

export default async function TransactionHistory({
  searchParams
}: PageProps<'/transaction-history'>) {
  const { id, page } = await searchParams
  const currentPage = Number(page as string) || 1
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  if (!accounts) return

  const accountsData = accounts?.data
  const bankRecordId = (id as string) || accountsData[0]?.bankRecordId

  const account = bankRecordId ? await getAccount({ bankRecordId, userId: user.id }) : null

  if (!account) {
    return <div>Couldn&apos;t fetch account</div>
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
  return (
    <div className='transactions'>
      <div className='transactions-header'>
        <HeaderBox title='Transaction History' subtext='See your bank details and transactions.' />
      </div>

      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-18 font-bold text-white'>{account.data.name}</h2>
            <p className='text-14 text-blue-25'>{account.data.officialName}</p>
            <p className='text-14 font-semibold tracking-[1.1px] text-white'>
              ●●●● ●●●● ●●●● {account.data.mask}
            </p>
          </div>
          <div className='transactions-account-balance'>
            <p className='text-14'>Current balance</p>
            <p className='text-24 text-center font-bold'>
              {formatAmount(account.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className='flex w-full flex-col gap-6'>
          <TransactionsTable transactions={currentTransactions || []} />
          {totalPages > 1 && (
            <div className='my-4 w-full'>
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
