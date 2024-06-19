import { PathName, getPath } from 'core'
import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Spinner from 'core/components/spinner'
import { DataStructureProvider } from '../provider'

const LazyCompanyStructureMenu = lazy(() => import('../pages/companyStructureMenu'))
const LazyDinamicModelsModule = lazy(() => import('../modules/dinamicModels'))
const LazyOperatingModule = lazy(() => import('../modules/structure'))
const LazyRelationshipConfiguration = lazy(() => import('../pages/relationshipConfiguration'))

export const RouteProvider = () => {
  return (
    <DataStructureProvider>
      <Routes>
        <Route
          path={'/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyCompanyStructureMenu />
            </Suspense>
          }
        />
        <Route
          path={PathName.operationStructure + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyOperatingModule />
            </Suspense>
          }
        />
        <Route
          path={PathName.organizacionalStructure + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyOperatingModule />
            </Suspense>
          }
        />
        <Route
          path={PathName.costCenter + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyDinamicModelsModule />
            </Suspense>
          }
        />
        <Route
          path={PathName.cashBenefits + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyDinamicModelsModule />
            </Suspense>
          }
        />
        <Route
          path={PathName.stores + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyDinamicModelsModule />
            </Suspense>
          }
        />
        <Route
          path={PathName.positions + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyDinamicModelsModule />
            </Suspense>
          }
        />
        <Route
          path={PathName.jobTitles + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyDinamicModelsModule />
            </Suspense>
          }
        />
        <Route
          path={PathName.taxesCategories + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyDinamicModelsModule />
            </Suspense>
          }
        />
        <Route
          path={getPath(PathName.dataStructureRelationshipConfiguration) + '/*'}
          element={
            <Suspense fallback={<Spinner />}>
              <LazyRelationshipConfiguration />
            </Suspense>
          }
        />
      </Routes>
    </DataStructureProvider>
  )
}
