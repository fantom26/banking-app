'use client'

import { useLayoutEffect } from 'react'

import { applyTheme, getTheme, themeScript, watchSystemTheme } from '@/app/_lib/theme'

const ThemeScript = () => {
  useLayoutEffect(() => {
    applyTheme(getTheme())
    return watchSystemTheme()
  }, [])

  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  )
}

export default ThemeScript
