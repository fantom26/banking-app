import { useTranslations } from 'next-intl'

import { Progress } from '@/app/_components/ui/progress'
import { useCategoryLabel } from '@/app/[locale]/(root)/_components/CategoryChip'
import CategoryIcon from '@/app/[locale]/(root)/_components/CategoryIcon'

const Category = ({ category }: { category: CategoryCount }) => {
  const t = useTranslations('HomePage')
  const categoryLabel = useCategoryLabel()
  const label = categoryLabel(category.name)

  return (
    <li className='flex items-center gap-3 rounded-lg bg-muted p-2.5'>
      <span className='grid size-9.5 shrink-0 place-items-center rounded-lg border bg-card'>
        <CategoryIcon category={category.name} className='size-4.5' />
      </span>
      <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
        <div className='flex items-baseline justify-between gap-2'>
          <span className='truncate text-sm font-semibold'>{label}</span>
          <span className='shrink-0 text-caption text-muted-foreground tabular-nums'>
            {t('categoryCount', { count: category.count })}
          </span>
        </div>
        <Progress
          aria-label={label}
          value={(category.count / category.totalCount) * 100}
          className='h-1.5 bg-card'
        />
      </div>
    </li>
  )
}

export default Category
