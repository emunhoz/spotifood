import React from 'react'
import { render } from '../../utils/test-utils'
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
})
