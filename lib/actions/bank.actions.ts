'use server'

import { revalidatePath } from 'next/cache'

import {
  type CountryCode,
  type ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  type Products
} from 'plaid'

import { createAdminClient } from '@/lib/supabase/admin'

import { plaidClient } from '../plaid'
import { encryptId, parseStringify } from '../utils'
import { addFundingSource } from './dwolla.actions'
import { getLoggedInUser } from './user.actions'

// Every export here is a public endpoint, so the user always comes from the session,
// never from the client.

export const createLinkToken = async () => {
  try {
    const user = await getLoggedInUser()
    if (!user) throw new Error('Not authenticated')

    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: user.id
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[]
    })

    return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.error('An error occurred while creating a link token:', error)
  }
}

export const exchangePublicToken = async ({ publicToken }: exchangePublicTokenProps) => {
  try {
    const user = await getLoggedInUser()
    if (!user) throw new Error('Not authenticated')
    if (!user.dwollaCustomerId) throw new Error('User has no Dwolla customer')

    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken
    })

    const accessToken = response.data.access_token
    const itemId = response.data.item_id

    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken
    })

    const accountData = accountsResponse.data.accounts[0]

    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: ProcessorTokenCreateRequestProcessorEnum.Dwolla
    }

    const processorTokenResponse = await plaidClient.processorTokenCreate(request)
    const processorToken = processorTokenResponse.data.processor_token

    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name
    })

    if (!fundingSourceUrl) throw new Error('Error creating Dwolla funding source')

    await createBankAccount({
      userId: user.id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id)
    })

    revalidatePath('/')

    return parseStringify({
      publicTokenExchange: 'complete'
    })
  } catch (error) {
    console.error('An error occurred while exchanging the public token:', error)
  }
}

// Not exported: it would otherwise be callable from the browser with any userId.
async function createBankAccount({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId
}: createBankAccountProps) {
  const admin = createAdminClient()

  const { error } = await admin.from('banks').insert({
    user_id: userId,
    bank_id: bankId,
    account_id: accountId,
    access_token: accessToken,
    funding_source_url: fundingSourceUrl,
    sharable_id: sharableId
  })

  if (error) throw new Error(`Error creating bank account: ${error.message}`)
}
