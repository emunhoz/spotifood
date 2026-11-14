import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SideModal } from './SideModal'

const meta = {
  title: 'Components/SideModal',
  component: SideModal,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'This is the `SideModal`' } } }
} satisfies Meta<typeof SideModal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { show: false, close: () => undefined },
  render: function Render (args) {
    const [toggle, setToggle] = useState(false)
    return (
      <>
        <button onClick={() => setToggle(!toggle)}>Open modal</button>
        <SideModal {...args} show={toggle} close={() => setToggle(false)}>
          <h1>Hello world</h1>
        </SideModal>
      </>
    )
  }
}
