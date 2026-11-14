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

  /* Live groups skip the snapshot cross-fade: only the new state shows, so CSS transitions inside
     them (the chip indicator slide) play instead of fading against a frozen copy */
  ::view-transition-old(.live) {
    display: none;
  }

  ::view-transition-new(.live) {
    animation: none;
  }

  /*
   * Opening or closing a playlist. Named groups paint above the page snapshot, so:
   * - filter-only names (cards, count, active chips) are dropped, or they would stay sharp above the backdrop;
   * - the page cross-fades only where it differs, which is the backdrop, so it dims and undims for free;
   * - container transform: the hero card's surface grows into the panel while the cover flies above it.
   */
  html[data-transition='detail'] [data-vt-filter] {
    view-transition-name: none !important;
  }

  /* The panel snapshot paints its own background where the cover sits; the cover must fly above it */
  /* A solid, rounded surface for the whole morph, so nothing shows through while the contents swap */
  ::view-transition-group(playlist-dialog) {
    z-index: 1;
    overflow: clip;
    background: ${createTheme.palette.lightest};
    border-radius: ${createTheme.attributes.borderRadius.big}px;
  }

  ::view-transition-group(.cover) {
    z-index: 2;
  }

  /* Card and panel have different shapes: keep both contents at their real size, anchored to the top,
     so the growing box reveals the panel instead of stretching the card. Swap quickly (old out early,
     new in late) so the two layouts never read on top of each other. */
  ::view-transition-old(playlist-dialog),
  ::view-transition-new(playlist-dialog) {
    height: 100%;
    overflow: clip;
    object-fit: none;
    object-position: top center;
    mix-blend-mode: normal;
  }

  ::view-transition-old(playlist-dialog) {
    animation: sf-fade-out 0.1s ease-out both;
  }

  ::view-transition-new(playlist-dialog) {
    animation: sf-fade-in 0.25s ease-in 0.08s both;
  }

  /* Card cover is 1:1, dialog cover 16:10: crop instead of stretching while it morphs */
  ::view-transition-old(.cover),
  ::view-transition-new(.cover) {
    height: 100%;
    overflow: clip;
    object-fit: cover;
  }

  @keyframes sf-fade-in {
    from {
      opacity: 0;
    }
  }

  @keyframes sf-fade-out {
    to {
      opacity: 0;
    }
  }
`

export default GlobalStyle
