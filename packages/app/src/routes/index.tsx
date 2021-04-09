import { useAuth } from '../contexts/auth'

import PublicRoutes from './PublicRoutes'
import AuthenticatedRoutes from './AuthenticatedRoutes'

const Routes = () => {
  const { signed } = useAuth()

  return signed ? <AuthenticatedRoutes /> : <PublicRoutes />
}

export default Routes
