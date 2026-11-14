import React from 'react'
import { render, screen, fireEvent } from '../../utils/test-utils'
import { Chip } from './Chip'

describe('[Component]: Chip', () => {
  test('exposes the active state with aria-pressed', () => {
    render(<Chip active>Dinner</Chip>)
    expect(screen.getByRole('button', { name: 'Dinner' })).toHaveAttribute('aria-pressed', 'true')
  })

  test('is not pressed by default and reports clicks', () => {
    const onClick = jest.fn()
    render(<Chip onClick={onClick}>Lunch</Chip>)
    const chip = screen.getByRole('button', { name: 'Lunch' })
    fireEvent.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  test('announces the time suggestion to screen readers', () => {
    render(<Chip suggested>Dinner</Chip>)
    expect(screen.getByRole('button', { name: 'Dinner (suggested for now)' })).toBeInTheDocument()
  })

  test('shows the count and disables a chip that would return nothing', () => {
    render(<Chip count={0}>Party</Chip>)
    expect(screen.getByRole('button', { name: 'Party 0' })).toBeDisabled()
  })

  test('keeps an active chip enabled at zero so it can be unset', () => {
    render(<Chip active count={0}>Party</Chip>)
    expect(screen.getByRole('button', { name: 'Party 0' })).toBeEnabled()
  })
})
