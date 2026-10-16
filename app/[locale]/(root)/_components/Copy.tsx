'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import { Button } from '@/app/_components/ui/button'
import { cn } from '@/app/_lib/cn'

const Copy = ({ value, label }: { value: string; label: string }) => {
  const t = useTranslations('Copy')
  const [hasCopied, setHasCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setHasCopied(true)

    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }

  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-caption text-muted-foreground'>{label}</span>
      <Button
        variant='outline'
        onClick={copyToClipboard}
        aria-label={t('copy', { label })}
        className='w-full justify-between gap-3 font-medium'
      >
        <span className='truncate tabular-nums'>{value}</span>
        <Icon
          name={hasCopied ? 'check' : 'copy'}
          className={cn('text-muted-foreground', { 'text-success': hasCopied })}
        />
      </Button>
      <span aria-live='polite' className='sr-only'>
        {hasCopied ? t('copied') : ''}
      </span>
    </div>
  )
}

export default Copy
