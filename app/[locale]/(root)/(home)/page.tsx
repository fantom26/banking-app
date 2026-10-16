import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import { getAccount, getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import PageHeader from '@/app/[locale]/(root)/_components/PageHeader'
import RecentTransactions from '@/app/[locale]/(root)/(home)/_components/RecentTransactions'
import RightSidebar from '@/app/[locale]/(root)/(home)/_components/RightSidebar'
import TotalBalanceBox from '@/app/[locale]/(root)/(home)/_components/TotalBalanceBox'

const Home = async ({ searchParams }: PageProps<'/[locale]'>) => {
  const { id } = await searchParams
  const t = await getTranslations('HomePage')
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  const selectedId = z.uuid().safeParse(id)
  const bankRecordId = selectedId.success ? selectedId.data : accounts.data[0]?.bankRecordId

  const account = bankRecordId ? await getAccount({ bankRecordId, userId: user.id }) : null

  return (
    <>
      <PageHeader
        title={t.rich('welcome', {
          name: user.firstName,
          highlight: (chunks) => <span className='text-bankGradient'>{chunks}</span>
        })}
        subtitle={t('subtext')}
      />
      <section className='flex gap-6'>
        <div className='flex min-w-0 flex-1 flex-col gap-8'>
          <TotalBalanceBox
            accounts={accounts.data}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
          <RecentTransactions
            accounts={accounts.data}
            transactions={account?.transactions ?? []}
            bankRecordId={bankRecordId ?? ''}
            page={1}
          />
        </div>
        <RightSidebar
          user={user}
          transactions={account?.transactions ?? []}
          banks={accounts.data.slice(0, 2)}
        />
      </section>
    </>
  )
}

export default Home
