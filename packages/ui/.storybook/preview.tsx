import React from 'react'
import { ThemeProvider } from 'styled-components'
import type { Preview } from '@storybook/react'
import createTheme from '@monorepo/design-tokens'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={createTheme}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Story />
        </div>
      </ThemeProvider>
    )
  ]
}

export default preview
