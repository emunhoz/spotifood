import { filterPlaylists, uniqueValues, facetCounts, type Playlist } from './filter-playlists'

const playlists: Playlist[] = [
  { id: '1', name: 'Sunday Brunch', owner: 'Spotifood', genre: 'Jazz', occasion: 'Breakfast', tracks: 40, minutes: 100, pairsWith: 'Eggs Benedict', mood: 'Warm', tracklist: [{ title: 'Song', artist: 'Band' }], cover: ['#000', '#fff'] },
  { id: '2', name: 'Pizza Night', owner: 'Ana', genre: 'Rock', occasion: 'Dinner', tracks: 30, minutes: 100, pairsWith: 'Pizza', mood: 'Warm', tracklist: [{ title: 'Song', artist: 'Band' }], cover: ['#000', '#fff'] },
  { id: '3', name: 'Lunch Beats', owner: 'Spotifood', genre: 'Electronic', occasion: 'Lunch', tracks: 25, minutes: 100, pairsWith: 'Poke', mood: 'Warm', tracklist: [{ title: 'Song', artist: 'Band' }], cover: ['#000', '#fff'] },
  { id: '4', name: 'Jazz Dinner', owner: 'Leo', genre: 'Jazz', occasion: 'Dinner', tracks: 50, minutes: 100, pairsWith: 'Ramen', mood: 'Warm', tracklist: [{ title: 'Song', artist: 'Band' }], cover: ['#000', '#fff'] }
]

const noCriteria = { search: '', genre: '', occasion: '' }
const ids = (items: Playlist[]) => items.map(item => item.id)

describe('filterPlaylists', () => {
  test('returns everything when no criteria is set', () => {
    expect(filterPlaylists(playlists, noCriteria)).toEqual(playlists)
  })

  test('search is case-insensitive and trims whitespace', () => {
    expect(ids(filterPlaylists(playlists, { ...noCriteria, search: '  PIZZA ' }))).toEqual(['2'])
  })

  test('search matches the owner too', () => {
    expect(ids(filterPlaylists(playlists, { ...noCriteria, search: 'leo' }))).toEqual(['4'])
  })

  test('search matches the dish it pairs with', () => {
    expect(ids(filterPlaylists(playlists, { ...noCriteria, search: 'ramen' }))).toEqual(['4'])
  })

  test('combines criteria with AND', () => {
    expect(ids(filterPlaylists(playlists, { search: '', genre: 'Jazz', occasion: 'Dinner' }))).toEqual(['4'])
  })

  test('returns an empty list when nothing matches', () => {
    expect(filterPlaylists(playlists, { ...noCriteria, search: 'metal' })).toEqual([])
  })
})

describe('uniqueValues', () => {
  test('returns sorted distinct values for a field', () => {
    expect(uniqueValues(playlists, 'genre')).toEqual(['Electronic', 'Jazz', 'Rock'])
  })
})

describe('facetCounts', () => {
  test('counts every value when nothing else is selected', () => {
    expect(facetCounts(playlists, noCriteria, 'occasion')).toEqual(new Map([['Breakfast', 1], ['Dinner', 2], ['Lunch', 1]]))
  })

  test('applies the other criteria but ignores its own field', () => {
    const counts = facetCounts(playlists, { search: '', genre: 'Jazz', occasion: 'Dinner' }, 'occasion')
    expect(counts.get('Breakfast')).toBe(1)
    expect(counts.get('Dinner')).toBe(1)
    expect(counts.has('Lunch')).toBe(false)
  })

  test('respects the search term', () => {
    expect(facetCounts(playlists, { ...noCriteria, search: 'pizza' }, 'genre')).toEqual(new Map([['Rock', 1]]))
  })
})
