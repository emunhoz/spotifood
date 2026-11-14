import { filterPlaylists, uniqueValues, type Playlist } from './filter-playlists'

const playlists: Playlist[] = [
  { id: '1', name: 'Sunday Brunch', owner: 'Spotifood', genre: 'Jazz', occasion: 'Breakfast', tracks: 40, cover: ['#000', '#fff'] },
  { id: '2', name: 'Pizza Night', owner: 'Ana', genre: 'Rock', occasion: 'Dinner', tracks: 30, cover: ['#000', '#fff'] },
  { id: '3', name: 'Lunch Beats', owner: 'Spotifood', genre: 'Electronic', occasion: 'Lunch', tracks: 25, cover: ['#000', '#fff'] },
  { id: '4', name: 'Jazz Dinner', owner: 'Leo', genre: 'Jazz', occasion: 'Dinner', tracks: 50, cover: ['#000', '#fff'] }
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
