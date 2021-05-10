import React from 'react'
import { render } from '../../utils/test-utils'
import { EmptyState } from './EmptyState'

describe('[Component]: EmptyState', () => {
  test('render the component', () => {
    const { asFragment } = render(<EmptyState />)
    expect(asFragment()).toMatchSnapshot()
  })
})