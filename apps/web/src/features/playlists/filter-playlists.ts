export interface Playlist {
  id: string
  name: string
  owner: string
  genre: string
  occasion: string
  tracks: number
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
      playlist.name.toLowerCase().includes(term) ||
      playlist.owner.toLowerCase().includes(term)
    const matchesGenre = genre === '' || playlist.genre === genre
    const matchesOccasion = occasion === '' || playlist.occasion === occasion

    return matchesSearch && matchesGenre && matchesOccasion
  })
}

export function uniqueValues (playlists: Playlist[], field: FacetField): string[] {
  return [...new Set(playlists.map(playlist => playlist[field]))].toSorted()
}
