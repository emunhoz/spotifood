import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import createTheme from '@monorepo/design-tokens'
import { PlaylistDetail } from './PlaylistDetail'

const cover = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#2E3192"/><stop offset="1" stop-color="#1BFFFF"/></linearGradient></defs><rect width="1" height="1" fill="url(#g)"/></svg>')}`

const meta = {
  title: 'Components/PlaylistDetail',
  component: PlaylistDetail,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Presentational body of the playlist dialog. The app renders it inside a native `<dialog>` and names the cover (`coverStyle`) so it flies in from the card with a view transition. Tracks slide in with a stagger, skipped under reduced motion.'
      }
    }
  },
  decorators: [(Story) => <div style={{ width: 480, background: createTheme.palette.lightest, borderRadius: createTheme.attributes.borderRadius.big }}><Story /></div>],
  args: {
    imgUrl: cover,
    name: 'Ramen at 2AM',
    owner: 'Spotifood',
    minutes: 182,
    trackCount: 52,
    pairsWith: 'Ramen',
    mood: 'Dreamy',
    tags: ['Lo-fi', 'Late night'],
    tracklist: [
      { title: 'Broth at 2AM', artist: 'Neon Noodle' },
      { title: 'Steam on the Window', artist: 'Kotatsu' },
      { title: 'Soft Egg', artist: 'Midnight Miso' },
      { title: 'Last Train Home', artist: 'Tonkotsu Tapes' }
    ],
    listenUrl: 'https://open.spotify.com/search/Ramen%20at%202AM',
    onClose: () => undefined
  }
} satisfies Meta<typeof PlaylistDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
