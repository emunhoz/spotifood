import { vi } from 'vitest'
import { render, screen, fireEvent } from '../../utils/test-utils'
import { FilterProvider } from './filter-context'
import type { Playlist as PlaylistItem } from './filter-playlists'
import Playlist from './Playlist'

const playlists: PlaylistItem[] = [
  { id: '1', name: 'Sunday Brunch', owner: 'Spotifood', genre: 'Jazz', occasion: 'Breakfast', tracks: 40, minutes: 140, pairsWith: 'Eggs Benedict', cover: ['#000', '#fff'] },
  { id: '2', name: 'Pizza Night', owner: 'Ana', genre: 'Rock', occasion: 'Dinner', tracks: 30, minutes: 105, pairsWith: 'Pizza', cover: ['#000', '#fff'] }
]

function mockFetch (response: Partial<Response>) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
}

function renderPage () {
  return render(<FilterProvider><Playlist /></FilterProvider>)
}

afterEach(() => vi.unstubAllGlobals())

describe('[Page]: Playlist', () => {
  test('renders a card per playlist', async () => {
    mockFetch({ ok: true, json: async () => playlists })
    renderPage()

    expect(await screen.findByText('Sunday Brunch')).toBeInTheDocument()
    expect(screen.getByText('Pizza Night')).toBeInTheDocument()
  })

  test('search narrows the list and shows an empty state when nothing matches', async () => {
    mockFetch({ ok: true, json: async () => playlists })
    renderPage()
    const searchInput = await screen.findByPlaceholderText(/search playlists/i)

    fireEvent.change(searchInput, { target: { value: 'pizza' } })
    expect(screen.queryByText('Sunday Brunch')).not.toBeInTheDocument()
    expect(screen.getByText('Pizza Night')).toBeInTheDocument()

    fireEvent.change(searchInput, { target: { value: 'metal' } })
    expect(screen.getByText(/no playlists found/i)).toBeInTheDocument()
  })

  test('shows an error state when the request fails', async () => {
    mockFetch({ ok: false, status: 500 })
    renderPage()

    expect(await screen.findByText(/could not load playlists/i)).toBeInTheDocument()
  })
})
