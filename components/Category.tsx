import { cn } from 'cn'

import { topCategoryStyles } from '@/constants'

import CategoryIcon from './CategoryIcon'
import { Progress } from './ui/progress'

const Category = ({ category }: CategoryProps) => {
  const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator }
  } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
  topCategoryStyles.default

  return (
    <div className={cn('gap-[18px] flex p-4 rounded-xl', bg)}>
      <figure className={cn('flex-center size-10 rounded-full', circleBg)}>
        <CategoryIcon category={category.name} className={cn('size-5', count)} />
      </figure>
      <div className='flex w-full flex-1 flex-col gap-2'>
        <div className='text-14 flex justify-between'>
          <h2 className={cn('font-medium', main)}>{category.name}</h2>
          <h3 className={cn('font-normal', count)}>{category.count}</h3>
        </div>
        <Progress
          value={(category.count / category.totalCount) * 100}
          className={cn('h-2 w-full', progressBg)}
          indicatorClassName={cn('h-2 w-full', indicator)}
        />
      </div>
    </div>
  )
}

export default Category
