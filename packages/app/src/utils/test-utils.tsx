import type { ReactElement, ReactNode } from 'react'
import createTheme from '@monorepo/design-tokens'
import { ThemeProvider } from 'styled-components'
import { render, type RenderOptions } from '@testing-library/react'

const AllTheProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={createTheme}>{children}</ThemeProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions) => render(ui, { wrapper: AllTheProviders, ...options })

export { screen, fireEvent } from '@testing-library/react'

export { customRender as render }
