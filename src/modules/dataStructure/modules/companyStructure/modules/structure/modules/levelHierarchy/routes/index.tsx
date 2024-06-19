import { Route, Routes } from 'react-router-dom'
import { GenerateHerarchy } from '../pages'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/:id" element={<GenerateHerarchy />} />
    </Routes>
  )
}
