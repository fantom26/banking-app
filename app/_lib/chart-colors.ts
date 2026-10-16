import { useSyncExternalStore } from 'react'

export type ChartColors = {
  series: string[]
  surface: string
  text: string
  muted: string
  border: string
}

let cached: ChartColors | null = null

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

const subscribe = () => () => {}

const getSnapshot = () => (cached ??= getChartColors())

export const useChartColors = () => useSyncExternalStore(subscribe, getSnapshot, () => null)
