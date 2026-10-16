import { cn } from 'cn'
import { useTranslations } from 'next-intl'

const sizes = {
  sm: { mark: 'size-7', name: 'text-[19px]' },
  md: { mark: 'size-7.5', name: 'text-[21px]' },
  lg: { mark: 'size-8', name: 'text-[22px]' }
}

type LogoProps = {
  size?: keyof typeof sizes
  className?: string
  nameClassName?: string
}

const Logo = ({ size = 'md', className, nameClassName }: LogoProps) => {
  const t = useTranslations('Common')

  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <svg viewBox='0 0 32 32' className={cn('shrink-0', sizes[size].mark)} aria-hidden>
        <rect width='32' height='32' rx='14' className='fill-primary' />
        <circle cx='16' cy='16' r='5' fill='none' strokeWidth='2.6' className='stroke-white' />
      </svg>
      <span className={cn('font-bold tracking-tight', sizes[size].name, nameClassName)}>
        {t('appName')}
      </span>
    </span>
  )
}

export default Logo
