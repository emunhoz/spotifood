import { useEffect, useState } from 'react'
import { readPlaylistId, withPlaylistId } from './url-state'
import { withViewTransition } from './with-view-transition'

function urlWith (id: string | null): string {
  const { pathname, search, hash } = window.location
  return `${pathname}${withPlaylistId(search, id)}${hash}`
}

export function usePlaylistDetail () {
  const [openId, setOpenId] = useState(() => readPlaylistId(window.location.search))

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener('popstate', () => {
      withViewTransition(() => setOpenId(readPlaylistId(window.location.search)))
    }, { signal: controller.signal })
    return () => controller.abort()
  }, [])

  function open (id: string) {
    // pushState: opening a playlist is a navigation, so Back closes it
    window.history.pushState({ playlist: id }, '', urlWith(id))
    withViewTransition(() => setOpenId(id))
  }

  function close () {
    // Opened in-app: step back so the history stays clean (popstate closes it with the transition).
    // Arrived from a shared link: there is nothing to go back to, so drop the param in place.
    if (window.history.state?.playlist) return window.history.back()
    window.history.replaceState(null, '', urlWith(null))
    withViewTransition(() => setOpenId(null))
  }

  return { openId, open, close }
}
