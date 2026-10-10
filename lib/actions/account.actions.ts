import { type AccountBase, type CountryCode, type Transaction as PlaidTransaction } from 'plaid'

import { plaidClient } from '../plaid'
import { getTransactionsByBankId } from './transaction.actions'
import { getBank, getBanks } from './user.actions'

import 'server-only'

export async function getAccounts({ userId }: getAccountsProps) {
  const banks = await getBanks({ userId })

  const accounts = await Promise.all(
    banks.map(async (bank) => {
      const { accountData, institutionId } = await getPlaidAccount(bank)
      const institution = await getInstitution({ institutionId })

      return toAccount(accountData, institution.institution_id, bank)
    })
  )

  const totalBanks = accounts.length
  const totalCurrentBalance = accounts.reduce((total, account) => total + account.currentBalance, 0)

  return { data: accounts, totalBanks, totalCurrentBalance }
}

export async function getAccount({ bankRecordId, userId }: getAccountProps) {
  // Returns null for an unknown bank or one that belongs to another user.
  const bank = await getBank({ bankRecordId, userId })
  if (!bank) return null

  const { accountData, institutionId } = await getPlaidAccount(bank)

  const [institution, plaidTransactions, transferTransactions] = await Promise.all([
    getInstitution({ institutionId }),
    getTransactions({ accessToken: bank.accessToken }),
    getTransactionsByBankId({ bankId: bank.id, accountId: bank.accountId })
  ])

  const sortedTransactions = [...transferTransactions, ...plaidTransactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return {
    data: toAccount(accountData, institution.institution_id, bank),
    transactions: sortedTransactions
  }
}

export async function getInstitution({ institutionId }: getInstitutionProps) {
  const institutionResponse = await plaidClient.institutionsGetById({
    institution_id: institutionId,
    country_codes: ['US'] as CountryCode[]
  })

  return institutionResponse.data.institution
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
  const institutionId = accountsResponse.data.item.institution_id
  if (!accountData || !institutionId) throw new Error(`Plaid account not found for bank ${bank.id}`)

  return { accountData, institutionId }
}

function toAccount(accountData: AccountBase, institutionId: string, bank: Bank): Account {
  return {
    id: accountData.account_id,
    availableBalance: accountData.balances.available ?? 0,
    currentBalance: accountData.balances.current ?? 0,
    institutionId,
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
    image: transaction.logo_url ?? null
  }
}
