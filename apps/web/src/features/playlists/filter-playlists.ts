export interface Track {
  title: string
  artist: string
}

export interface Playlist {
  id: string
  name: string
  owner: string
  genre: string
  occasion: string
  tracks: number
  minutes: number
  pairsWith: string
  mood: string
  tracklist: Track[]
  cover: [string, string]
}

export interface PlaylistCriteria {
  search: string
  genre: string
  occasion: string
}

type FacetField = 'genre' | 'occasion'

// O(n) single pass; an empty criterion means "any"
export function filterPlaylists (playlists: Playlist[], { search, genre, occasion }: PlaylistCriteria): Playlist[] {
  const term = search.trim().toLowerCase()

  return playlists.filter(playlist => {
    const matchesSearch = term === '' ||
      [playlist.name, playlist.owner, playlist.pairsWith].some(field => field.toLowerCase().includes(term))
    const matchesGenre = genre === '' || playlist.genre === genre
    const matchesOccasion = occasion === '' || playlist.occasion === occasion

    return matchesSearch && matchesGenre && matchesOccasion
  })
}

export function uniqueValues (playlists: Playlist[], field: FacetField): string[] {
  return [...new Set(playlists.map(playlist => playlist[field]))].toSorted()
}

// O(n): filter by every criterion except `field`, then count. That is what each chip would show if picked.
export function facetCounts (playlists: Playlist[], criteria: PlaylistCriteria, field: FacetField): Map<string, number> {
  const others = filterPlaylists(playlists, { ...criteria, [field]: '' })
  const counts = new Map<string, number>()
  for (const playlist of others) counts.set(playlist[field], (counts.get(playlist[field]) ?? 0) + 1)
  return counts
}
