import { useLocale, useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import { signOut } from '@/app/_lib/actions/auth.actions'

import LanguageSwitcher from './LanguageSwitcher'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const isMobile = type === 'mobile'
  const locale = useLocale()
  const t = useTranslations('Navigation')

  return (
    <footer className='footer'>
      <LanguageSwitcher type={type} />
      <div className='footer_row'>
        <div className={isMobile ? 'footer_name-mobile' : 'footer_name'}>
          <p className='text-xl font-bold text-gray-700'>{user.firstName[0]}</p>
        </div>

        <div className={isMobile ? 'footer_email-mobile' : 'footer_email'}>
          <h1 className='truncate text-14 font-semibold text-gray-700'>
            {user.firstName} {user.lastName}
          </h1>
          <p className='truncate text-14 font-normal text-gray-600'>{user.email}</p>
        </div>

        <form action={signOut.bind(null, locale)}>
          <button
            type='submit'
            className={isMobile ? 'footer_image-mobile' : 'footer_image'}
            aria-label={t('logOut')}
          >
            <Icon name='log-out' className='size-5 text-gray-500' />
          </button>
        </form>
      </div>
    </footer>
  )
}

export default Footer
