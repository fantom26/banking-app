import { useSyncExternalStore } from 'react'

export type ChartColors = {
  series: string[]
  surface: string
  text: string
  muted: string
  border: string
}

let cached: { theme: string | null; colors: ChartColors } | null = null

export function getChartColors(): ChartColors {
  const styles = getComputedStyle(document.documentElement)
  const token = (name: string) => styles.getPropertyValue(name).trim()

  return {
    series: [1, 2, 3, 4, 5].map((slot) => token(`--chart-${slot}`)),
    surface: token('--card'),
    text: token('--foreground'),
    muted: token('--muted-foreground'),
    border: token('--border')
  }
}

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

const getSnapshot = () => {
  const theme = document.documentElement.getAttribute('data-theme')
  if (cached?.theme !== theme) cached = { theme, colors: getChartColors() }
  return cached.colors
}

export const useChartColors = () => useSyncExternalStore(subscribe, getSnapshot, () => null)
