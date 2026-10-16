import { getTranslations } from 'next-intl/server'

import BankCard from '@/app/_components/BankCard'
import { Link } from '@/app/_i18n/navigation'
import { getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import Copy from '@/app/[locale]/(root)/_components/Copy'
import PageHeader from '@/app/[locale]/(root)/_components/PageHeader'

export default async function MyBanks() {
  const t = await getTranslations('MyBanks')
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtext')} />

      <div className='space-y-4'>
        <h2 className='header-2'>{t('yourCards')}</h2>
        <div className='flex flex-wrap gap-6'>
          {accounts &&
            accounts.data.map((a: Account) => (
              <div key={a.id} className='flex w-80 flex-col gap-3'>
                <Link
                  href={`/transaction-history/?id=${a.bankRecordId}`}
                  className='rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
                >
                  <BankCard
                    name={a.name}
                    subtitle={a.officialName}
                    mask={a.mask}
                    holder={`${user.firstName} ${user.lastName}`}
                  />
                </Link>
                <Copy title={a.sharableId} />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
