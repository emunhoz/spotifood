import { createGlobalStyle } from 'styled-components'
import { typography } from '@monorepo/design-tokens'

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    margin: 0;
    font-family: ${typography.type.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    background: #fff;
  }
`

export default GlobalStyle
