import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { readPlaylistId, withPlaylistId } from './url-state'
import { withViewTransition } from './with-view-transition'

function urlWith (id: string | null): string {
  const { pathname, search, hash } = window.location
  return `${pathname}${withPlaylistId(search, id)}${hash}`
}

export function usePlaylistDetail () {
  const [openId, setOpenId] = useState(() => readPlaylistId(window.location.search))
  // The playlist whose card cover is the shared element. It outlives the dialog, so the cover
  // can fly back to the right card on close.
  const [heroId, setHeroId] = useState(openId)

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener('popstate', () => {
      const id = readPlaylistId(window.location.search)
      if (id) flushSync(() => setHeroId(id))
      withViewTransition(() => setOpenId(id), 'detail')
    }, { signal: controller.signal })
    return () => controller.abort()
  }, [])

  function open (id: string) {
    // pushState: opening a playlist is a navigation, so Back closes it
    window.history.pushState({ playlist: id }, '', urlWith(id))
    // The card must carry the cover's name in the "before" snapshot, so name it first, then transition
    flushSync(() => setHeroId(id))
    withViewTransition(() => setOpenId(id), 'detail')
  }

  function close () {
    // Opened in-app: step back so the history stays clean (popstate closes it with the transition).
    // Arrived from a shared link: there is nothing to go back to, so drop the param in place.
    if (window.history.state?.playlist) return window.history.back()
    window.history.replaceState(null, '', urlWith(null))
    withViewTransition(() => setOpenId(null), 'detail')
  }

  return { openId, heroId, open, close }
}
