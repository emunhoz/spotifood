import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { EmptyState } from './EmptyState'
import { Button } from '../button/Button'

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

export const WithAction: Story = {
  args: {
    title: 'No playlists found',
    message: 'Try another word or remove a filter.',
    action: <Button size='small' ghost>Clear filters</Button>
  }
}
