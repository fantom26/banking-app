'use client'

import { useTranslations } from 'next-intl'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/_components/ui/sheet'
import { useRouter } from '@/app/_i18n/navigation'

type TransactionDetailsSheetProps = {
  closeHref: string
  children: React.ReactNode
}

const TransactionDetailsSheet = ({ closeHref, children }: TransactionDetailsSheetProps) => {
  const router = useRouter()
  const t = useTranslations('TransactionDetails')

  return (
    <Sheet open onOpenChange={(open) => !open && router.push(closeHref, { scroll: false })}>
      <SheetContent
        side='right'
        closeLabel={t('close')}
        aria-describedby={undefined}
        className='w-full gap-0 overflow-y-auto sm:max-w-md'
      >
        <SheetHeader className='px-5 pt-5 pb-4'>
          <SheetTitle className='text-title font-semibold'>{t('title')}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export default TransactionDetailsSheet
