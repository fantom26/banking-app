// Server-only, not 'use server': inserts use the secret key and must not be callable from the browser.
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'

import 'server-only'

type TransactionRow = Database['public']['Tables']['transactions']['Row']

export async function createTransaction({
  name,
  amount,
  email,
  senderId,
  senderBankId,
  receiverId,
  receiverBankId,
  transferUrl
}: CreateTransactionProps) {
  const admin = createAdminClient()

  const { error } = await admin.from('transactions').insert({
    name,
    amount,
    email,
    sender_id: senderId,
    sender_bank_id: senderBankId,
    receiver_id: receiverId,
    receiver_bank_id: receiverBankId,
    transfer_url: transferUrl
  })

  if (error) throw new Error(`Error creating transaction: ${error.message}`)
}

// Uses the session client, so RLS limits the result to transfers the user sent or received.
export async function getTransactionsByBankId({
  bankId,
  accountId
}: getTransactionsByBankIdProps): Promise<Transaction[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .or(`sender_bank_id.eq.${bankId},receiver_bank_id.eq.${bankId}`)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to load transactions: ${error.message}`)

  return data.map((row) => toTransaction(row, bankId, accountId))
}

function toTransaction(row: TransactionRow, bankId: string, accountId: string): Transaction {
  const isSender = row.sender_bank_id === bankId

  return {
    id: row.id,
    name: row.name,
    paymentChannel: row.channel,
    type: isSender ? 'debit' : 'credit',
    accountId,
    amount: row.amount,
    pending: false,
    category: isSender ? 'TRANSFER_OUT' : 'TRANSFER_IN',
    date: row.created_at,
    image: null,
    channel: row.channel,
    senderBankId: row.sender_bank_id,
    receiverBankId: row.receiver_bank_id
  }
}
