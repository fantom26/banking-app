'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from 'cn'

import { sidebarLinks } from '@/constants'

import Footer from './Footer'
import Icon from './Icon'
import PlaidLink from './PlaidLinks'

const Sidebar = ({ user }: SiderbarProps) => {
  const pathName = usePathname()

  return (
    <aside className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link href='/' className='mb-12 cursor-pointer flex items-center gap-2'>
          <Image
            src='/icons/logo.svg'
            className='size-[24px] max-xl:size-14'
            width={34}
            height={34}
            alt='Horizon logo'
          />
          <h2 className='sidebar-logo'>Horizon</h2>
        </Link>

        {sidebarLinks.map((link) => {
          const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`)
          return (
            <Link
              key={link.label}
              href={link.route}
              className={cn('sidebar-link', { 'bg-bank-gradient': isActive })}
            >
              <Icon
                name={link.icon}
                className={cn('size-6 shrink-0 text-gray-500', { 'text-white': isActive })}
              />
              <p className={cn('sidebar-label', { 'text-white!': isActive })}>{link.label}</p>
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
