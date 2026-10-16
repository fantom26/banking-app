'use client'

import { useTransition } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from 'cn'
import { hasLocale, useLocale, useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import { Button } from '@/app/_components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/app/_i18n/navigation'
import { type Locale, localeLabels, routing } from '@/app/_i18n/routing'

const LanguageSwitcher = ({ type = 'desktop' }: { type?: 'mobile' | 'desktop' }) => {
  const isMobile = type === 'mobile'
  const t = useTranslations('LanguageSwitcher')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (next: string) => {
    if (!hasLocale(routing.locales, next) || next === locale) return

    const query = searchParams.toString()
    startTransition(() =>
      router.replace(query ? `${pathname}?${query}` : pathname, { locale: next })
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          disabled={isPending}
          aria-label={`${t('label')}: ${localeLabels[locale]}`}
          className={cn('w-full justify-start gap-2 px-2 text-14 font-semibold text-gray-700', {
            'max-xl:justify-center': !isMobile
          })}
        >
          <Icon name='languages' className='size-6 text-gray-500' />
          <span className={cn({ 'max-xl:hidden': !isMobile })}>{localeLabels[locale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='bg-white' align='start'>
        <DropdownMenuRadioGroup value={locale} onValueChange={switchLocale}>
          {routing.locales.map((value) => (
            <DropdownMenuRadioItem key={value} value={value} lang={value}>
              {localeLabels[value]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
