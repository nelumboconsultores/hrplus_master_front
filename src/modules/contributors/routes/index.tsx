import { Route, Routes } from 'react-router-dom'
import { PathName, getPath } from 'core'
import { Suspense, lazy } from 'react'
import Spinner from 'core/components/spinner'

const NewCollaborators = lazy(() => import('../../contributors/pages/newCollaborators'))
const TableCollaborators = lazy(() => import('../../contributors/pages/tableCollaborators'))
const DetailsView = lazy(() => import('../../contributors/pages/detailsView'))

export const RouteProvides = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <Suspense fallback={<Spinner />}>
            <TableCollaborators />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.contributorsCreate)}
        element={
          <Suspense fallback={<Spinner />}>
            <NewCollaborators />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.contributorsEdit) + '/:id'}
        element={
          <Suspense fallback={<Spinner />}>
            <NewCollaborators />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.contributorsListDetail) + '/:id'}
        element={
          <Suspense fallback={<Spinner />}>
            <DetailsView />
          </Suspense>
        }
      />
    </Routes>
  )
}
