import { Route, Routes } from 'react-router-dom'
import { PathName } from 'core'
import { Suspense, lazy } from 'react'
import Spinner from 'core/components/spinner'

const LazyLogin = lazy(() => import('../pages/login'))
const LazyRecoverAccount = lazy(() => import('../pages/recoverAccount'))
const LazyRestorePassword = lazy(() => import('../pages/codeVerification'))
export const RoutesProvider = () => {
  return (
    <Routes>
      <Route
        path={PathName.Login}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyLogin />
          </Suspense>
        }
      />
      <Route
        path={PathName.RecoverAccount}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyRecoverAccount />
          </Suspense>
        }
      />
      <Route
        path={PathName.RestorePassword}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyRestorePassword />
          </Suspense>
        }
      />
    </Routes>
  )
}
