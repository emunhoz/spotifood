import type { PlaylistCriteria } from './filter-playlists'

// URL param ↔ criteria key. Short `q` for search, the rest match the data fields.
const PARAMS = { q: 'search', genre: 'genre', occasion: 'occasion' } as const satisfies Record<string, keyof PlaylistCriteria>

export function readCriteria (search: string): PlaylistCriteria {
  const params = new URLSearchParams(search)
  return {
    search: params.get('q') ?? '',
    genre: params.get('genre') ?? '',
    occasion: params.get('occasion') ?? ''
  }
}

// Keeps params it does not own (e.g. ?playlist=), so the detail view and filters coexist.
export function criteriaToSearch (criteria: PlaylistCriteria, currentSearch: string): string {
  const params = new URLSearchParams(currentSearch)
  for (const [param, key] of Object.entries(PARAMS)) {
    const value = criteria[key]
    if (value === '') params.delete(param)
    else params.set(param, value)
  }
  const query = params.toString()
  return query === '' ? '' : `?${query}`
}
