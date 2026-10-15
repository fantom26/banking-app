import { useTranslations } from 'next-intl'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/_components/ui/tabs'
import { Link } from '@/app/_i18n/navigation'
import { Pagination } from '@/app/[locale]/(root)/_components/Pagination'
import TransactionsTable from '@/app/[locale]/(root)/_components/TransactionsTable'

import BankInfo from './BankInfo'
import { BankTabItem } from './BankTabItem'

const RecentTransactions = ({
  accounts,
  transactions = [],
  bankRecordId,
  page = 1
}: RecentTransactionsProps) => {
  const t = useTranslations('HomePage')
  const rowsPerPage = 10
  const totalPages = Math.ceil(transactions.length / rowsPerPage)

  const indexOfLastTransaction = page * rowsPerPage
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage

  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)

  return (
    <section className='recent-transactions'>
      <header className='flex items-center justify-between'>
        <h2 className='recent-transactions-label'>{t('recentTransactions')}</h2>
        <Link href={`/transaction-history/?id=${bankRecordId}`} className='view-all-btn'>
          {t('viewAll')}
        </Link>
      </header>

      <Tabs defaultValue={bankRecordId} className='w-full'>
        <TabsList className='recent-transactions-tablist'>
          {accounts.map((account: Account) => {
            const isActive = bankRecordId === account.bankRecordId

            return (
              <TabsTrigger key={account.id} value={account.bankRecordId}>
                <BankTabItem key={account.id} account={account} isActive={isActive} />
              </TabsTrigger>
            )
          })}
        </TabsList>

        {accounts.map((account: Account) => {
          const isActive = bankRecordId === account.bankRecordId

          return (
            <TabsContent value={account.bankRecordId} key={account.id} className='space-y-4'>
              <BankInfo account={account} isActive={isActive} type='full' />

              <TransactionsTable transactions={currentTransactions} />
              {totalPages > 1 && (
                <div className='my-4 w-full'>
                  <Pagination totalPages={totalPages} page={page} />
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </section>
  )
}

export default RecentTransactions
