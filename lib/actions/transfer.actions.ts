'use server'

import { revalidatePath } from 'next/cache'

import { transferFormSchema } from '@/lib/utils'

import { createTransfer } from './dwolla.actions'
import { createTransaction } from './transaction.actions'
import { getBank, getBankBySharableId, getLoggedInUser } from './user.actions'

type TransferActionResult = { error: string } | { ok: true }

export async function transferFunds(input: unknown): Promise<TransferActionResult> {
  const parsed = transferFormSchema.safeParse(input)
  if (!parsed.success) return { error: 'Please check the highlighted fields' }

  const { name, email, amount, senderBank: senderBankId, sharableId } = parsed.data

  const user = await getLoggedInUser()
  if (!user) return { error: 'Not authenticated' }

  const [senderBank, receiverBank] = await Promise.all([
    getBank({ bankRecordId: senderBankId, userId: user.id }),
    getBankBySharableId({ sharableId })
  ])

  if (!senderBank) return { error: 'Please select one of your bank accounts' }
  if (!receiverBank) return { error: 'No bank account found for this sharable Id' }
  if (receiverBank.id === senderBank.id) return { error: 'You cannot transfer to the same account' }

  const transferUrl = await createTransfer({
    sourceFundingSourceUrl: senderBank.fundingSourceUrl,
    destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
    amount: Number(amount).toFixed(2)
  })

  if (!transferUrl) return { error: 'The transfer failed. Please try again.' }

  try {
    await createTransaction({
      name,
      email,
      amount: Number(amount),
      senderId: user.id,
      senderBankId: senderBank.id,
      receiverId: receiverBank.userId,
      receiverBankId: receiverBank.id,
      transferUrl
    })
  } catch (error) {
    // Dwolla has already accepted the transfer, so don't let the user retry and send it twice.
    console.error(`Transfer ${transferUrl} was sent but not saved:`, error)
    return { error: 'The transfer was sent, but it could not be added to your history.' }
  }

  revalidatePath('/', 'layout')

  return { ok: true }
}
