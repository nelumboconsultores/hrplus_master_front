import { useParams } from 'react-router-dom'
import { DetailsModel as GenericDetailModel } from 'core/components/detailsWorkPositions'

export const DetailsModel: React.FC = () => {
  const { id } = useParams()
  return <GenericDetailModel id={Number(id) ?? 1} />
}
