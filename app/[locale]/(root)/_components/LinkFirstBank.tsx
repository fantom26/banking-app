import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import PlaidLink from '@/app/_components/PlaidLinks'
import { Card } from '@/app/_components/ui/card'

const LinkFirstBank = ({ user }: { user: User }) => {
  const t = useTranslations('EmptyState')

  return (
    <Card size='lg' className='items-start gap-5 md:p-10'>
      <span className='grid size-14 place-items-center rounded-xl bg-accent text-accent-foreground'>
        <Icon name='landmark' className='size-6.5' />
      </span>
      <div className='flex max-w-140 flex-col gap-2'>
        <h2 className='text-[30px] leading-tight font-semibold tracking-tight'>{t('title')}</h2>
        <p className='text-base/relaxed text-pretty text-muted-foreground'>{t('description')}</p>
      </div>
      <PlaidLink user={user} size='lg' />
      <p className='flex items-center gap-2 text-caption text-muted-foreground'>
        <Icon name='shield-check' className='size-4 shrink-0 text-accent-foreground' />
        {t('note')}
      </p>
    </Card>
  )
}

export default LinkFirstBank
