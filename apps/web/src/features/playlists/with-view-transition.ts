import { flushSync } from 'react-dom'

// flushSync makes React commit inside the callback, so the browser snapshots the new DOM.
export function withViewTransition (update: () => void): void {
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  const canTransition = typeof document.startViewTransition === 'function' && !prefersReducedMotion
  if (!canTransition) return update()
  document.startViewTransition(() => flushSync(update))
}
