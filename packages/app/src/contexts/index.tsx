import React from 'react'
import { AuthProvider } from './auth'
import { FilterProvider } from './filter'

export const Providers: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <FilterProvider>{children}</FilterProvider>
    </AuthProvider>
  )
}
