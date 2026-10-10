'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from 'cn'

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'

import Footer from './Footer'
import Icon from './Icon'

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname()

  return (
    <section className='w-fulll max-w-[264px]'>
      <Sheet>
        <SheetTrigger aria-label='Open navigation'>
          <Icon name='menu' className='size-[30px] cursor-pointer text-gray-700' />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-white'>
          <SheetTitle className='sr-only'>Navigation</SheetTitle>
          <Link href='/' className='cursor-pointer flex items-center gap-1 px-4'>
            <Image src='/icons/logo.svg' width={34} height={34} alt='Horizon logo' />
            <h2 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h2>
          </Link>
          <div className='mobilenav-sheet'>
            <nav className='flex h-full flex-col gap-6 pt-16 text-white'>
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

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
                        {item.label}
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
