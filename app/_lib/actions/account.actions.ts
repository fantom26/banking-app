import { type AccountBase, type Transaction as PlaidTransaction } from 'plaid'

import { plaidClient } from '@/app/_lib/plaid'

import { getTransactionsByBankId } from './transaction.actions'
import { getBank, getBanks } from './user.actions'

import 'server-only'

export async function getAccounts({ userId }: getAccountsProps) {
  const banks = await getBanks({ userId })

  const accounts = await Promise.all(
    banks.map(async (bank) => toAccount(await getPlaidAccount(bank), bank))
  )

  const totalBanks = accounts.length
  const totalCurrentBalance = accounts.reduce((total, account) => total + account.currentBalance, 0)

  return { data: accounts, totalBanks, totalCurrentBalance }
}

export async function getAccount({ bankRecordId, userId }: getAccountProps) {
  // Returns null for an unknown bank or one that belongs to another user.
  const bank = await getBank({ bankRecordId, userId })
  if (!bank) return null

  const [accountData, plaidTransactions, transferTransactions] = await Promise.all([
    getPlaidAccount(bank),
    getTransactions({ accessToken: bank.accessToken }),
    getTransactionsByBankId({ bankId: bank.id, accountId: bank.accountId })
  ])

  const sortedTransactions = [...transferTransactions, ...plaidTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return {
    data: toAccount(accountData, bank),
    transactions: sortedTransactions
  }
}

export async function getTransactions({ accessToken }: getTransactionsProps) {
  const transactions: Transaction[] = []
  let cursor: string | undefined
  let hasMore = true

  // Page through every update for the item, passing the cursor so each call
  // returns the next page instead of the first one again.
  while (hasMore) {
    const response = await plaidClient
      .transactionsSync({ access_token: accessToken, cursor })
      .catch((error: unknown) => {
        // Banks linked before 'transactions' was added to the Link token have no consent
        // for it. Show no transactions instead of failing the whole page; relink to fix.
        if (getPlaidErrorCode(error) === 'ADDITIONAL_CONSENT_REQUIRED') return null
        throw error
      })
    if (!response) return []

    const { data } = response
    transactions.push(...data.added.map(toTransaction))

    cursor = data.next_cursor
    hasMore = data.has_more
  }

  return transactions
}

function getPlaidErrorCode(error: unknown): string | undefined {
  const data = (error as { response?: { data?: { error_code?: unknown } } })?.response?.data
  return typeof data?.error_code === 'string' ? data.error_code : undefined
}

// Plaid returns every account of the item, so ask for the one that was linked.
async function getPlaidAccount(bank: Bank) {
  const accountsResponse = await plaidClient.accountsGet({
    access_token: bank.accessToken,
    options: { account_ids: [bank.accountId] }
  })

  const accountData = accountsResponse.data.accounts[0]
  if (!accountData) throw new Error(`Plaid account not found for bank ${bank.id}`)

  return accountData
}

function toAccount(accountData: AccountBase, bank: Bank): Account {
  return {
    id: accountData.account_id,
    availableBalance: accountData.balances.available ?? 0,
    currentBalance: accountData.balances.current ?? 0,
    name: accountData.name,
    officialName: accountData.official_name,
    mask: accountData.mask ?? '',
    type: accountData.type,
    subtype: accountData.subtype ?? '',
    bankRecordId: bank.id,
    sharableId: bank.sharableId
  }
}

function toTransaction(transaction: PlaidTransaction): Transaction {
  return {
    id: transaction.transaction_id,
    name: transaction.name,
    paymentChannel: transaction.payment_channel,
    type: transaction.payment_channel,
    accountId: transaction.account_id,
    amount: transaction.amount,
    pending: transaction.pending,
    category: transaction.personal_finance_category?.primary ?? 'OTHER',
    date: transaction.date,
    image: transaction.logo_url ?? null,
    details: {
      source: 'plaid',
      merchantName: transaction.merchant_name ?? null,
      website: transaction.website ?? null,
      originalDescription: transaction.original_description ?? null,
      categoryDetailed: transaction.personal_finance_category?.detailed ?? null,
      currency: transaction.iso_currency_code ?? transaction.unofficial_currency_code,
      authorizedDate: transaction.authorized_date,
      datetime: transaction.datetime,
      pendingTransactionId: transaction.pending_transaction_id,
      checkNumber: transaction.check_number ?? null,
      accountOwner: transaction.account_owner,
      location: withoutEmpty({
        address: transaction.location.address,
        city: transaction.location.city,
        region: transaction.location.region,
        postalCode: transaction.location.postal_code,
        country: transaction.location.country,
        storeNumber: transaction.location.store_number
      }),
      paymentMeta: withoutEmpty({
        referenceNumber: transaction.payment_meta.reference_number,
        payee: transaction.payment_meta.payee,
        payer: transaction.payment_meta.payer,
        byOrderOf: transaction.payment_meta.by_order_of,
        paymentMethod: transaction.payment_meta.payment_method,
        paymentProcessor: transaction.payment_meta.payment_processor,
        reason: transaction.payment_meta.reason
      }),
      counterparties: (transaction.counterparties ?? []).map(({ name, type, website }) => ({
        name,
        type,
        website
      }))
    }
  }
}

// Keeps only the fields Plaid filled in. The details sidebar translates the field names.
function withoutEmpty<Field extends string>(fields: Record<Field, string | null>) {
  return Object.fromEntries(
    Object.entries(fields).filter((entry): entry is [string, string] => Boolean(entry[1]))
  ) as Partial<Record<Field, string>>
}
