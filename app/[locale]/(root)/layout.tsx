import Logo from '@/app/_components/Logo'
import { Link, redirect } from '@/app/_i18n/navigation'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import MobileTabBar from '@/app/[locale]/(root)/_components/MobileTabBar'
import Sidebar from '@/app/[locale]/(root)/_components/Sidebar'
import UserMenu from '@/app/[locale]/(root)/_components/UserMenu'

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const user = await getLoggedInUser()
  if (!user) return redirect({ href: '/sign-in', locale: (await params).locale })

  return (
    <div className='flex min-h-screen w-full'>
      <Sidebar user={user} />

      <div className='flex min-w-0 flex-1 flex-col'>
        <div className='flex items-center justify-between gap-3 px-4 pt-3 md:hidden'>
          <Link href='/'>
            <Logo size='sm' />
          </Link>
          <UserMenu user={user} />
        </div>

        <main className='flex flex-1 flex-col gap-4 px-4 pt-3 pb-28 md:gap-4.5 md:px-6 md:py-5 xl:gap-5 xl:px-7 xl:py-6'>
          {children}
        </main>
      </div>

      <MobileTabBar />
    </div>
  )
}
