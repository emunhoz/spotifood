import { useEffect } from 'react'
import { Loading } from '@monorepo/ui-components'
import { useAuth } from '../../contexts/auth'
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast'
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
    try {
      setToken(match.params.access_token)
      toast.success('Olá!')
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }, [history, match, setToken])

  return <Loading />
}

export default Redirect
