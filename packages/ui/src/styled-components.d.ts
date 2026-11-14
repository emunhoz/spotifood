import type { Theme } from '@monorepo/design-tokens'

// Makes theme.palette/typography/attributes/breakpoints type-checked inside
// styled-components interpolations, so a renamed or missing token fails the build.
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
