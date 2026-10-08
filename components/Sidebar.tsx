'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from 'cn'

import { sidebarLinks } from '@/constants'

import Footer from './Footer'
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
              <Image
                className={cn({ 'brightness-[3] invert-0': isActive })}
                src={link.imgURL}
                width={24}
                height={24}
                alt={link.label}
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
