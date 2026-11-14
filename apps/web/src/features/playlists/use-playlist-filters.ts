import { useEffect, useRef, useState } from 'react'
import type { PlaylistCriteria } from './filter-playlists'
import { readCriteria, criteriaToSearch } from './url-state'
import { useDebouncedValue } from './use-debounced-value'
import { withViewTransition } from './with-view-transition'

const SEARCH_DEBOUNCE_MS = 200
const ANY = ''

function writeUrl (criteria: PlaylistCriteria): void {
  const { pathname, search, hash } = window.location
  const next = criteriaToSearch(criteria, search)
  if (next === search) return
  // replaceState: filtering should not fill the Back history, only the detail view pushes
  window.history.replaceState(window.history.state, '', `${pathname}${next}${hash}`)
}

export function usePlaylistFilters () {
  const [initial] = useState(() => readCriteria(window.location.search))
  const [query, setQuery] = useState(initial.search)
  const [search, setSearch] = useState(initial.search)
  const [genre, setGenre] = useState(initial.genre)
  const [occasion, setOccasion] = useState(initial.occasion)
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS)
  const appliedSearch = useRef(search)
  appliedSearch.current = search

  // Depends on the debounced value only: also depending on `search` would re-apply a stale
  // query right after "clear", before the debounce catches up. The ref skips no-op transitions.
  useEffect(() => {
    if (debouncedQuery === appliedSearch.current) return
    withViewTransition(() => setSearch(debouncedQuery))
  }, [debouncedQuery])

  useEffect(() => writeUrl({ search, genre, occasion }), [search, genre, occasion])

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener('popstate', () => {
      const criteria = readCriteria(window.location.search)
      setQuery(criteria.search)
      setSearch(criteria.search)
      setGenre(criteria.genre)
      setOccasion(criteria.occasion)
    }, { signal: controller.signal })
    return () => controller.abort()
  }, [])

  const toggle = (setter: (update: (current: string) => string) => void) => (value: string) =>
    withViewTransition(() => setter(current => current === value ? ANY : value))

  return {
    query,
    setQuery,
    criteria: { search, genre, occasion },
    toggleGenre: toggle(setGenre),
    toggleOccasion: toggle(setOccasion),
    showAllOccasions: () => withViewTransition(() => setOccasion(ANY)),
    clearSearch: () => withViewTransition(() => {
      setQuery('')
      setSearch('')
    }),
    clearAll: () => withViewTransition(() => {
      setQuery('')
      setSearch('')
      setGenre(ANY)
      setOccasion(ANY)
    })
  }
}
