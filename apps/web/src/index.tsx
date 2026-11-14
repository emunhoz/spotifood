import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import createTheme from '@monorepo/design-tokens'
import GlobalStyle from './styles/global'
import App from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={createTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
)
