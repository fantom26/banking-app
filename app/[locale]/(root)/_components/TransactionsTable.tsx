import { cn } from 'cn'
import { useFormatter, useTranslations } from 'next-intl'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/_components/ui/table'
import { getTransactionStatus, removeSpecialCharacters } from '@/app/_lib/utils'
import TransactionActions from '@/app/[locale]/(root)/_components/TransactionActions'
import { transactionCategoryStyles } from '@/app/[locale]/(root)/_lib/constants'

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
  const format = useFormatter()
  const tColumn = useTranslations('Transactions.columns')

  return (
    <Table>
      <TableHeader className='bg-[#f9fafb]'>
        <TableRow>
          <TableHead className='px-2'>{tColumn('transaction')}</TableHead>
          <TableHead className='px-2'>{tColumn('amount')}</TableHead>
          <TableHead className='px-2'>{tColumn('status')}</TableHead>
          <TableHead className='px-2'>{tColumn('date')}</TableHead>
          <TableHead className='px-2 max-md:hidden'>{tColumn('channel')}</TableHead>
          <TableHead className='px-2 max-md:hidden'>{tColumn('category')}</TableHead>
          {showActions && <TableHead className='px-2 text-right'>{tColumn('actions')}</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
          const status = getTransactionStatus(new Date(t.date))
          const amount = format.number(t.amount, 'currency')

          const isDebit = t.type === 'debit'
          const isNegative = isDebit || t.amount < 0

          return (
            <TableRow
              key={t.id}
              className={cn(
                isNegative ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]',
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
                  isNegative ? 'text-[#f04438]' : 'text-[#039855]'
                }`}
              >
                {isDebit ? `-${amount}` : amount}
              </TableCell>
              <TableCell className='pr-10 pl-2'>
                <CategoryBadge category={status} />
              </TableCell>
              <TableCell className='min-w-32 pr-10 pl-2'>
                {format.dateTime(new Date(t.date), 'withTime')}
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
