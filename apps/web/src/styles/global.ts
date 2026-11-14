import { createGlobalStyle } from 'styled-components'
import createTheme, { typography } from '@monorepo/design-tokens'

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    margin: 0;
    font-family: ${typography.type.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    background: ${createTheme.palette.lightest};
  }

  /* A modal dialog does not stop the page behind it from scrolling; this does, without JS */
  html:has(dialog[open]) {
    overflow: hidden;
  }

  /* One curve for every view transition: cards glide, the count and active chips morph */
  ::view-transition-group(*) {
    animation-duration: 0.35s;
    animation-timing-function: cubic-bezier(0.2, 0.7, 0.2, 1);
  }
`

export default GlobalStyle
