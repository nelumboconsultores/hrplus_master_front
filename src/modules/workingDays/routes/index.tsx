import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { PathName } from 'core/enum'
import Spinner from 'core/components/spinner'

const LazyListWorking = lazy(() => import('../pages/listWorking'))
const LazyNewSchedule = lazy(() => import('../pages/newSchedule'))
const LazyEditWorking = lazy(() => import('../pages/editWorking'))

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spinner />}>
            <LazyListWorking />
          </Suspense>
        }
      />
      <Route
        path={PathName.NewSchedule}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyNewSchedule />
          </Suspense>
        }
      />
      <Route
        path={PathName.EditSchedule + '/:id'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyEditWorking />
          </Suspense>
        }
      />
    </Routes>
  )
}
