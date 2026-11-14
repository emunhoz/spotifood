import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './Chip'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Toggle pill for filters. A native `<button>` with `aria-pressed`, so the active state does not rely on color alone. `suggested` adds a dot (with screen-reader text) for the occasion that matches the current time.'
      }
    }
  },
  args: { children: 'Dinner' }
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Active: Story = { args: { active: true } }

export const Suggested: Story = { args: { suggested: true } }

export const ActiveAndSuggested: Story = { args: { active: true, suggested: true } }

export const WithCount: Story = { args: { count: 6 } }

export const EmptyFacet: Story = { args: { children: 'Party', count: 0 } }
