import { Grid, GridProps } from '@mui/material'
import { ReturnInput } from './returnInput'
import { DynamicFormType } from 'core'

type DynamicGridProps = {
  listInputs: DynamicFormType
  xs?: number | number
  getNameAndValue?: boolean
} & GridProps

export const DynamicGrid: React.FC<DynamicGridProps> = ({
  listInputs,
  xs,
  getNameAndValue,
  ...props
}) => {
  return (
    <Grid {...props} container>
      {listInputs.map((input, index) => (
        <Grid item xs={xs ?? 6} key={index}>
          <ReturnInput input={input} getNameAndValue={getNameAndValue} />
        </Grid>
      ))}
    </Grid>
  )
}
