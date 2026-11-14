import React from 'react'
import { render, screen, fireEvent } from '../../utils/test-utils'
import { PlaylistDetail } from './PlaylistDetail'

const props = {
  imgUrl: '',
  name: 'Ramen at 2AM',
  owner: 'Spotifood',
  minutes: 182,
  trackCount: 52,
  pairsWith: 'Ramen',
  mood: 'Dreamy',
  tags: ['Lo-fi', 'Late night'],
  tracklist: [{ title: 'Broth at 2AM', artist: 'Neon Noodle' }, { title: 'Soft Egg', artist: 'Midnight Miso' }],
  listenUrl: 'https://open.spotify.com/search/Ramen',
  onClose: jest.fn()
}

describe('[Component]: PlaylistDetail', () => {
  test('render the component', () => {
    const { asFragment } = render(<PlaylistDetail {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('shows the pairing, mood, tracks and how many more there are', () => {
    render(<PlaylistDetail {...props} />)
    expect(screen.getByRole('heading', { name: 'Ramen at 2AM' })).toBeInTheDocument()
    expect(screen.getByText('Ramen')).toBeInTheDocument()
    expect(screen.getByText('Dreamy')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('+ 50 more tracks')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Listen on Spotify' })).toHaveAttribute('href', props.listenUrl)
  })

  test('closes from the close button', () => {
    const onClose = jest.fn()
    render(<PlaylistDetail {...props} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
