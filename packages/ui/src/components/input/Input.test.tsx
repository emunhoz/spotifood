import React from 'react'
import { render } from '../../utils/test-utils'
import { Input } from './Input'

describe('[Component]: Input', () => {
  test('render component', () => {
    const { asFragment } = render(<Input onChange={console.log} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render component with error style', () => {
    const { asFragment } = render(<Input error message="Help message" onChange={console.log} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
