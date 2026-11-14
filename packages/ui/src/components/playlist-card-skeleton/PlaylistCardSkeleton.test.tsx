import React from 'react'
import { render } from '../../utils/test-utils'
import { PlaylistCardSkeleton } from './PlaylistCardSkeleton'

describe('[Component]: PlaylistCardSkeleton', () => {
  test('render the component hidden from assistive tech', () => {
    const { asFragment, container } = render(<PlaylistCardSkeleton />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(asFragment()).toMatchSnapshot()
  })
})
