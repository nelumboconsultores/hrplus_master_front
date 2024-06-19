import { Grid } from '@mui/material'
import { DetailCard } from '../dynamicSelectForm/detailCard'
import { ModelContext } from '../../context'
import { useContext } from 'react'

type WorkPeriodsListProps = { handleDelete?: (workPeriodId: number) => Promise<void> }
export const WorkPeriodsList: React.FC<WorkPeriodsListProps> = ({ handleDelete }) => {
  const { modelState } = useContext(ModelContext)

  return (
    <Grid container spacing={2}>
      {modelState.workPeriods?.map?.((workPeriod) => (
        <Grid item xs={12} key={workPeriod.id}>
          <DetailCard
            structures={{
              id: workPeriod.id,
              data: [{ name: workPeriod.name, type: workPeriod.type }],
            }}
            onDelete={handleDelete ? () => handleDelete(workPeriod.id) : undefined}
          />
        </Grid>
      ))}
    </Grid>
  )
}
