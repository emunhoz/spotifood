import React from 'react'
import { render, fireEvent, screen } from '../../utils/test-utils'
import { Button } from './Button'

describe('[Component]: Button', () => {
  const mockOnClickFunction = jest.fn()

  test('render the component', () => {
    const { asFragment } = render(<Button>Hello world</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render the component', () => {
    const { asFragment } = render(<Button ghost>Hello world</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render the component', () => {
    const { asFragment } = render(<Button negative>Hello world</Button>)
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger function when button is pressed', () => {
    render(<Button onClick={mockOnClickFunction}>Hello world</Button>)

    fireEvent.click(screen.getByText('Hello world'))

    expect(mockOnClickFunction).toHaveBeenCalled()
  })
})
