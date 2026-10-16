import { getLoggedInUser } from '@/app/_lib/actions/user.actions'

import UserMenu from './UserMenu'

type PageHeaderProps = {
  title: React.ReactNode
  subtitle?: string
}

const PageHeader = async ({ title, subtitle }: PageHeaderProps) => {
  const user = await getLoggedInUser()

  return (
    <header className='flex items-center justify-between gap-6'>
      <div className='flex min-w-0 flex-col gap-1'>
        <h1 className='text-h1 font-semibold tracking-tight xl:text-h1-lg'>{title}</h1>
        {subtitle && <p className='text-body text-pretty text-muted-foreground'>{subtitle}</p>}
      </div>
      {user && <UserMenu user={user} className='max-md:hidden' />}
    </header>
  )
}

export default PageHeader
