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

  /*
   * Opening or closing a playlist. Named groups paint above the page snapshot, so:
   * - cards drop their names, or they would float above the dialog and its backdrop;
   * - the page cross-fades only where it differs, which is the backdrop, so it dims and undims for free;
   * - the panel rises as its own group while the cover flies into its slot.
   */
  html[data-transition='detail'] [data-card-slot] {
    view-transition-name: none !important;
  }

  /* The panel snapshot paints its own background where the cover sits; the cover must fly above it */
  ::view-transition-group(playlist-dialog) {
    z-index: 1;
  }

  ::view-transition-group(.cover) {
    z-index: 2;
  }

  ::view-transition-new(playlist-dialog) {
    animation: sf-panel-in 0.36s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }

  ::view-transition-old(playlist-dialog) {
    animation: sf-panel-out 0.2s ease-in both;
  }

  /* Card cover is 1:1, dialog cover 16:10: crop instead of stretching while it morphs */
  ::view-transition-old(.cover),
  ::view-transition-new(.cover) {
    height: 100%;
    overflow: clip;
    object-fit: cover;
  }

  @keyframes sf-panel-in {
    from {
      opacity: 0;
      transform: translateY(28px) scale(0.98);
    }
  }

  @keyframes sf-panel-out {
    to {
      opacity: 0;
      transform: translateY(16px) scale(0.98);
    }
  }
`

export default GlobalStyle
