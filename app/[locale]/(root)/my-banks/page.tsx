import { getFormatter, getTranslations } from 'next-intl/server'

import BankCard from '@/app/_components/BankCard'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { Card } from '@/app/_components/ui/card'
import { Link } from '@/app/_i18n/navigation'
import { getAccounts } from '@/app/_lib/actions/account.actions'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import { humanize } from '@/app/_lib/utils'
import Copy from '@/app/[locale]/(root)/_components/Copy'
import LinkFirstBank from '@/app/[locale]/(root)/_components/LinkFirstBank'
import PageHeader from '@/app/[locale]/(root)/_components/PageHeader'

export default async function MyBanks() {
  const t = await getTranslations('MyBanks')
  const format = await getFormatter()
  const user = await getLoggedInUser()
  if (!user) return null

  const accounts = await getAccounts({ userId: user.id })
  const holder = `${user.firstName} ${user.lastName}`

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtext')} />

      {accounts.data.length === 0 ? (
        <LinkFirstBank user={user} />
      ) : (
        <ul className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
          {accounts.data.map((account) => {
            const historyHref = `/transaction-history?id=${account.bankRecordId}`

            return (
              <li key={account.id}>
                <Card size='sm' className='h-full gap-4'>
                  <Link
                    href={historyHref}
                    className='rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
                  >
                    <BankCard
                      name={account.name}
                      subtitle={account.officialName}
                      mask={account.mask}
                      holder={holder}
                    />
                  </Link>

                  <div className='flex items-end justify-between gap-3 px-1'>
                    <div className='flex min-w-0 flex-col gap-0.5'>
                      <span className='text-caption text-muted-foreground'>
                        {t('currentBalance')}
                      </span>
                      <span className='text-stat font-bold tracking-tight tabular-nums'>
                        {format.number(account.currentBalance, 'currency')}
                      </span>
                    </div>
                    <Badge className='shrink-0'>
                      {[humanize(account.type), account.subtype].filter(Boolean).join(' · ')}
                    </Badge>
                  </div>

                  <Copy value={account.sharableId} label={t('sharableId')} />

                  <Button asChild className='mt-auto w-full'>
                    <Link href={historyHref}>{t('viewTransactions')}</Link>
                  </Button>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
