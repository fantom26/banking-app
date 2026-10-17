'use client'

import { useState, useTransition } from 'react'

import { useSearchParams } from 'next/navigation'

import { hasLocale, useLocale, useTranslations } from 'next-intl'

import Icon from '@/app/_components/Icon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/app/_components/ui/dropdown-menu'
import { usePathname, useRouter } from '@/app/_i18n/navigation'
import { type Locale, localeLabels, routing } from '@/app/_i18n/routing'
import { signOut } from '@/app/_lib/actions/auth.actions'
import { cn } from '@/app/_lib/cn'
import { getTheme, saveTheme, type Theme, themes } from '@/app/_lib/theme'

const UserMenu = ({ user, className }: { user: User; className?: string }) => {
  const t = useTranslations('UserMenu')
  const tNav = useTranslations('Navigation')
  const tLanguage = useTranslations('LanguageSwitcher')
  const tTheme = useTranslations('Theme')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [theme, setTheme] = useState<Theme>(getTheme)

  const initials = `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()

  const switchLocale = (next: string) => {
    if (!hasLocale(routing.locales, next) || next === locale) return

    const query = searchParams.toString()
    startTransition(() =>
      router.replace(query ? `${pathname}?${query}` : pathname, { locale: next })
    )
  }

  const switchTheme = (next: string) => {
    const value = themes.find((theme) => theme === next)
    if (!value) return

    saveTheme(value)
    setTheme(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={isPending}
        aria-label={t('label', { name: `${user.firstName} ${user.lastName}` })}
        className={cn(
          'grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-accent text-body font-bold text-accent-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30 md:size-11.5',
          className
        )}
      >
        {initials}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-64 p-1.5'>
        <DropdownMenuLabel className='flex flex-col gap-0.5 px-2 py-1.5'>
          <span className='truncate text-sm font-semibold text-foreground'>
            {user.firstName} {user.lastName}
          </span>
          <span className='truncate text-caption font-normal'>{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='px-2 py-1.5'>
            <Icon name='languages' />
            {tLanguage('label')}
            <span className='flex-1 truncate text-right text-muted-foreground'>
              {localeLabels[locale]}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='min-w-40 p-1.5'>
              <DropdownMenuRadioGroup value={locale} onValueChange={switchLocale}>
                {routing.locales.map((value) => (
                  <DropdownMenuRadioItem key={value} value={value} lang={value} className='py-1.5'>
                    {localeLabels[value]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className='px-2 py-1.5'>
            <Icon name='sun-moon' />
            {tTheme('label')}
            <span className='flex-1 truncate text-right text-muted-foreground'>
              {tTheme(theme)}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className='min-w-40 p-1.5'>
              <DropdownMenuRadioGroup value={theme} onValueChange={switchTheme}>
                {themes.map((value) => (
                  <DropdownMenuRadioItem key={value} value={value} className='py-1.5'>
                    {tTheme(value)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='px-2 py-1.5'
          onSelect={() => startTransition(() => signOut(locale))}
        >
          <Icon name='log-out' />
          {tNav('logOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenu
