import Image from 'next/image'

import { useTranslations } from 'next-intl'

export default function AuthLayout({ children }: LayoutProps<'/[locale]'>) {
  const t = useTranslations('Auth')

  return (
    <main className='flex min-h-screen w-full justify-between'>
      {children}
      <div className='auth-asset'>
        <div>
          <Image
            src='/icons/auth-image.svg'
            alt={t('imageAlt')}
            width={500}
            height={500}
            className='rounded-l-xl object-contain'
          />
        </div>
      </div>
    </main>
  )
}
