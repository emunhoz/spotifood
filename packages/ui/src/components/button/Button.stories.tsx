import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the primary `Button`' } } },
  render: (args) => <Button {...args} />
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { children: 'Primary' } }
export const Negative: Story = { args: { negative: true, children: 'Negative' } }
export const Ghost: Story = { args: { ghost: true, children: 'Text' } }
export const Small: Story = { args: { size: 'small', children: 'Text' } }
export const Default: Story = { args: { children: 'Text' } }
export const Big: Story = { args: { size: 'big', children: 'Text' } }
