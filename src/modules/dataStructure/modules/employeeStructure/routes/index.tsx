import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import EmployeeMenu from '../pages/employeeMenu'
import { Weighting } from '../pages'
import { getPath, PathName } from 'core'
import Spinner from 'core/components/spinner'

const LazyDinamicModelsModule = lazy(() => import('../modules/dinamicModels'))

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeMenu />} />
      <Route path={PathName.weighting} element={<Weighting />} />

      <Route
        path={getPath(PathName.personalInformation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.biographicalInformation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.personalData) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.identifyDocument) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.address) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.contactInformation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.educationInformation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.emergencyContact) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.dependents) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.jobInformation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.payrollInformation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.compensation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.workHistory) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.paymentInformation) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.humanCapital) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.workSchedule) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
      <Route
        path={getPath(PathName.documents) + '/*'}
        element={
          <Suspense fallback={<Spinner />}>
            <LazyDinamicModelsModule />
          </Suspense>
        }
      />
    </Routes>
  )
}
