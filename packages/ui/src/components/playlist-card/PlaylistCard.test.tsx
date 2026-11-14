import React from 'react'
import { render } from '../../utils/test-utils'
import { PlaylistCard } from './PlaylistCard'

describe('[Component]: PlaylistCard', () => {
  test('render the component', () => {
    const { asFragment } = render(
      <PlaylistCard
        owner='Spotify'
        playlistName='Rain Sounds'
        link='https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc'
        imgUrl='https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
      />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
