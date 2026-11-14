import { useEffect, useState } from 'react'
import type { Playlist } from './filter-playlists'

const PLAYLISTS_URL = '/data/playlists.json'

export type PlaylistsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready', playlists: Playlist[] }

// ponytail: static JSON behind a real fetch, so loading/error states stay honest. Swap the URL for an API when one exists.
export function usePlaylists (): PlaylistsState {
  const [state, setState] = useState<PlaylistsState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(PLAYLISTS_URL, { signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json() as Promise<Playlist[]>
      })
      .then(playlists => setState({ status: 'ready', playlists }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error' })
      })

    return () => controller.abort()
  }, [])

  return state
}
