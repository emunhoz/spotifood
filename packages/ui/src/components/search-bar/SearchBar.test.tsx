import React from 'react'
import createTheme from '@monorepo/design-tokens'
import { render, screen, fireEvent } from '../../utils/test-utils'
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

  test('resolves the negative token in the error border', () => {
    render(<SearchBar error onChange={console.log} />)
    const css = Array.from(document.querySelectorAll('style')).map((style) => style.textContent).join('\n')
    expect(css).toContain(`2px solid ${createTheme.palette.negative}`)
  })

  test('names the field through the wrapping label', () => {
    render(<SearchBar labelName='Search playlists' onChange={console.log} />)
    expect(screen.getByRole('textbox', { name: 'Search playlists' })).toBeInTheDocument()
  })

  test('clears with the button and with Escape', () => {
    const onClear = jest.fn()
    render(<SearchBar labelName='Search' value='ramen' onChange={jest.fn()} onClear={onClear} />)

    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    fireEvent.keyDown(screen.getByRole('textbox', { name: 'Search' }), { key: 'Escape' })
    expect(onClear).toHaveBeenCalledTimes(2)
  })

  test('hides the clear button when empty and shows the shortcut hint instead', () => {
    render(<SearchBar labelName='Search' value='' onChange={jest.fn()} onClear={jest.fn()} shortcutHint='/' />)
    expect(screen.queryByRole('button', { name: 'Clear search' })).not.toBeInTheDocument()
    expect(screen.getByText('/')).toBeInTheDocument()
  })
})
