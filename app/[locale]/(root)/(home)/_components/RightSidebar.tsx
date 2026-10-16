import { useTranslations } from 'next-intl'

import BankCard from '@/app/_components/BankCard'
import Icon from '@/app/_components/Icon'
import { Link } from '@/app/_i18n/navigation'
import RightSidebar from '@/app/[locale]/(root)/_components/RightSidebar'
import { countTransactionCategories } from '@/app/[locale]/(root)/(home)/_lib/utils'

import Category from './Category'

const HomeRightSidebar = ({ user, banks, transactions }: RightSidebarProps) => {
  const t = useTranslations('HomePage')
  const categories: CategoryCount[] = countTransactionCategories(transactions)

  return (
    <RightSidebar>
      <section className='flex flex-col pb-8'>
        <div className='profile-banner' />
        <div className='profile'>
          <div className='profile-img'>
            <span className='text-5xl font-bold text-blue-500'>{user.firstName[0]}</span>
          </div>

          <div className='profile-details'>
            <h1 className='profile-name'>
              {user.firstName} {user.lastName}
            </h1>
            <p className='profile-email'>{user.email}</p>
          </div>
        </div>
      </section>

      <section className='banks'>
        <div className='flex w-full justify-between'>
          <h2 className='header-2'>{t('myBanks')}</h2>
          <Link href='/' className='flex gap-2'>
            <Icon name='plus' className='size-5 text-gray-600' />
            <h2 className='text-14 font-semibold text-gray-600'>{t('addBank')}</h2>
          </Link>
        </div>
        {banks?.length > 0 && (
          <div className='relative flex flex-1 flex-col items-center justify-center gap-5'>
            <Link
              href={`/transaction-history/?id=${banks[0].bankRecordId}`}
              className='relative z-10 w-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
            >
              <BankCard
                name={banks[0].name}
                subtitle={banks[0].officialName}
                mask={banks[0].mask}
                holder={`${user.firstName} ${user.lastName}`}
              />
            </Link>
            {banks[1] && (
              <Link
                href={`/transaction-history/?id=${banks[1].bankRecordId}`}
                className='absolute top-8 right-0 z-0 w-[90%] rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/30'
              >
                <BankCard
                  name={banks[1].name}
                  subtitle={banks[1].officialName}
                  mask={banks[1].mask}
                  holder={`${user.firstName} ${user.lastName}`}
                />
              </Link>
            )}
          </div>
        )}
        <div className='mt-10 flex flex-1 flex-col gap-6'>
          <h2 className='header-2'>{t('topCategories')}</h2>

          <div className='space-y-5'>
            {categories.map((category) => (
              <Category key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>
    </RightSidebar>
  )
}

export default HomeRightSidebar
