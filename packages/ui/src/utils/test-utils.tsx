import React from 'react'
import createTheme from '@monorepo/design-tokens'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const AllTheProviders = ({ children }: any) => (
  <ThemeProvider theme={createTheme}>
    <MemoryRouter>
      {children}
    </MemoryRouter>
  </ThemeProvider>
)

const customRender = (ui: any, options?: any) => render(ui, { wrapper: AllTheProviders, ...options })

export { screen, fireEvent } from '@testing-library/react'

export { customRender as render }
