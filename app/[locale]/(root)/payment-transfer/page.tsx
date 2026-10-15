import { getTranslations } from 'next-intl/server'

import { getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import HeaderBox from '@/app/[locale]/(root)/_components/HeaderBox'
import PaymentTransferForm from '@/app/[locale]/(root)/payment-transfer/_components/PaymentTransferForm'

export default async function Transfer() {
  const t = await getTranslations('Transfer')
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  if (!accounts) return

  const accountsData = accounts?.data

  return (
    <section className='payment-transfer'>
      <HeaderBox title={t('title')} subtext={t('subtext')} />

      <section className='size-full pt-5'>
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  )
}
