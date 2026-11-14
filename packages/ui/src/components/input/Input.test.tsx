import React from 'react'
import createTheme from '@monorepo/design-tokens'
import { render } from '../../utils/test-utils'
import { Input } from './Input'

describe('[Component]: Input', () => {
  test('render component', () => {
    const { asFragment } = render(<Input onChange={console.log} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('render component with error style', () => {
    const { asFragment } = render(<Input error message="Help message" onChange={console.log} />)
    expect(asFragment()).toMatchSnapshot()
  })

  test('resolves the negative token in the error border', () => {
    render(<Input error message="Help message" onChange={console.log} />)
    const css = Array.from(document.querySelectorAll('style')).map((style) => style.textContent).join('\n')
    expect(css).toContain(`2px solid ${createTheme.palette.negative}`)
  })
})
