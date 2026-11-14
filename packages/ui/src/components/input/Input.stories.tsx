import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `Input`' } } }
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { value: 'hello', label: 'Label example' } }
export const Error: Story = { args: { value: 'hello', label: 'Label example', error: true, message: 'This field is required' } }
