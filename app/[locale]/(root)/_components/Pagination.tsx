'use client'

import { useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import { Link, usePathname } from '@/app/_i18n/navigation'
import { cn } from '@/app/_lib/cn'

const pageItems = (page: number, totalPages: number) => {
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b)

  return pages.flatMap((value, index) =>
    index > 0 && value - pages[index - 1] > 1 ? (['gap', value] as const) : [value]
  )
}

const itemClassName =
  'grid h-9 min-w-9 place-items-center rounded-lg border px-2.5 text-sm font-semibold tabular-nums transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/30'

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = useTranslations('Pagination')

  const hrefFor = (target: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(target))
    return `${pathname}?${params}`
  }

  const step = (target: number, label: string, icon: 'chevron-left' | 'chevron-right') =>
    target < 1 || target > totalPages ? (
      <span aria-disabled className={cn(itemClassName, 'bg-card text-muted-foreground opacity-50')}>
        <Icon name={icon} className='size-4' />
        <span className='sr-only'>{label}</span>
      </span>
    ) : (
      <Link
        href={hrefFor(target)}
        scroll={false}
        className={cn(itemClassName, 'bg-card hover:bg-muted')}
      >
        <Icon name={icon} className='size-4' />
        <span className='sr-only'>{label}</span>
      </Link>
    )

  return (
    <nav aria-label={t('label')} className='flex items-center gap-1.5'>
      {step(page - 1, t('previous'), 'chevron-left')}
      {pageItems(page, totalPages).map((item, index) =>
        item === 'gap' ? (
          <span key={`gap-${index}`} aria-hidden className='px-1 text-muted-foreground'>
            …
          </span>
        ) : (
          <Link
            key={item}
            href={hrefFor(item)}
            scroll={false}
            aria-label={t('page', { page: item })}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              itemClassName,
              item === page
                ? 'border-primary bg-primary text-primary-foreground'
                : 'bg-card hover:bg-muted'
            )}
          >
            {item}
          </Link>
        )
      )}
      {step(page + 1, t('next'), 'chevron-right')}
    </nav>
  )
}
