import { createContext, useState, useEffect, useContext } from 'react'
import HTTP_CLIENT from '../services/api'

interface AuthContextData {
  signed: boolean
  setToken: any
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState(false)

  useEffect(() => {
    async function loadStorageData () {
      const storagedToken = await localStorage.getItem('@app:token')

      if (storagedToken) {
        HTTP_CLIENT.defaults.headers.Authorization = `Bearer ${storagedToken}`
        setSigned(true)
      }
    }

    loadStorageData()
  }, [])

  function setToken (token: string) {
    localStorage.setItem('@app:token', token)
    setSigned(true)
  }

  async function signOut () {
    setSigned(false)
    localStorage.removeItem('@app:token')
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ signed, setToken, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth () {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }
