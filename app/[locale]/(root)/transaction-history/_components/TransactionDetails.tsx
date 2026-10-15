import { useFormatter, useTranslations } from 'next-intl'

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

// Turns Plaid fields keyed by name into rows, labelling each field with `label`
const toRows = <Field extends string>(
  fields: Partial<Record<Field, string>>,
  label: (field: Field) => string
): DetailRow[] =>
  (Object.entries(fields) as [Field, string][]).map(([field, value]) => [label(field), value])

const toUrl = (website: string) => (website.startsWith('http') ? website : `https://${website}`)

// FOOD_AND_DRINK_COFFEE -> Food and drink coffee
const humanize = (value: string) => {
  const text = value.toLowerCase().replaceAll('_', ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const TransactionDetails = ({ transaction, closeHref }: TransactionDetailsProps) => {
  const format = useFormatter()
  const t = useTranslations('TransactionDetails')

  if (!transaction) {
    return (
      <section className='flex flex-col gap-2 px-6 py-8'>
        <h2 className='header-2'>{t('title')}</h2>
        <p className='text-14 text-gray-600'>{t('empty')}</p>
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
        <h2 className='header-2'>{t('title')}</h2>
        <Link href={closeHref} scroll={false} className='text-14 font-semibold text-gray-600'>
          {t('close')}
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
        title={t('sections.overview')}
        rows={[
          [
            t('rows.date'),
            format.dateTime(new Date(plaid?.datetime ?? transaction.date), 'withTime')
          ],
          [
            t('rows.authorized'),
            plaid?.authorizedDate && format.dateTime(new Date(plaid.authorizedDate), 'date')
          ],
          [t('rows.channel'), humanize(transaction.paymentChannel)],
          [t('rows.category'), plaid?.categoryDetailed && humanize(plaid.categoryDetailed)],
          [t('rows.currency'), plaid?.currency],
          [t('rows.checkNumber'), plaid?.checkNumber],
          [t('rows.accountOwner'), plaid?.accountOwner],
          [t('rows.transactionId'), transaction.id],
          [t('rows.pendingTransactionId'), plaid?.pendingTransactionId]
        ]}
      />

      {plaid && (
        <>
          <DetailSection
            title={t('sections.merchant')}
            rows={[
              [t('rows.name'), plaid.merchantName],
              [
                t('rows.website'),
                plaid.website && (
                  <ExternalLink href={toUrl(plaid.website)}>{plaid.website}</ExternalLink>
                )
              ],
              [t('rows.description'), plaid.originalDescription]
            ]}
          />
          <DetailSection
            title={t('sections.location')}
            rows={toRows(plaid.location, (field) => t(`location.${field}`))}
          />
          <DetailSection
            title={t('sections.paymentInfo')}
            rows={toRows(plaid.paymentMeta, (field) => t(`paymentMeta.${field}`))}
          />
          {plaid.counterparties.map((counterparty, index) => (
            <DetailSection
              key={`${counterparty.name}-${index}`}
              title={
                plaid.counterparties.length > 1
                  ? t('sections.counterpartyNumbered', { index: index + 1 })
                  : t('sections.counterparty')
              }
              rows={[
                [t('rows.name'), counterparty.name],
                [t('rows.type'), humanize(counterparty.type)],
                [
                  t('rows.website'),
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
          title={t('sections.transfer')}
          rows={[
            [t('rows.direction'), t(`direction.${transfer.direction}`)],
            [t('rows.recipientEmail'), transfer.email],
            // transfer_url points at the Dwolla API, which needs auth, so show its ID instead of a link.
            [
              t('rows.dwollaTransferId'),
              transfer.transferUrl && lastPathSegment(transfer.transferUrl)
            ]
          ]}
        />
      )}
    </section>
  )
}

export default TransactionDetails
