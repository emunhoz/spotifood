import React from 'react'
import { AuthProvider } from './auth'
import { FilterProvider } from './filter'
import { I18nextProvider, i18n } from '@commons/i18n'

export const Providers: React.FC = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <FilterProvider>{children}</FilterProvider>
      </AuthProvider>
    </I18nextProvider>
  )
}
