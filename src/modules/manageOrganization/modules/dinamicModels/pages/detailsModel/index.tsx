import { useLocation } from 'react-router-dom'
import { DetailsModel as GenericDetailModel, DetailsModelCostCenter } from '../../components'
import { PathName } from 'core'

export const DetailsModel: React.FC = () => {
  const { pathname } = useLocation()

  if (pathname.includes(PathName.costCenter)) return <DetailsModelCostCenter />

  return <GenericDetailModel />
}
