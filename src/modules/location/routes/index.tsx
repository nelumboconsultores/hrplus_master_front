import { Route, Routes } from 'react-router-dom'
import { LocationPage } from '../pages'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<LocationPage />} />
    </Routes>
  )
}
