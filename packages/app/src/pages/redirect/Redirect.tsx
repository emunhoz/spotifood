import { useEffect } from 'react'
import { Loading } from '@monorepo/ui-components'
import { useAuth } from '../../contexts/auth'
import { useHistory } from 'react-router-dom'

interface MatchParams {
  match: {
    params: {
      access_token: string
    }
  }
}

function Redirect ({ match }: MatchParams) {
  const { setToken } = useAuth()
  let history = useHistory()

  useEffect(() => {
    setTimeout(() => {
      try {
        setToken(match.params.access_token)
        history.push('/playlist')
      } catch (error) {
        console.error(error)
      }
    }, 1000)
  }, [history, match, setToken])

  return <Loading />
}

export default Redirect
