import React from 'react'
import { render } from '../../utils/test-utils'
import { SelectInput } from './SelectInput'

describe('[Component]: SelectInput', () => {
  test('render the component', () => {
    const { asFragment } = render(
    <SelectInput onChange={console.log} label="Select example" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
