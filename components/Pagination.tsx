'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { formUrlQuery } from '@/lib/utils'

import Icon from './Icon'

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()!

  const handleNavigation = (type: 'prev' | 'next') => {
    const pageNumber = type === 'prev' ? page - 1 : page + 1

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'page',
      value: pageNumber.toString()
    })

    router.push(newUrl, { scroll: false })
  }

  return (
    <div className='flex justify-between gap-3'>
      <Button
        size='lg'
        variant='ghost'
        className='p-0 hover:bg-transparent'
        onClick={() => handleNavigation('prev')}
        disabled={Number(page) <= 1}
      >
        <Icon name='arrow-left' className='mr-2 size-5 text-gray-600' />
        Prev
      </Button>
      <p className='text-14 flex items-center px-2'>
        {page} / {totalPages}
      </p>
      <Button
        size='lg'
        variant='ghost'
        className='p-0 hover:bg-transparent'
        onClick={() => handleNavigation('next')}
        disabled={Number(page) >= totalPages}
      >
        Next
        <Icon name='arrow-right' className='ml-2 size-5 text-gray-600' />
      </Button>
    </div>
  )
}
