import type { Meta, StoryObj } from '@storybook/react'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `SearchBar`' } } }
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { placeholder: 'Nome da playlist...' } }
