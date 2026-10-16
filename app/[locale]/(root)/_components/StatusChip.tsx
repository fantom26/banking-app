import { useTranslations } from 'next-intl'

import { Badge } from '@/app/_components/ui/badge'

const StatusChip = ({ pending }: { pending: boolean }) => {
  const t = useTranslations('Status')

  return (
    <Badge variant={pending ? 'default' : 'muted'}>
      <span aria-hidden className='size-1.5 rounded-full bg-current' />
      {pending ? t('pending') : t('posted')}
    </Badge>
  )
}

export default StatusChip
