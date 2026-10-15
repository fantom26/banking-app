import Image from 'next/image'

import { getTranslations } from 'next-intl/server'

import { redirect } from '@/app/_i18n/navigation'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import MobileNav from '@/app/[locale]/(root)/_components/MobileNav'
import Sidebar from '@/app/[locale]/(root)/_components/Sidebar'

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const user = await getLoggedInUser()
  if (!user) return redirect({ href: '/sign-in', locale: (await params).locale })
  const t = await getTranslations('Common')

  return (
    <main className='flex h-screen w-full font-inter'>
      <Sidebar user={user} />
      <div className='flex size-full flex-col'>
        <div className='root-layout'>
          <Image src='/icons/logo.svg' width={30} height={30} alt={t('logoAlt')} />
          <div>
            <MobileNav user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
