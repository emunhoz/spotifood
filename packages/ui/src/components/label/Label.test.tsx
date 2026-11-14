import React from 'react'
import { render } from '../../utils/test-utils'
import { Label } from './Label'

describe('[Component]: Label', () => {
  test('render the component', () => {
    const { asFragment } = render(<Label />)
    expect(asFragment()).toMatchSnapshot()
  })
})
