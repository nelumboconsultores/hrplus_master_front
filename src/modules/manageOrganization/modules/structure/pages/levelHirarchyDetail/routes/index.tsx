import { Route, Routes } from 'react-router-dom'
import { DetailHierarchy } from '../pages'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/:id" element={<DetailHierarchy />} />
    </Routes>
  )
}
