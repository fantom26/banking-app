'use client'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import Logo from '@/app/_components/Logo'
import PlaidLink from '@/app/_components/PlaidLinks'
import { Link, usePathname } from '@/app/_i18n/navigation'
import { sidebarLinks } from '@/app/[locale]/(root)/_lib/constants'
import { isActiveRoute } from '@/app/[locale]/(root)/_lib/utils'

import Footer from './Footer'

const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname()
  const t = useTranslations('Navigation')

  return (
    <aside className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href='/' className='mb-12 flex cursor-pointer items-center gap-2'>
          <Logo nameClassName='max-xl:sr-only' />
        </Link>

        {sidebarLinks.map((link) => {
          const isActive = isActiveRoute(pathName, link.route)
          return (
            <Link
              key={link.route}
              href={link.route}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <Icon
                name={link.icon}
                className={cn('size-6 shrink-0 text-gray-500', { 'text-white': isActive })}
              />
              <p className={cn('sidebar-label', { 'text-white!': isActive })}>{t(link.key)}</p>
            </Link>
          )
        })}
        <PlaidLink user={user} />
      </nav>

      <Footer user={user} />
    </aside>
  )
}

export default Sidebar
