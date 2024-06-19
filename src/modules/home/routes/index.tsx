import { Route, Routes } from 'react-router-dom'
import { Desktop } from '../pages'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
    </Routes>
  )
}
