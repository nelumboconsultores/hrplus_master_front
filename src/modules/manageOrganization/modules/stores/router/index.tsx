import { Route, Routes } from 'react-router-dom'
import { CreationModel, ViewModel, EditionModel, DetailsModel } from '../pages'
import { PathName, getPath } from 'core'

export const RouterProvider: React.FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<ViewModel />} />
      <Route path={getPath(PathName.instanceStoresCreation)} element={<CreationModel />} />
      <Route path={getPath(PathName.instanceStoresEdit) + '/:id'} element={<EditionModel />} />
      <Route path={getPath(PathName.instanceStoresDetail) + '/:id'} element={<DetailsModel />} />
    </Routes>
  )
}
