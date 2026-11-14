import React from 'react'
import { render, screen } from '../../utils/test-utils'
import { ChipGroup } from './ChipGroup'
import { Chip } from '../chip/Chip'

describe('[Component]: ChipGroup', () => {
  test('is a named group of chips', () => {
    render(
      <ChipGroup label='Occasion'>
        <Chip active>All</Chip>
        <Chip>Dinner</Chip>
      </ChipGroup>
    )
    const group = screen.getByRole('group', { name: 'Occasion' })
    expect(group).toContainElement(screen.getByRole('button', { name: 'All' }))
  })

  test('shows the indicator only while a chip is pressed', () => {
    const { container, rerender } = render(
      <ChipGroup label='Genre'>
        <Chip>Jazz</Chip>
      </ChipGroup>
    )
    const indicator = container.querySelector('[aria-hidden="true"]')
    expect(indicator).toHaveAttribute('data-visible', 'false')

    rerender(
      <ChipGroup label='Genre'>
        <Chip active>Jazz</Chip>
      </ChipGroup>
    )
    expect(indicator).toHaveAttribute('data-visible', 'true')
  })
})
