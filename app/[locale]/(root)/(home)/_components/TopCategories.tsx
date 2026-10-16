import { cn } from 'cn'
import { useTranslations } from 'next-intl'

import { Card, CardHeader, CardTitle } from '@/app/_components/ui/card'
import { countTransactionCategories } from '@/app/[locale]/(root)/(home)/_lib/utils'

import Category from './Category'

type TopCategoriesProps = {
  transactions: Transaction[]
  className?: string
}

const TopCategories = ({ transactions, className }: TopCategoriesProps) => {
  const t = useTranslations('HomePage')
  const categories = countTransactionCategories(transactions).slice(0, 5)

  return (
    <Card className={cn('gap-3.5', className)}>
      <CardHeader>
        <CardTitle>{t('topCategories')}</CardTitle>
      </CardHeader>

      {categories.length > 0 ? (
        <ul className='flex flex-col gap-2.5'>
          {categories.map((category) => (
            <Category key={category.name} category={category} />
          ))}
        </ul>
      ) : (
        <p className='py-6 text-center text-body text-muted-foreground'>{t('noCategories')}</p>
      )}
    </Card>
  )
}

export default TopCategories
