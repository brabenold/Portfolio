import { useCallback, useEffect, useState } from 'react'

const KEY = 'andru-theme'

function systemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function apply(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
}

export function useTheme() {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem(KEY)
    const initial = stored ? stored === 'dark' : systemDark()
    apply(initial)
    return initial
  })

  useEffect(() => {
    if (localStorage.getItem(KEY)) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      apply(e.matches)
      setDark(e.matches)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setDark((d) => {
      const next = !d
      apply(next)
      localStorage.setItem(KEY, next ? 'dark' : 'light')
      return next
    })
  }, [])

  return { dark, toggle }
}
