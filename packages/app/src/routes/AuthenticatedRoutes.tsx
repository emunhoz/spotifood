import { Suspense, lazy } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Loading } from '@monorepo/ui-components'

const Playlist = lazy(() => import('../pages/playlist/Playlist'))

function AuthenticatedRoutes () {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Route exact path='/' component={Playlist} />
      </Router>
    </Suspense>
  )
}

export default AuthenticatedRoutes
