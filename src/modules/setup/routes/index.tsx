import { Route, Routes } from 'react-router-dom'
import { SetupPage, TermsAndConditionsPage } from '../pages'
import { PathName } from 'core'

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<SetupPage />} />
      <Route path={PathName.TermsConditions} element={<TermsAndConditionsPage />} />
    </Routes>
  )
}
