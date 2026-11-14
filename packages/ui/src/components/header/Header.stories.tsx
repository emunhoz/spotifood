import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `Header`' } } }
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    signOut: () => console.log('sair'),
    user: {
      display_name: 'Eder',
      images: [{ url: 'https://i.scdn.co/image/ab6775700000ee85ffd83d8fd3711add44d62317' }]
    }
  }
}
