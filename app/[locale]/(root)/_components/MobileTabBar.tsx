'use client'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import { Link, usePathname } from '@/app/_i18n/navigation'
import { sidebarLinks } from '@/app/[locale]/(root)/_lib/constants'
import { isActiveRoute } from '@/app/[locale]/(root)/_lib/utils'

const MobileTabBar = () => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')

  return (
    <nav
      aria-label={t('menuTitle')}
      className='fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t bg-card px-1 pt-1.5 pb-[max(env(safe-area-inset-bottom),0.75rem)] md:hidden'
    >
      {sidebarLinks.map((link) => {
        const isActive = isActiveRoute(pathname, link.route)

        return (
          <Link
            key={link.route}
            href={link.route}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex min-h-13 flex-col items-center justify-center gap-1 rounded-lg text-caption font-medium text-muted-foreground',
              { 'font-semibold text-accent-foreground': isActive }
            )}
          >
            <Icon name={link.icon} className='size-5' />
            {t(`short.${link.key}`)}
          </Link>
        )
      })}
    </nav>
  )
}

export default MobileTabBar
