import { getTranslations } from 'next-intl/server'

import { getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import PageHeader from '@/app/[locale]/(root)/_components/PageHeader'
import PaymentTransferForm from '@/app/[locale]/(root)/payment-transfer/_components/PaymentTransferForm'

export default async function Transfer() {
  const t = await getTranslations('Transfer')
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  if (!accounts) return

  const accountsData = accounts?.data

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtext')} />

      <section className='size-full'>
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </>
  )
}
