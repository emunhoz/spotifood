import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ChipGroup } from './ChipGroup'
import { Chip } from '../chip/Chip'

const OCCASIONS = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Late night', 'Party']

const meta = {
  title: 'Components/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A row of `Chip`s with one sliding indicator under the pressed chip (segmented-control pattern). Labels never move or change weight; only the indicator travels and resizes. Hidden when nothing is pressed; scrolls horizontally on small screens. No motion under `prefers-reduced-motion`.'
      }
    }
  },
  args: { label: 'Occasion', children: null }
} satisfies Meta<typeof ChipGroup>

export default meta
type Story = StoryObj<typeof meta>

function Interactive ({ allowNone }: { allowNone: boolean }) {
  const [active, setActive] = useState(allowNone ? '' : 'All')
  const toggle = (value: string) => setActive(current => allowNone && current === value ? '' : value)

  return (
    <ChipGroup label='Occasion'>
      {OCCASIONS.map(value => (
        <Chip key={value} active={active === value} count={value.length} onClick={() => toggle(value)}>{value}</Chip>
      ))}
    </ChipGroup>
  )
}

export const SingleChoice: Story = { render: () => <Interactive allowNone={false} /> }

export const ToggleOff: Story = { render: () => <Interactive allowNone /> }
