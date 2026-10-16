import { useTranslations } from 'next-intl'

import { Link } from '@/app/_i18n/navigation'

type AccountSwitcherProps = {
  accounts: Account[]
  selectedId: string
}

const AccountSwitcher = ({ accounts, selectedId }: AccountSwitcherProps) => {
  const t = useTranslations('HomePage')

  return (
    <nav
      aria-label={t('accountSwitcher')}
      className='no-scrollbar flex w-fit max-w-full gap-0.5 overflow-x-auto rounded-lg bg-muted p-0.75'
    >
      {accounts.map((account) => (
        <Link
          key={account.bankRecordId}
          href={`/?id=${account.bankRecordId}`}
          scroll={false}
          aria-current={account.bankRecordId === selectedId ? 'page' : undefined}
          className='flex h-9 shrink-0 items-center rounded-md px-3.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 aria-[current=page]:bg-card aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-[current=page]:shadow-raised'
        >
          {account.name}
        </Link>
      ))}
    </nav>
  )
}

export default AccountSwitcher
