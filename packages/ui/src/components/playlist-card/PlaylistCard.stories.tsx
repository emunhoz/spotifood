import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PlaylistCard } from './PlaylistCard'

const gradient = (from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="1" height="1" fill="url(#g)"/></svg>`)}`

const meta = {
  title: 'Components/PlaylistCard',
  component: PlaylistCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Flat card on `surface` (no shadow). Hover and keyboard focus lift it and zoom the cover; `index` staggers the entrance. All motion is skipped under `prefers-reduced-motion`.'
      }
    }
  },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>]
} satisfies Meta<typeof PlaylistCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    owner: 'Spotifood',
    playlistName: 'Ramen at 2AM',
    link: 'https://open.spotify.com/search/Ramen%20at%202AM',
    imgUrl: gradient('#FA709A', '#FEE140'),
    minutes: 182,
    pairsWith: 'Ramen'
  }
}

export const WithoutMetadata: Story = {
  args: { owner: 'Spotifood', playlistName: 'Sunday Brunch', imgUrl: gradient('#F6D365', '#FDA085') }
}
