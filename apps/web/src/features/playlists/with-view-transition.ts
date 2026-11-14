import { flushSync } from 'react-dom'

// Tags <html> for the duration of a transition, so CSS can style each kind differently
// (e.g. cards must not lift above the dialog while it opens).
// ponytail: data attribute instead of View Transition types, which older Chromium/Safari lack
export type TransitionKind = 'filter' | 'detail'

// Images that just mounted are not decoded yet; the "after" snapshot would capture them blank.
// The transition waits for this promise before snapshotting the new state.
function decodeNewImages (): Promise<unknown> {
  const images = [...document.querySelectorAll<HTMLImageElement>('dialog[open] img')]
  return Promise.all(images.map(image => image.decode().catch(() => undefined)))
}

// flushSync makes React commit inside the callback, so the browser snapshots the new DOM.
export function withViewTransition (update: () => void, kind: TransitionKind = 'filter'): void {
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  const canTransition = typeof document.startViewTransition === 'function' && !prefersReducedMotion
  if (!canTransition) return update()

  const root = document.documentElement
  root.dataset.transition = kind
  const transition = document.startViewTransition(() => {
    flushSync(update)
    return kind === 'detail' ? decodeNewImages() : undefined
  })
  transition.finished.finally(() => {
    if (root.dataset.transition === kind) delete root.dataset.transition
  })
}
