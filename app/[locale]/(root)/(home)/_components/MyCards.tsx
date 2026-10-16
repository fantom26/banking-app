import { cn } from 'cn'
import { useFormatter, useTranslations } from 'next-intl'

import BankCard from '@/app/_components/BankCard'
import { Button } from '@/app/_components/ui/button'
import { Card, CardAction, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { Link } from '@/app/_i18n/navigation'

type MyCardsProps = {
  accounts: Account[]
  holder: string
  className?: string
}

const MyCards = ({ accounts, holder, className }: MyCardsProps) => {
  const t = useTranslations('HomePage')
  const format = useFormatter()

  return (
    <Card className={cn('min-w-0 gap-3.5', className)}>
      <CardHeader>
        <CardTitle>{t('myCards')}</CardTitle>
        <CardAction>
          <Button asChild variant='link' className='text-caption'>
            <Link href='/my-banks'>{t('viewAll')}</Link>
          </Button>
        </CardAction>
      </CardHeader>

      <ul className='-mx-5 -my-1 no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 py-1'>
        {accounts.map((account) => (
          <li
            key={account.id}
            className={cn(
              'flex shrink-0 snap-start flex-col gap-3',
              accounts.length > 1 ? 'w-[88%]' : 'w-full'
            )}
          >
            <Link
              href={`/transaction-history?id=${account.bankRecordId}`}
              className='rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
            >
              <BankCard
                name={account.name}
                subtitle={account.officialName}
                mask={account.mask}
                holder={holder}
              />
            </Link>
            <div className='flex flex-col gap-0.5 px-1'>
              <span className='text-caption text-muted-foreground'>{t('available')}</span>
              <span className='text-lg font-bold tabular-nums'>
                {format.number(account.availableBalance, 'currency')}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default MyCards
