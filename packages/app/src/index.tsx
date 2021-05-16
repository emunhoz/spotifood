import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/global'
import Routes from './routes'
import createTheme from '@monorepo/design-tokens'
import { Providers } from './contexts'
import { Toaster } from 'react-hot-toast'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme}>
      <GlobalStyle />
      <Toaster />
      <Providers>
        <Routes />
      </Providers>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
