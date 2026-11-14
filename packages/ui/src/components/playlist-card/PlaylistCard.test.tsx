import React from 'react'
import { render, screen } from '../../utils/test-utils'
import { PlaylistCard, formatDuration } from './PlaylistCard'

describe('[Component]: PlaylistCard', () => {
  test('render the component', () => {
    const { asFragment } = render(
      <PlaylistCard
        owner='Spotifood'
        playlistName='Ramen at 2AM'
        link='https://open.spotify.com/search/Ramen'
        imgUrl='data:image/svg+xml,'
        minutes={182}
        pairsWith='Ramen'
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('shows duration, pairing and an accessible listen link', () => {
    render(<PlaylistCard owner='Ana' playlistName='Sushi Date' imgUrl='' link='https://open.spotify.com' minutes={126} pairsWith='Sushi' />)
    expect(screen.getByText('2 h 6 min')).toBeInTheDocument()
    expect(screen.getByText('Sushi')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Listen to Sushi Date on Spotify' })).toBeInTheDocument()
  })
})

describe('formatDuration', () => {
  test.each([
    [45, '45 min'],
    [60, '1 h'],
    [147, '2 h 27 min']
  ])('%i minutes → %s', (minutes, expected) => {
    expect(formatDuration(minutes)).toBe(expected)
  })
})
