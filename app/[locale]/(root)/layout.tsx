import Logo from '@/app/_components/Logo'
import { redirect } from '@/app/_i18n/navigation'
import { getLoggedInUser } from '@/app/_lib/actions/user.actions'
import MobileNav from '@/app/[locale]/(root)/_components/MobileNav'
import Sidebar from '@/app/[locale]/(root)/_components/Sidebar'

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const user = await getLoggedInUser()
  if (!user) return redirect({ href: '/sign-in', locale: (await params).locale })

  return (
    <main className='flex h-screen w-full'>
      <Sidebar user={user} />
      <div className='flex size-full flex-col'>
        <div className='root-layout'>
          <Logo size='sm' />
          <div>
            <MobileNav user={user} />
          </div>
        </div>
        {children}
      </div>
    </main>
  )
}
