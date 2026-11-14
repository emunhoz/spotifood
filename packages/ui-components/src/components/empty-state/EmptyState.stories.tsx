import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'

const meta = {
  title: 'States/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `EmptyState`' } } }
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { title: 'No items found', message: 'Try searching for another word...' }
}
