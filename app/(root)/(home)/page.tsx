import { z } from 'zod'

import { getAccount, getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import HeaderBox from '@/app/(root)/_components/HeaderBox'
import RecentTransactions from '@/app/(root)/(home)/_components/RecentTransactions'
import RightSidebar from '@/app/(root)/(home)/_components/RightSidebar'
import TotalBalanceBox from '@/app/(root)/(home)/_components/TotalBalanceBox'

const Home = async ({ searchParams }: PageProps<'/'>) => {
  const { id } = await searchParams

  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  const selectedId = z.uuid().safeParse(id)
  const bankRecordId = selectedId.success ? selectedId.data : accounts.data[0]?.bankRecordId

  const account = bankRecordId ? await getAccount({ bankRecordId, userId: user.id }) : null

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            title={
              <>
                Welcome
                <span className='text-bankGradient'>&nbsp; {user.firstName}</span>
              </>
            }
            subtext='This is the subtext for the home page.'
          />
          <TotalBalanceBox
            accounts={accounts.data}
            totalBanks={accounts.totalBanks}
            totalCurrentBalance={accounts.totalCurrentBalance}
          />
        </header>
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
  )
}

export default Home
