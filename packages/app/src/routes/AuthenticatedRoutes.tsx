import { Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { Loading } from '@monorepo/ui-components'

const Playlist = lazy(() => import('../pages/playlist/Playlist'))

function AuthenticatedRoutes () {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Redirect exact from='/' to='/playlist' />
        <Route path='/playlist' component={Playlist} />
      </Router>
    </Suspense>
  )
}

export default AuthenticatedRoutes
