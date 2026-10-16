'use client'

import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import Logo from '@/app/_components/Logo'
import PlaidLink from '@/app/_components/PlaidLinks'
import { Link, usePathname } from '@/app/_i18n/navigation'
import { signOut } from '@/app/_lib/actions/auth.actions'
import { sidebarLinks } from '@/app/[locale]/(root)/_lib/constants'
import { isActiveRoute } from '@/app/[locale]/(root)/_lib/utils'

const itemClassName =
  'flex h-11 items-center gap-3 rounded-lg px-3.5 text-body font-medium text-sidebar-foreground transition-colors hover:bg-muted hover:text-foreground max-xl:justify-center max-xl:px-0'

const Sidebar = ({ user }: { user: User }) => {
  const pathName = usePathname()
  const locale = useLocale()
  const t = useTranslations('Navigation')
  const tPlaid = useTranslations('PlaidLink')

  return (
    <aside className='sticky top-0 flex h-screen w-19 shrink-0 flex-col gap-7 border-r border-sidebar-border bg-sidebar px-4 py-6 max-xl:px-3 max-xl:py-5 max-md:hidden xl:w-62'>
      <Link href='/' className='flex px-1.5 max-xl:justify-center max-xl:px-0'>
        <Logo nameClassName='max-xl:sr-only' />
      </Link>

      <nav aria-label={t('menuTitle')} className='mt-3 flex flex-col gap-0.5'>
        {sidebarLinks.map((link) => {
          const isActive = isActiveRoute(pathName, link.route)

          return (
            <Link
              key={link.route}
              href={link.route}
              aria-current={isActive ? 'page' : undefined}
              className={cn(itemClassName, {
                'bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-raised hover:bg-sidebar-accent':
                  isActive
              })}
            >
              <Icon
                name={link.icon}
                className={cn('size-4.5 shrink-0', { 'text-sidebar-primary': isActive })}
              />
              <span className='max-xl:sr-only'>{t(link.key)}</span>
            </Link>
          )
        })}
      </nav>

      <div className='mx-2 h-px bg-sidebar-border' />

      <form action={signOut.bind(null, locale)}>
        <button type='submit' className={cn(itemClassName, 'w-full cursor-pointer')}>
          <Icon name='log-out' className='size-4.5 shrink-0' />
          <span className='max-xl:sr-only'>{t('logOut')}</span>
        </button>
      </form>

      <PlaidLink
        user={user}
        variant='outline'
        className='mt-auto h-auto w-full justify-start gap-3 rounded-xl p-3 text-left whitespace-normal max-xl:size-11 max-xl:justify-center max-xl:self-center max-xl:rounded-lg max-xl:p-0'
      >
        <span className='grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground max-xl:size-auto max-xl:bg-transparent'>
          <Icon name='link' />
        </span>
        <span className='flex flex-col gap-0.5 max-xl:sr-only'>
          <span className='text-sm font-semibold'>{tPlaid('linkBank')}</span>
          <span className='text-caption font-normal text-muted-foreground'>
            {tPlaid('linkBankHint')}
          </span>
        </span>
      </PlaidLink>
    </aside>
  )
}

export default Sidebar
