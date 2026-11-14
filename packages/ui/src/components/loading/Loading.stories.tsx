import type { Meta, StoryObj } from '@storybook/react'
import { Loading } from './Loading'

const meta = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `Loading` component.' } } }
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
