import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { PathName } from 'core'
import Spinner from 'core/components/spinner'

const LazyIncidentsPage = lazy(() => import('../pages/incidentsPage'))
const LazyDetailPage = lazy(() => import('../pages/detailPage'))

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <LazyIncidentsPage />
          </Suspense>
        }
      />
      <Route
        path={PathName.detail}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDetailPage />
          </Suspense>
        }
      />
    </Routes>
  )
}
