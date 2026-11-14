import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SelectInput } from './SelectInput'

const meta = {
  title: 'Components/SelectInput',
  component: SelectInput,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `SelectInput`' } } }
} satisfies Meta<typeof SelectInput>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { label: 'Select example' },
  render: (args) => (
    <SelectInput {...args}>
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </SelectInput>
  )
}
