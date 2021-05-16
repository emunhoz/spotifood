import React from 'react'
import { render, screen, fireEvent } from '../../utils/test-utils'
import { SideModal } from './SideModal'

describe('[Component]: SideModal', () => {
  test('render the component', () => {
    const { asFragment } = render(
      <SideModal show={false} close={() => console.log}>
        <h1>Hello world</h1>
      </SideModal>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('trigger function to logout user', () => {
    const closeModal = jest.fn()

    render(
      <SideModal show close={closeModal}>
        <h1>Hello world</h1>
      </SideModal>
    )

    fireEvent.click(screen.getByText(/fechar/i))

    expect(closeModal).toHaveBeenCalled()
  })
})
