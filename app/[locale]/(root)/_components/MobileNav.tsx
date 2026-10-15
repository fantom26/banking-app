'use client'

import Image from 'next/image'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger
} from '@/app/_components/ui/sheet'
import { Link, usePathname } from '@/app/_i18n/navigation'
import { sidebarLinks } from '@/app/[locale]/(root)/_lib/constants'
import { isActiveRoute } from '@/app/[locale]/(root)/_lib/utils'

import Footer from './Footer'

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname()
  const t = useTranslations('Navigation')
  const tCommon = useTranslations('Common')

  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger aria-label={t('openMenu')}>
          <Icon name='menu' className='size-[30px] cursor-pointer text-gray-700' />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-white'>
          <SheetTitle className='sr-only'>{t('menuTitle')}</SheetTitle>
          <Link href='/' className='flex cursor-pointer items-center gap-1 px-4'>
            <Image src='/icons/logo.svg' width={34} height={34} alt={tCommon('logoAlt')} />
            <h2 className='font-ibm-plex-serif text-26 font-bold text-black-1'>Horizon</h2>
          </Link>
          <div className='mobilenav-sheet'>
            <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
              {sidebarLinks.map((item) => {
                const isActive = isActiveRoute(pathname, item.route)

                return (
                  <SheetClose asChild key={item.route}>
                    <Link
                      href={item.route}
                      className={cn('mobilenav-sheet_close w-full', {
                        'bg-bank-gradient': isActive
                      })}
                    >
                      <Icon
                        name={item.icon}
                        className={cn('size-5 shrink-0 text-gray-500', { 'text-white': isActive })}
                      />
                      <p
                        className={cn('text-16 font-semibold text-black-2', {
                          'text-white': isActive
                        })}
                      >
                        {t(item.key)}
                      </p>
                    </Link>
                  </SheetClose>
                )
              })}
            </nav>

            <Footer user={user} type='mobile' />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav
