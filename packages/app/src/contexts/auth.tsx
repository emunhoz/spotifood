import { createContext, useState, useEffect, useContext } from 'react'
import { Header } from '@monorepo/ui-components'
import toast from 'react-hot-toast'
import HTTP_CLIENT from '../services/api'
import { useFetch } from '../hooks/use-fetch'
import styled from 'styled-components'

export const Main = styled.main`
  display: grid;
  max-width: 1280px;
  padding: 26px;
  margin: 0 auto;
`

interface AuthContextData {
  signed: boolean
  setToken(token: string): void
  signOut(): void
  user?: {
    // eslint-disable-next-line camelcase
    display_name: string
    images: [
      {
        url: string
      }
    ]
  }
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState(false)
  const { data: user } = useFetch(signed ? '/me' : '')

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
    toast('Até mais!', { icon: '👋' })
  }

  return (
    <AuthContext.Provider value={{ signed, setToken, signOut, user }}>
      <Main>
        <Header user={user} signOut={() => signOut()} />
        {children}
      </Main>
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
