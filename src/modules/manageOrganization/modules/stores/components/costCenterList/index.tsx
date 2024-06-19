import { Grid } from '@mui/material'
import { DetailCard } from '../dynamicSelectForm/detailCard'
import { ModelContext } from '../../context'
import { useContext } from 'react'

type CostCenterListProps = { handleDelete?: (costCenterId: number) => Promise<void> }
export const CostCenterList: React.FC<CostCenterListProps> = ({ handleDelete }) => {
  const {
    modelState: { costCenter },
  } = useContext(ModelContext)

  return (
    <Grid container spacing={2}>
      {costCenter.id > 0 && (
        <Grid item xs={12} key={costCenter.id}>
          <DetailCard
            structures={{
              id: costCenter.id,
              data: [
                {
                  name: `${costCenter.code} - ${costCenter.denomination}`,
                  type: 'Código - Denominación',
                },
              ],
            }}
            onDelete={handleDelete ? () => handleDelete(costCenter.id) : undefined}
          />
        </Grid>
      )}
    </Grid>
  )
}
