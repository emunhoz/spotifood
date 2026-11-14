import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PlaylistCardSkeleton } from './PlaylistCardSkeleton'

const meta = {
  title: 'Components/PlaylistCardSkeleton',
  component: PlaylistCardSkeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Loading placeholder with the same footprint as `PlaylistCard`. Hidden from assistive tech: the grid that renders it sets `aria-busy`.'
      }
    }
  },
  decorators: [(Story) => <div style={{ width: 280 }}><Story /></div>]
} satisfies Meta<typeof PlaylistCardSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
