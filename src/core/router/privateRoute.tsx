import { PathName } from 'core'
import { Navigate } from 'react-router-dom'

type PrivateRouteProps = {
  validation: boolean
  validationPath?: string
  element: React.ReactNode
}
export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  validation,
  validationPath,
  element,
}) => {
  return validation ? element : <Navigate to={validationPath ?? PathName.Login} replace />
}
