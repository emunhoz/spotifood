import { vi } from 'vitest'
import { render, screen, fireEvent } from '../../utils/test-utils'
import type { Playlist as PlaylistItem } from './filter-playlists'
import Playlist from './Playlist'

const playlists: PlaylistItem[] = [
  { id: '1', name: 'Sunday Brunch', owner: 'Spotifood', genre: 'Jazz', occasion: 'Breakfast', tracks: 40, minutes: 140, pairsWith: 'Eggs Benedict', cover: ['#000', '#fff'] },
  { id: '2', name: 'Pizza Night', owner: 'Ana', genre: 'Rock', occasion: 'Dinner', tracks: 30, minutes: 105, pairsWith: 'Pizza', cover: ['#000', '#fff'] }
]

function mockFetch (response: Partial<Response>) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
}

function renderLoadedPage () {
  mockFetch({ ok: true, json: async () => playlists })
  render(<Playlist />)
  return screen.findByText('Sunday Brunch')
}

afterEach(() => vi.unstubAllGlobals())

describe('[Page]: Playlist', () => {
  test('shows skeletons while loading, then a card per playlist with the count', async () => {
    mockFetch({ ok: true, json: async () => playlists })
    render(<Playlist />)
    expect(screen.getByText('Finding playlists…')).toBeInTheDocument()

    expect(await screen.findByText('Sunday Brunch')).toBeInTheDocument()
    expect(screen.getByText('Pizza Night')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '2 playlists' })).toBeInTheDocument()
  })

  test('an occasion chip filters the list and updates the count', async () => {
    await renderLoadedPage()

    fireEvent.click(screen.getByRole('button', { name: /^Dinner/ }))

    expect(screen.getByRole('button', { name: /^Dinner/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.queryByText('Sunday Brunch')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '1 playlist for dinner' })).toBeInTheDocument()
  })

  test('search matches dishes and the empty state clears every filter', async () => {
    await renderLoadedPage()
    const searchInput = screen.getByPlaceholderText(/search playlists/i)

    fireEvent.change(searchInput, { target: { value: 'eggs' } })
    expect(screen.getByText('Sunday Brunch')).toBeInTheDocument()
    expect(screen.queryByText('Pizza Night')).not.toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'metal' } })
    expect(screen.getByText(/no playlists found/i)).toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'Clear filters' })[0])
    expect(screen.getByText('Pizza Night')).toBeInTheDocument()
    expect(searchInput).toHaveValue('')
  })

  test('shows an error state when the request fails', async () => {
    mockFetch({ ok: false, status: 500 })
    render(<Playlist />)

    expect(await screen.findByText(/could not load playlists/i)).toBeInTheDocument()
  })
})
