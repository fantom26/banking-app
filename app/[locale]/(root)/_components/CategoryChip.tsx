import { useTranslations } from 'next-intl'

import { Badge } from '@/app/_components/ui/badge'
import { humanize } from '@/app/_lib/utils'

import CategoryIcon from './CategoryIcon'

export const useCategoryLabel = () => {
  const t = useTranslations('Categories')

  return (category: string) => {
    const key = category as Parameters<typeof t>[0]
    return t.has(key) ? t(key) : humanize(category)
  }
}

const CategoryChip = ({ category }: { category: string }) => {
  const categoryLabel = useCategoryLabel()

  return (
    <Badge variant='secondary'>
      <CategoryIcon category={category} />
      {categoryLabel(category)}
    </Badge>
  )
}

export default CategoryChip
