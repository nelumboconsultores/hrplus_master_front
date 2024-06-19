import { Route, Routes, useLocation } from 'react-router-dom'
import { CreationModel, ViewModel, EditionModel, DetailsModel } from '../pages'
import {
  getDinamicCreatePaths,
  getDinamicDetailsPaths,
  getDinamicEditPaths,
} from '../utils/getDinamicPaths'

export const RouterProvider: React.FC = () => {
  const { pathname } = useLocation()

  return (
    <Routes>
      <Route path={'/'} element={<ViewModel />} />
      <Route path={getDinamicCreatePaths(pathname, false)} element={<CreationModel />} />
      <Route path={getDinamicEditPaths(pathname, false) + '/:id'} element={<EditionModel />} />
      <Route path={getDinamicDetailsPaths(pathname, false) + '/:id'} element={<DetailsModel />} />
    </Routes>
  )
}
