import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './Label'

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `Label`' } } }
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { value: 'My label example' } }
