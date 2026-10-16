import { cn } from 'cn'
import { useFormatter, useTranslations } from 'next-intl'

import { Button } from '@/app/_components/ui/button'
import { Card, CardAction, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Link } from '@/app/_i18n/navigation'
import { humanize } from '@/app/_lib/utils'
import TransactionList from '@/app/[locale]/(root)/_components/TransactionList'

import AccountSwitcher from './AccountSwitcher'

type RecentTransactionsProps = {
  accounts: Account[]
  account: Account
  transactions: Transaction[]
  className?: string
}

const RecentTransactions = ({
  accounts,
  account,
  transactions,
  className
}: RecentTransactionsProps) => {
  const t = useTranslations('HomePage')
  const format = useFormatter()

  return (
    <Card className={cn('min-w-0 gap-3', className)}>
      <CardHeader>
        <CardTitle>{t('recentTransactions')}</CardTitle>
        <CardAction>
          <Button asChild variant='link' className='text-caption'>
            <Link href={`/transaction-history?id=${account.bankRecordId}`}>{t('viewAll')}</Link>
          </Button>
        </CardAction>
      </CardHeader>

      {accounts.length > 1 && (
        <AccountSwitcher accounts={accounts} selectedId={account.bankRecordId} />
      )}

      <p className='text-caption text-muted-foreground'>
        {[
          account.name,
          account.subtype && humanize(account.subtype),
          format.number(account.currentBalance, 'currency')
        ]
          .filter(Boolean)
          .join(' · ')}
      </p>

      <TransactionList transactions={transactions.slice(0, 10)} />
    </Card>
  )
}

export default RecentTransactions
