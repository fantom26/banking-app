import { cn } from 'cn'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/_components/ui/table'
import {
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters
} from '@/app/_lib/utils'
import TransactionActions from '@/app/(root)/_components/TransactionActions'
import { transactionCategoryStyles } from '@/app/(root)/_lib/constants'

export const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] ||
    transactionCategoryStyles.default

  return (
    <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
      <div className={cn('size-2 rounded-full', backgroundColor)} />
      <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
    </div>
  )
}

const TransactionsTable = ({ transactions, showActions, selectedId }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className='bg-[#f9fafb]'>
        <TableRow>
          <TableHead className='px-2'>Transaction</TableHead>
          <TableHead className='px-2'>Amount</TableHead>
          <TableHead className='px-2'>Status</TableHead>
          <TableHead className='px-2'>Date</TableHead>
          <TableHead className='px-2 max-md:hidden'>Channel</TableHead>
          <TableHead className='px-2 max-md:hidden'>Category</TableHead>
          {showActions && <TableHead className='px-2 text-right'>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date))
          const amount = formatAmount(t.amount)

          const isDebit = t.type === 'debit'
          const isCredit = t.type === 'credit'

          return (
            <TableRow
              key={t.id}
              className={cn(
                isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]',
                '!over:bg-none !border-b-DEFAULT',
                t.id === selectedId && 'outline-2 -outline-offset-2 outline-blue-500'
              )}
            >
              <TableCell className='max-w-[250px] pr-10 pl-2'>
                <div className='flex items-center gap-3'>
                  <h1 className='truncate text-14 font-semibold text-[#344054]'>
                    {removeSpecialCharacters(t.name)}
                  </h1>
                </div>
              </TableCell>
              <TableCell
                className={`pr-10 pl-2 font-semibold ${
                  isDebit || amount[0] === '-' ? 'text-[#f04438]' : 'text-[#039855]'
                }`}
              >
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
              <TableCell className='pr-10 pl-2'>
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className='min-w-32 pr-10 pl-2'>
                {formatDateTime(new Date(t.date)).dateTime}
              </TableCell>
              <TableCell className='min-w-24 pr-10 pl-2 capitalize'>{t.paymentChannel}</TableCell>
              <TableCell className='pr-10 pl-2 max-md:hidden'>
                <CategoryBadge category={t.category} />
              </TableCell>
              {showActions && (
                <TableCell className='px-2 text-right'>
                  <TransactionActions transactionId={t.id} />
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionsTable
