import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/account.actions'
import { getLoggedInUser } from '@/lib/actions/user.actions'

export default async function Transfer() {
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })

  if (!accounts) return

  const accountsData = accounts?.data

  return (
    <section className='payment-transfer'>
      <HeaderBox
        title='Payment Transfer'
        subtext='Please provide any specific details or notes related to the payment transfer'
      />

      <section className='size-full pt-5'>
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  )
}
