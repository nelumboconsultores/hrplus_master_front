import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { CompanyStructureMenu } from '../pages/menu'
import { PathName } from 'core'
import Spinner from 'core/components/spinner'

const LazyStructureModule = lazy(() => import('modules/manageOrganization/modules/structure'))
const LazyDynamicModelsModule = lazy(
  () => import('modules/manageOrganization/modules/dinamicModels'),
)
const LazyWorkPositionsModule = lazy(
  () => import('modules/manageOrganization/modules/workPositions'),
)
const LazyStoresModule = lazy(() => import('modules/manageOrganization/modules/stores'))

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route
        path={PathName.geographicalStructure + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyStructureModule />
          </Suspense>
        }
      />
      <Route
        path={PathName.organizationalStructure + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyStructureModule />
          </Suspense>
        }
      />
      <Route path={'/'} element={<CompanyStructureMenu />} />
      <Route
        path={PathName.costCenter + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDynamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={PathName.taxesCategories + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDynamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={PathName.cashBenefits + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDynamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={PathName.positions + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDynamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={PathName.jobTitles + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyWorkPositionsModule />
          </Suspense>
        }
      />
      <Route
        path={PathName.stores + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyStoresModule />
          </Suspense>
        }
      />
    </Routes>
  )
}
