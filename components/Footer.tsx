import { signOut } from '@/lib/actions/auth.actions'

import Icon from './Icon'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const isMobile = type === 'mobile'

  return (
    <footer className='footer'>
      <div className={isMobile ? 'footer_name-mobile' : 'footer_name'}>
        <p className='text-xl font-bold text-gray-700'>{user.firstName[0]}</p>
      </div>

      <div className={isMobile ? 'footer_email-mobile' : 'footer_email'}>
        <h1 className='text-14 truncate font-semibold text-gray-700'>
          {user.firstName} {user.lastName}
        </h1>
        <p className='text-14 truncate font-normal text-gray-600'>{user.email}</p>
      </div>

      <form action={signOut}>
        <button
          type='submit'
          className={isMobile ? 'footer_image-mobile' : 'footer_image'}
          aria-label='Log out'
        >
          <Icon name='log-out' className='size-5 text-gray-500' />
        </button>
      </form>
    </footer>
  )
}

export default Footer
