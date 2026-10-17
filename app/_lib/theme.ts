export const themes = ['system', 'light', 'dark'] as const

export type Theme = (typeof themes)[number]

const storageKey = 'theme'
const darkQuery = '(prefers-color-scheme: dark)'

export const themeScript = `(function(){var t;try{t=localStorage.getItem("${storageKey}")}catch(e){}var d=t==="dark"||(t!=="light"&&matchMedia("${darkQuery}").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")})()`

export const getTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(storageKey)
    return themes.find((theme) => theme === stored) ?? 'system'
  } catch {
    return 'system'
  }
}

export const applyTheme = (theme: Theme) => {
  const dark = theme === 'dark' || (theme === 'system' && matchMedia(darkQuery).matches)
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(storageKey, theme)
  } catch {}
  applyTheme(theme)
}

export const watchSystemTheme = () => {
  const media = matchMedia(darkQuery)
  const onChange = () => applyTheme(getTheme())
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}
