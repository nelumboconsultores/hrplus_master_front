import { Grid, Grid2Props, GridProps } from '@mui/material'
import { InputAutocomplete, InputAutocompletePropsLocal } from '.'

type InputNumRangeProps = {
  gridContainer?: GridProps
  maxValue?: number
  minValue?: number
  from: {
    inputFrom: InputAutocompletePropsLocal
    gridPropsFrom?: Grid2Props
    nameFrom?: string
  }
  to: {
    inputTo: InputAutocompletePropsLocal
    gridPropsTo?: Grid2Props
    nameTo?: string
  }
}

export const InputNumRange: React.FC<InputNumRangeProps> = ({
  maxValue,
  minValue,
  from,
  to,
  gridContainer,
}) => {
  const { inputFrom, gridPropsFrom, nameFrom } = from
  const { inputTo, gridPropsTo, nameTo } = to

  return (
    <Grid {...gridContainer} container justifyContent={'space-between'}>
      <Grid {...gridPropsFrom} item xs={6}>
        <InputAutocomplete
          {...inputFrom}
          name={nameFrom ?? 'from'}
          getOptionDisabled={maxValue ? (option) => Number(option.value) > maxValue : () => false}
          allowZero
        />
      </Grid>
      <Grid {...gridPropsTo} item xs={6}>
        <InputAutocomplete
          {...inputTo}
          name={nameTo ?? 'to'}
          getOptionDisabled={minValue ? (option) => Number(option.value) < minValue : () => false}
        />
      </Grid>
    </Grid>
  )
}
