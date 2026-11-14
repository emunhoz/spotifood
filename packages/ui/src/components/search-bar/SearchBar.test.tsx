import React from 'react'
import createTheme from '@monorepo/design-tokens'
import { render, screen } from '../../utils/test-utils'
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
})
