import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home = async () => {
  const user = await getLoggedInUser()
  if (!user) return null

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
          <TotalBalanceBox accounts={[]} totalBanks={3} totalCurrentBalance={12345.67} />
        </header>
      </div>
      <RightSidebar
        user={user}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 500.5 }]}
      />
    </section>
  )
}

export default Home
