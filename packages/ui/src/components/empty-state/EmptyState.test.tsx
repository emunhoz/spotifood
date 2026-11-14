import React from 'react'
import { render, screen } from '../../utils/test-utils'
import { EmptyState } from './EmptyState'

describe('[Component]: EmptyState', () => {
  test('render the component', () => {
    const { asFragment } = render(<EmptyState />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders an optional action', () => {
    render(<EmptyState title='No playlists found' action={<button type='button'>Clear filters</button>} />)
    expect(screen.getByRole('button', { name: 'Clear filters' })).toBeInTheDocument()
  })
})
