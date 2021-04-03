import React from 'react'
import { render } from '../../utils/test-utils'
import { Loading } from './Loading'

describe('[Component]: Loading', () => {
  test('render the component', () => {
    const { asFragment } = render(<Loading />)
    expect(asFragment()).toMatchSnapshot()
  })
})
