import { cn } from 'cn'
import { useTranslations } from 'next-intl'

import Icon from './Icon'

const covers = {
  ocean: 'bg-(image:--cover-ocean) text-(--cover-ocean-ink)',
  graphite: 'bg-(image:--cover-graphite) text-(--cover-graphite-ink)',
  frost: 'bg-(image:--cover-frost) text-(--cover-frost-ink)'
}

export type BankCardCover = keyof typeof covers

type BankCardProps = {
  name: string
  subtitle?: string | null
  mask: string
  holder: string
  cover?: BankCardCover
  className?: string
}

const BankCard = ({ name, subtitle, mask, holder, cover = 'ocean', className }: BankCardProps) => {
  const t = useTranslations('BankCard')

  return (
    <div className={cn('@container w-full', className)}>
      <div
        className={cn(
          'relative isolate flex aspect-[1.586] flex-col justify-between overflow-hidden rounded-xl p-[7cqw] shadow-plastic ring-1 ring-white/10 ring-inset',
          covers[cover]
        )}
      >
        <div
          aria-hidden
          className='absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_100%_0%,rgb(255_255_255/0.16),transparent_60%)]'
        />

        <div className='flex items-start justify-between gap-[3cqw]'>
          <div className='flex min-w-0 flex-col gap-[1cqw]'>
            <span className='truncate text-[4.6cqw] leading-none font-semibold'>{name}</span>
            {subtitle && <span className='truncate text-[3.4cqw] opacity-80'>{subtitle}</span>}
          </div>
          <Icon name='nfc' className='size-[6.4cqw] shrink-0 opacity-85' />
        </div>

        <div
          aria-hidden
          className='aspect-[1.3] w-[12.5cqw] rounded-[2cqw] bg-(image:--card-chip) ring-1 ring-black/15 ring-inset'
        />

        <div className='flex flex-col gap-[2.8cqw]'>
          <span className='text-[5.4cqw] font-medium tracking-[0.12em] tabular-nums'>
            <span aria-hidden>•••• </span>
            <span className='sr-only'>{t('endingIn')} </span>
            {mask}
          </span>
          <div className='flex flex-col gap-[0.6cqw] text-[3.4cqw] tracking-[0.06em] uppercase'>
            <span className='text-[2.6cqw] opacity-70'>{t('holder')}</span>
            <span className='truncate font-medium'>{holder}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankCard
