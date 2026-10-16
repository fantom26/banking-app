import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { getAccount, getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import LinkFirstBank from '@/app/[locale]/(root)/_components/LinkFirstBank'
import PageHeader from '@/app/[locale]/(root)/_components/PageHeader'
import MyCards from '@/app/[locale]/(root)/(home)/_components/MyCards'
import RecentTransactions from '@/app/[locale]/(root)/(home)/_components/RecentTransactions'
import TopCategories from '@/app/[locale]/(root)/(home)/_components/TopCategories'
import TotalBalanceBox from '@/app/[locale]/(root)/(home)/_components/TotalBalanceBox'

const Home = async ({ searchParams }: PageProps<'/[locale]'>) => {
  const { id } = await searchParams
  const t = await getTranslations('HomePage')
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  if (accounts.data.length === 0) {
    return (
      <>
        <PageHeader title={t('welcome', { name: user.firstName })} subtitle={t('emptySubtext')} />
        <LinkFirstBank user={user} />
      </>
    )
  }

  const selectedId = z.uuid().safeParse(id)
  const selected =
    accounts.data.find((a) => selectedId.success && a.bankRecordId === selectedId.data) ??
    accounts.data[0]

  const account = await getAccount({ bankRecordId: selected.bankRecordId, userId: user.id })
  const transactions = account?.transactions ?? []

  return (
    <>
      <PageHeader title={t('welcome', { name: user.firstName })} subtitle={t('subtext')} />

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_380px]'>
        <TotalBalanceBox
          user={user}
          accounts={accounts.data}
          totalBanks={accounts.totalBanks}
          totalCurrentBalance={accounts.totalCurrentBalance}
          className='md:col-span-2 xl:col-span-1'
        />
        <MyCards accounts={accounts.data} holder={`${user.firstName} ${user.lastName}`} />
        <RecentTransactions
          accounts={accounts.data}
          account={selected}
          transactions={transactions}
          className='md:order-last md:col-span-2 xl:order-0 xl:col-span-1'
        />
        <TopCategories transactions={transactions} />
      </div>
    </>
  )
}

export default Home
