import { Route, Routes } from 'react-router-dom'
import { CatalogMotifsPage } from '../pages'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/:id" element={<CatalogMotifsPage />} />
    </Routes>
  )
}
