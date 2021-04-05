import React from 'react'
import { render } from '../../utils/test-utils'
import { SearchBar } from './SearchBar'

describe('[Component]: SearchBar', () => {
  test('render the component', () => {
    const { asFragment } = render(<SearchBar onChange={console.log} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render component with error style', () => {
    const { asFragment } = render(<SearchBar error message="Help message" onChange={console.log} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
