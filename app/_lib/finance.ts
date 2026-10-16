export const signedAmount = (transaction: Transaction) =>
  transaction.type === 'credit' ? transaction.amount : -transaction.amount

export const groupByDay = (transactions: Transaction[]) => {
  const groups: { day: string; transactions: Transaction[] }[] = []

  for (const transaction of transactions) {
    const day = transaction.date.slice(0, 10)
    const last = groups.at(-1)

    if (last?.day === day) last.transactions.push(transaction)
    else groups.push({ day, transactions: [transaction] })
  }

  return groups
}
