import { getTranslations } from 'next-intl/server'

import { getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import BankCard from '@/app/[locale]/(root)/_components/BankCard'
import HeaderBox from '@/app/[locale]/(root)/_components/HeaderBox'

export default async function MyBanks() {
  const t = await getTranslations('MyBanks')
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox title={t('title')} subtext={t('subtext')} />

        <div className='space-y-4'>
          <h2 className='header-2'>{t('yourCards')}</h2>
          <div className='flex flex-wrap gap-6'>
            {accounts &&
              accounts.data.map((a: Account) => (
                <BankCard key={a.id} account={a} userName={user?.firstName} showBalance />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
