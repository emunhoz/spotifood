import type { Meta, StoryObj } from '@storybook/react'
import { PlaylistCard } from './PlaylistCard'

const meta = {
  title: 'Components/PlaylistCard',
  component: PlaylistCard,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `PlaylistCard`' } } }
} satisfies Meta<typeof PlaylistCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    owner: 'Spotify',
    playlistName: 'Rain Sounds',
    link: 'https://open.spotify.com/playlist/37i9dQZF1DX8ymr6UES7vc',
    imgUrl: 'https://i.scdn.co/image/ab67706f00000003aba1f07094bd3e98cd0122de'
  }
}
