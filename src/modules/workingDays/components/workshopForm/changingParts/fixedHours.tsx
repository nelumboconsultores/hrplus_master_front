import { Grid, IconButton } from '@mui/material'
import { InputAutocomplete, icons, militaryRank } from 'core'
import { useFormContext } from 'react-hook-form'
import { styles } from '../styles'

import { SelectTypeTurn } from './selectTypeTurn'

export const FixHrComponent = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Grid container spacing={{ xs: 1, lg: 2 }}>
      <Grid item xs={3.3}>
        <InputAutocomplete
          options={militaryRank}
          control={control}
          label="Desde"
          name="dateFrom"
          errors={errors.dateFrom?.toString()}
          helpertext={errors.dateFrom?.message as string}
        />
      </Grid>
      <Grid item xs={3.3}>
        <InputAutocomplete
          name="dateTo"
          control={control}
          options={militaryRank}
          label="Hasta"
          errors={errors.dateTo?.toString()}
          helpertext={errors.dateTo?.message as string}
        />
      </Grid>
      <SelectTypeTurn />
      <Grid item xs={1}>
        <IconButton sx={styles.iconPlus} type="submit">
          {icons.addCircleOutline}
        </IconButton>
      </Grid>
    </Grid>
  )
}
