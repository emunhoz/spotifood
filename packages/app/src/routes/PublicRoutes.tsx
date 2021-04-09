import { Suspense, lazy } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Loading } from '@monorepo/ui-components'

const Home = lazy(() => import('../pages/home/Home'))
const Redirect = lazy(() => import('../pages/redirect/Redirect'))

function SignRoutes () {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route
          path='/access_token=:access_token&token_type=:token_type&expires_in=:expires_in'
          component={Redirect}
        />
      </Router>
    </Suspense>
  )
}

export default SignRoutes
