import { useFormatter } from 'next-intl'

import { Link } from '@/app/_i18n/navigation'
import { getTransactionStatus, lastPathSegment, removeSpecialCharacters } from '@/app/_lib/utils'
import { CategoryBadge } from '@/app/[locale]/(root)/_components/TransactionsTable'

type TransactionDetailsProps = {
  transaction?: Transaction
  closeHref: string
}

type DetailRow = [label: string, value: React.ReactNode]

const DetailSection = ({ title, rows }: { title: string; rows: DetailRow[] }) => {
  // Plaid leaves many fields empty, so skip rows without a value and sections without rows.
  const filledRows = rows.filter(
    ([, value]) => value !== null && value !== undefined && value !== ''
  )
  if (filledRows.length === 0) return null

  return (
    <section className='flex flex-col gap-3 border-t border-gray-200 pt-5'>
      <h3 className='text-14 font-semibold text-gray-900'>{title}</h3>
      <dl className='flex flex-col gap-2.5'>
        {filledRows.map(([label, value]) => (
          <div key={label} className='flex justify-between gap-4 text-14'>
            <dt className='shrink-0 text-gray-600'>{label}</dt>
            <dd className='text-right font-medium break-all text-gray-900'>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target='_blank' rel='noreferrer' className='text-blue-600 hover:underline'>
    {children}
  </a>
)

const toUrl = (website: string) => (website.startsWith('http') ? website : `https://${website}`)

// FOOD_AND_DRINK_COFFEE -> Food and drink coffee
const humanize = (value: string) => {
  const text = value.toLowerCase().replaceAll('_', ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const TransactionDetails = ({ transaction, closeHref }: TransactionDetailsProps) => {
  const format = useFormatter()

  if (!transaction) {
    return (
      <section className='flex flex-col gap-2 px-6 py-8'>
        <h2 className='header-2'>Transaction details</h2>
        <p className='text-14 text-gray-600'>
          Select a transaction and click More to see its details.
        </p>
      </section>
    )
  }

  const { details } = transaction
  const plaid = details?.source === 'plaid' ? details : null
  const transfer = details?.source === 'transfer' ? details : null

  const amount = format.number(transaction.amount, 'currency')
  const isDebit = transaction.type === 'debit'
  const isNegative = isDebit || transaction.amount < 0
  const status = transaction.pending
    ? 'Processing'
    : getTransactionStatus(new Date(transaction.date))

  return (
    <section className='flex flex-col gap-5 px-6 py-8'>
      <div className='flex items-center justify-between'>
        <h2 className='header-2'>Transaction details</h2>
        <Link href={closeHref} scroll={false} className='text-14 font-semibold text-gray-600'>
          Close
        </Link>
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-16 font-semibold text-gray-900'>
          {removeSpecialCharacters(transaction.name)}
        </p>
        <p className={`text-24 font-bold ${isNegative ? 'text-[#f04438]' : 'text-[#039855]'}`}>
          {isDebit ? `-${amount}` : amount}
        </p>
        <div className='flex flex-wrap gap-2'>
          <CategoryBadge category={status} />
          <CategoryBadge category={transaction.category} />
        </div>
      </div>

      <DetailSection
        title='Overview'
        rows={[
          ['Date', format.dateTime(new Date(plaid?.datetime ?? transaction.date), 'withTime')],
          [
            'Authorized',
            plaid?.authorizedDate && format.dateTime(new Date(plaid.authorizedDate), 'date')
          ],
          ['Channel', humanize(transaction.paymentChannel)],
          ['Category', plaid?.categoryDetailed && humanize(plaid.categoryDetailed)],
          ['Currency', plaid?.currency],
          ['Check number', plaid?.checkNumber],
          ['Account owner', plaid?.accountOwner],
          ['Transaction ID', transaction.id],
          ['Pending transaction ID', plaid?.pendingTransactionId]
        ]}
      />

      {plaid && (
        <>
          <DetailSection
            title='Merchant'
            rows={[
              ['Name', plaid.merchantName],
              [
                'Website',
                plaid.website && (
                  <ExternalLink href={toUrl(plaid.website)}>{plaid.website}</ExternalLink>
                )
              ],
              ['Description', plaid.originalDescription]
            ]}
          />
          <DetailSection title='Location' rows={Object.entries(plaid.location)} />
          <DetailSection title='Payment info' rows={Object.entries(plaid.paymentMeta)} />
          {plaid.counterparties.map((counterparty, index) => (
            <DetailSection
              key={`${counterparty.name}-${index}`}
              title={plaid.counterparties.length > 1 ? `Counterparty ${index + 1}` : 'Counterparty'}
              rows={[
                ['Name', counterparty.name],
                ['Type', humanize(counterparty.type)],
                [
                  'Website',
                  counterparty.website && (
                    <ExternalLink key='website' href={toUrl(counterparty.website)}>
                      {counterparty.website}
                    </ExternalLink>
                  )
                ]
              ]}
            />
          ))}
        </>
      )}

      {transfer && (
        <DetailSection
          title='Transfer'
          rows={[
            ['Direction', transfer.direction === 'sent' ? 'Sent' : 'Received'],
            ['Recipient email', transfer.email],
            // transfer_url points at the Dwolla API, which needs auth, so show its ID instead of a link.
            ['Dwolla transfer ID', transfer.transferUrl && lastPathSegment(transfer.transferUrl)]
          ]}
        />
      )}
    </section>
  )
}

export default TransactionDetails
