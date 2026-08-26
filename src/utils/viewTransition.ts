import { flushSync } from 'react-dom'

function prefersReducedMotion(): boolean {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

export function withViewTransition(update: () => void): void {
  if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
    update()
    return
  }

  document.startViewTransition(() => {
    flushSync(update)
  })
}
