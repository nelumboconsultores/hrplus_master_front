import { Route, Routes } from 'react-router-dom'
import { CreationModel, ViewModel, EditionModel, DetailsModel } from '../pages'
import { PathName, getPath } from 'core'

export const RouterProvider: React.FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<ViewModel />} />
      <Route path={getPath(PathName.instanceJobTitlesCreation)} element={<CreationModel />} />
      <Route path={getPath(PathName.instanceJobTitlesEdit) + '/:id'} element={<EditionModel />} />
      <Route path={getPath(PathName.instanceJobTitlesDetail) + '/:id'} element={<DetailsModel />} />
    </Routes>
  )
}
