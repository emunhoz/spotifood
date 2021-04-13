import { useEffect } from 'react'
import { Loading } from '@monorepo/ui-components'
import { useAuth } from '../../contexts/auth'
import { useHistory } from 'react-router-dom'
import { getUser } from '../../services/spotify'
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
    setTimeout(async () => {
      try {
        setToken(match.params.access_token)
        const { data } = await getUser()
        toast.success(`Olá! ${data?.display_name}`, { icon: '🙌' })
        history.push('/')
      } catch (error) {
        console.error(error)
      }
    }, 1000)
  }, [history, match, setToken])

  return <Loading />
}

export default Redirect
