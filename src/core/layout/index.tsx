import { useLocation } from 'react-router-dom'
import { StaffTemplate } from './staffTemplate'
import { AuthTemplate } from './authTemplate'
import { SetupTemplate } from './setupTemplate'
import { AuthSetupTemplate } from './authTempleteSetup'
import { PathName } from 'core'

export const Layout: React.FC = () => {
  const location = useLocation()

  const verifyLogin = () => {
    if (location.pathname == '/') return false
    if (location.pathname == '/' + PathName.RecoverAccount) return false
    if (location.pathname == PathName.RestorePassword) return false
    return true
  }
  if (verifyLogin() && !location.pathname.includes(PathName.Setup)) return <StaffTemplate />
  else if (location.pathname == PathName.Setup + PathName.TermsConditions) return <SetupTemplate />
  else if (location.pathname == PathName.Setup) return <AuthSetupTemplate />
  return <AuthTemplate />
}
