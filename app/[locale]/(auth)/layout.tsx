import { useTranslations } from 'next-intl'

import BankCard from '@/app/_components/BankCard'
import Icon from '@/app/_components/Icon'

export default function AuthLayout({ children }: LayoutProps<'/[locale]'>) {
  const t = useTranslations('Auth.panel')

  return (
    <main className='grid min-h-screen gap-4 bg-sidebar p-4 lg:grid-cols-2'>
      <div className='flex items-center justify-center px-2 py-10 sm:px-6 lg:px-12'>{children}</div>

      <aside className='flex flex-col justify-between gap-10 overflow-hidden rounded-lg bg-accent p-14 max-lg:hidden'>
        <div className='flex max-w-115 flex-col gap-3'>
          <span className='flex h-7 w-fit items-center gap-1.5 rounded-sm bg-card px-2.5 text-caption font-medium text-accent-foreground'>
            <Icon name='shield-check' className='size-3.5' />
            {t('badge')}
          </span>
          <h2 className='text-[44px] leading-[1.08] font-semibold tracking-[-0.03em] text-balance'>
            {t('title')}
          </h2>
        </div>

        <div aria-hidden className='relative h-110'>
          <BankCard
            cover='frost'
            name={t('cards.savings.name')}
            subtitle={t('cards.savings.subtitle')}
            mask='0937'
            holder={t('holder')}
            className='absolute top-7.5 left-[30%] w-[min(400px,70%)] rotate-7'
          />
          <BankCard
            name={t('cards.checking.name')}
            subtitle={t('cards.checking.subtitle')}
            mask='4821'
            holder={t('holder')}
            className='absolute top-37.5 left-[4%] w-[min(400px,70%)] -rotate-5'
          />
        </div>
      </aside>
    </main>
  )
}
